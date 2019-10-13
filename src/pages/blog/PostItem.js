import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const PostItem = post => {
  let p = post.post;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5}>
        <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
      </Grid>
      <Grid item xs={12} md={5}>
        <div className="flex">
          <span className="categoryName">{ p.fields.categories[0].fields.title }</span>&mdash;
          <span className="minRead">{ p.fields.minuteRead } Min Read</span>
        </div>
        <h2>{ p.fields.title }</h2>
        <p>{ p.fields.teaser }</p>
        <Link to={`/journal/posts/${ p.fields.slug }`}>Read More</Link>
      </Grid>
    </Grid>
  );
};

export default PostItem;