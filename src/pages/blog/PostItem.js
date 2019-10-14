import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const PostItem = post => {
  let p = post.post;

  let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

  if (p.fields.featuredImage && p.fields.featuredImage.fields) {
    imageUrl = `${p.fields.featuredImage.fields.file.url}?w=529&fm=jpg&q=90`;
  }

  let category = 'General';
  let slug = null;

  if (p.fields.categories && p.fields.categories.length > 0 && p.fields.categories[0].fields) {
    category = p.fields.categories[0].fields.title;
    slug = p.fields.categories[0].fields.slug;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <img src={ imageUrl } />
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="flex">
          <span className="categoryName"><Link to={`/journal/category/${ slug }`}>{ category }</Link></span>&mdash;
          <span className="minRead">{ p.fields.minuteRead } Min Read</span>
        </div>
        <h2><Link to={`/journal/posts/${ p.fields.slug }`}>{ p.fields.title }</Link></h2>
        <p>{ p.fields.teaser }</p>
        <Link to={`/journal/posts/${ p.fields.slug }`}>Read More</Link>
      </Grid>
    </Grid>
  );
};

export default PostItem;