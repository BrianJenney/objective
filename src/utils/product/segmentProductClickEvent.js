/*
 * @description - Wrapper function for Segment Product Click event
 * @param {Object} properties - The properties to track for Segment
 * @return void
 */

const segmentProductClickEvent = properties => {
  window.analytics.track('Product Clicked', properties);
};

export default segmentProductClickEvent;
