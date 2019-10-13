import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const FeaturedPost = post => {
  if (!post.fields || !post.fields.title) {
    return <></>;
  }

  let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

  if (post.fields.featuredImage) {
    imageUrl = `${post.fields.featuredImage.fields.file.url}?w=880&fm=jpg&q=90`;
  }

  return (
    <Grid container spacing={4} className="callout">
      <Grid item xs={12} md={8}>
        <img src={ imageUrl } alt={ post.fields.title } />
      </Grid>
      <Grid item xs={12} md={4}>
        <div className="flex">
          <span className="categoryName">{ post.fields.categories[0].fields.title }</span>&mdash;
          <span className="minRead">{ post.fields.minuteRead } Min Read</span>
        </div>
        <h2>{ post.fields.title }</h2>
        <p>{ post.fields.teaser }</p>
        <Link to={`/journal/posts/${ post.fields.slug }`}>Read More</Link>
      </Grid>
    </Grid>
  );
};

export default FeaturedPost;