import { matchPath } from "react-router";
/*
*
*@description - Returns a site location to be used with the site_location property in applicable Segment Events
*@return {String} location
*
*/
const returnSiteLocation = () => {
  let path = window.location.pathname;
  const locationMap = [
    { path: '/', exact: true, strict: false, location: 'home' },
    { path: '/checkout', exact: true, strict: false, location: 'checkout' },
    { path: '/checkout2', exact: true, strict: false, location: 'checkout' },
    { path: '/gallery', exact: true, strict: false, location: 'gallery' },
    {
      path: '/products/:product_slug',
      exact: true,
      strict: false,
      location: 'pdp'
    }
  ];
  let location = '';
  locationMap.map(locationItem => {
    const match = matchPath(path, locationItem);
    if (match) {
      location = locationItem.location;
    }
  });
  return location;
};

export default returnSiteLocation;