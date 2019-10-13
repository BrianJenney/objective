import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const FeaturedItem = post => {
  let p = post.post;

  let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

  if (p.fields.featuredImage) {
    imageUrl = `${p.fields.featuredImage.fields.file.url}?w=424&fm=jpg&q=90`;
  }

  let category = 'General';
  let slug = null;

  if (p.fields.categories && p.fields.categories.length > 1) {
    category = p.fields.categories[0].fields.title;
    slug = p.fields.categories[0].fields.slug;
  }

  return (
    <Grid item xs={12} md={4}>
      <img src={ imageUrl } alt={ p.fields.title } />
      <div className="flex">
        <span className="categoryName"><Link to={`/journal/category/${ slug }`}>{ category }</Link></span>&mdash;
        <span className="minRead">{ p.fields.minuteRead } Min Read</span>
      </div>
      <h2>{ p.fields.title }</h2>
      <p>{ p.fields.teaser }</p>
      <Link to={`/journal/posts/${ p.fields.slug }`}>Read More</Link>
    </Grid>
  );
};

export default FeaturedItem;