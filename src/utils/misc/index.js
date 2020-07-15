import React from 'react';
import { pick, pickBy, identity } from 'lodash';
import { FormattedDate, FormattedTime } from 'react-intl';

const jstz = require('jstimezonedetect');
const tzname = jstz.determine().name();

export const getInitialValues = (baseValues, defaultValues) => ({
  ...baseValues,
  ...pickBy(pick(defaultValues, Object.keys(baseValues)), identity)
});

export const getDefaultEntity = entities => {
  if (!entities) {
    return null;
  }

  return entities.find(entity => !!entity.isDefault);
};

export const getErrorMessage = error => {
  if (!error) {
    return null;
  }

  const errors = Array.isArray(error) ? error : [error];

  const mappedErr = errors.map(err => err.message || err.errorMessage).join('\n');
  return mappedErr;
};

export const formatCurrency = amount => {
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return nf.format(amount);
};

const convertFormattedDateTime = (parseDate, isTimeFormatIncluded = false) => (
  <span>
    <FormattedDate value={parseDate} month="2-digit" day="2-digit" year="numeric" />
    {isTimeFormatIncluded && ' '}
    {isTimeFormatIncluded && (
      <FormattedTime
        value={parseDate}
        hour="2-digit"
        minute="numeric"
        second="numeric"
        timeZone={tzname}
        timeZoneName="short"
      />
    )}
  </span>
);

export const formatDateTime = (date, isTimeFormatIncluded) => convertFormattedDateTime(date, isTimeFormatIncluded);

export const debugRabbitResponse = (name, status, data, fields, properties) => {
  if (process.env.REACT_APP_ENVIRONMENT === 'development') {
    console.log(`****************** START ${name} ******************`);
    console.log(status);
    console.log(data);
    console.log(fields);
    console.log(properties);
    console.log(`****************** END ${name} ******************`);
  }
};

export const getTrackingUrl = (carrier, trackingNo) => {
  let trackingUrl = '';
  switch (carrier) {
    case 'UPS Innovations':
      trackingUrl = `http://www.ups-mi.net/packageID/PackageID.aspx?PID=${trackingNo}`;
      break;
    case 'USPS':
    case 'USPS Priority Mail':
    case 'USPS First Class':
    case 'USPS International':
    case 'USPS Intl Priority':
    case 'FirstInternational':
      trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNo}`;
      break;
    case 'Airborne':
      trackingUrl = `http://track.dhl-usa.com//TrackByNbr.asp?ShipmentNumber=${trackingNo}`;
      break;
    case 'DHL Parcels Ground':
      trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNo}`;
      trackingUrl = `https://www.logistics.dhl/us-en/home/tracking/tracking-ecommerce.html?tracking-id=${trackingNo}`;
      trackingUrl = `https://webtrack.dhlglobalmail.com/?trackingnumber=${trackingNo}`;
      break;
    case 'FedEx Smart Post':
    case 'FedEx 2 Day':
    case 'FedEx Smart':
    case 'FedEx International Economy':
      trackingUrl = `http://www.fedex.com/Tracking?sum=n&ascend_header=1&clienttype=dotcom&spnlk=spnl0&initial=n&cntry_code=us&tracknumber_list=${trackingNo}`;
      break;
    default:
      if (carrier.match(/^USPS/i)) {
        trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNo}`;
      }
      if (carrier.match(/^UPS/i)) {
        trackingUrl = `http://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_US&InquiryNumber1=${trackingNo}&track.x=0&track.y=0`;
      }
      if (carrier.match(/^FedEx/i)) {
        trackingUrl = `http://www.fedex.com/Tracking?sum=n&ascend_header=1&clienttype=dotcom&spnlk=spnl0&initial=n&cntry_code=us&tracknumber_list=${trackingNo}`;
      }
      if (carrier.match(/^DHL/i)) {
        trackingUrl = `https://webtrack.dhlglobalmail.com/?trackingnumber=${trackingNo}`;
      }
      break;
  }
  return trackingUrl;
};

export const getTracking = (items, status) => {
  const trackings = [];
  const trackingNo = {};
  items.map(item => {
    if (!item.tracking_list) return null;
    if (['shipped', 'delivered'].includes(status) && item.tracking_list) {
      item.tracking_list.map(({ number, carrier }) => {
        if (!trackingNo[number]) {
          trackings.push({
            number,
            url: getTrackingUrl(carrier, number)
          });
          trackingNo[number] = number;
        }
      });
    }
  });
  return trackings;
};

export const getShippingAndTracking = order => {
  let { status, items, shipTracking, createdAt, updatedAt } = order;
  let tracking = null;
  const processedDate = createdAt;
  let shippedDate = '';
  let deliveredDate = '';
  const item = items[0];
  if (item && item.tracking_list && shipTracking) {
    tracking = getTracking(items, status);
    const trackingNo = item.tracking_list[0].number;
    if (shipTracking[trackingNo] && shipTracking[trackingNo].tracking_status) {
      shippedDate = shipTracking[trackingNo].tracking_status.object_created;

      if (shipTracking[trackingNo].tracking_status.status === 'DELIVERED') {
        status = 'delivered';
        deliveredDate = shipTracking[trackingNo].tracking_status.status_date;
      }
    }
  }

  const statusStepper = {
    status,
    processedDate,
    shippedDate,
    deliveredDate,
    updatedAt
  };
  return {
    tracking,
    statusStepper
  };
};

export const scrollToRef = ref => {
  if (!ref.current) {
    return null;
  }
  ref.current.scrollIntoView({behavior: 'smooth'})
  return true;

};

export const getDaysDiff = dateFrom => {
  const microSecondsDiff = Math.abs(new Date(dateFrom).getTime() - new Date().getTime());
  return Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24));
};

export const paramsToObject = url => {
  const obj = {};
  for (const pair of url.entries()) {
    obj[pair[0]] = pair[1];
  }
  return obj;
};

export const isAcqDiscount = obj => {
  if (typeof obj !== 'undefined') {
    if (obj.hasOwnProperty('utm_content') && obj.utm_content.includes('25off')) {
      return true;
    }
  }
  return false;
};

export const trackLPSection = (lp, section_name, sku) => {
  window.analytics.track('Percent Scrolled', {
    page_type: `${lp} Landing Page`,
    section_name,
    sku,
    url: window.location.href
  });
};
