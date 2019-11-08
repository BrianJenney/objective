  /*
   *
   * @description - Track Segment Editorial Grid Item Clicked 
   * @return void
   * 
   */
  const segmentTrackEditorialItemClicked = (post, cta = '') => {
    window.analytics.track('Editorial Grid Item Clicked', {
      cta: cta,
      label: post.fields.title,
      text: post.fields.title
    });
  };

  export default segmentTrackEditorialItemClicked;