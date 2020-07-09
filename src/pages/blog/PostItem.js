import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import segmentTrackEditorialItemClicked from '../../utils/segmentTrackEditorialItemClicked';

const PostItem = ({ post }) => {
  const p = post;
  const segmentAnalyticsTracker = segmentTrackEditorialItemClicked;
  let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';
  let altText = '';

  if (
    p.fields.featuredImage &&
    p.fields.featuredImage.fields &&
    p.fields.featuredImage.fields.file
  ) {
    imageUrl = `${p.fields.featuredImage.fields.file.url}?w=529&fm=jpg&q=90`;
    altText = p.fields.featuredImage.fields.title;
  }

  let category = 'General';
  let postSlug = null;

  if (p.fields.categories && p.fields.categories.length > 0 && p.fields.categories[0].fields) {
    category = p.fields.categories[0].fields.title;
    postSlug = p.fields.categories[0].fields.slug;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Link
          onClick={() => {
            segmentAnalyticsTracker(p);
          }}
          to={`/journal/posts/${p.fields.slug}`}
        >
          <img src={imageUrl} alt={altText} />
        </Link>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="flex">
          <span className="categoryName">
            <Link to={`/journal/category/${postSlug}`}>{category}</Link>
          </span>
          &mdash;
          <span className="minRead">{p.fields.minuteRead} Min Read</span>
        </div>
        <h2>
          <Link
            onClick={() => {
              segmentAnalyticsTracker(p);
            }}
            to={`/journal/posts/${p.fields.slug}`}
          >
            {p.fields.title}
          </Link>
        </h2>
        <p>{p.fields.teaser}</p>
        <Link
          onClick={() => {
            segmentAnalyticsTracker(p, 'Read More');
          }}
          to={`/journal/posts/${p.fields.slug}`}
        >
          Read More
        </Link>
      </Grid>
    </Grid>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
