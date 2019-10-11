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

  return errors.map(err => err.message || err.errorMessage).join('\n');
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
    <FormattedDate
      value={parseDate}
      month="2-digit"
      day="2-digit"
      year="numeric"
    />
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

export const formatDateTime = (date, isTimeFormatIncluded) =>
  convertFormattedDateTime(date, isTimeFormatIncluded);

export const debugRabbitResponse = (name, status, data, fields, properties) => {
  if (process.env.REACT_APP_ENVIRONMENT === 'development') {
    console.log('****************** START ' + name + ' ******************');
    console.log(status);
    console.log(data);
    console.log(fields);
    console.log(properties);
    console.log('****************** END ' + name + ' ******************');
  }
};

export const scrollToRef = ref => {
  if (!ref.current) {
    return null;
  }

  window.scrollTo(0, ref.current.offsetTop);

  return true;
};
