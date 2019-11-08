import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import segmentTrackEditorialItemClicked from '../../utils/segmentTrackEditorialItemClicked';

const FeaturedPost = ({post}) => {
  if (!post.fields || !post.fields.title) {
    return <></>;
  }
  let segmentAnalyticsTracker = segmentTrackEditorialItemClicked;
  let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

  if (post.fields.featuredImage && post.fields.featuredImage.fields) {
    imageUrl = `${post.fields.featuredImage.fields.file.url}?w=880&fm=jpg&q=90`;
  }

  let category = 'General';
  let slug = null;

  if (post.fields.categories && post.fields.categories.length > 0 && post.fields.categories[0].fields) {
    category = post.fields.categories[0].fields.title;
    slug = post.fields.categories[0].fields.slug;
  }

  return (
    <Grid container spacing={4} className="callout">
      <Grid item xs={12} md={8}>
        <Link onClick={()=>{segmentAnalyticsTracker(post)}} to={`/journal/posts/${ post.fields.slug }`}>
          <img src={ imageUrl } alt={ post.fields.title } />
        </Link>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className="flex">
          <span className="categoryName"><Link to={`/journal/category/${ slug }`}>{ category }</Link></span>&mdash;
          <span className="minRead">{ post.fields.minuteRead } Min Read</span>
        </div>
        <h2><Link onClick={()=>{segmentAnalyticsTracker(post)}} to={`/journal/posts/${ post.fields.slug }`}>{ post.fields.title }</Link></h2>
        <p>{ post.fields.teaser }</p>
        <Link onClick={()=>{segmentAnalyticsTracker(post, "Read More")}} to={`/journal/posts/${ post.fields.slug }`}>Read More</Link>
      </Grid>
    </Grid>
  );
};

export default FeaturedPost;