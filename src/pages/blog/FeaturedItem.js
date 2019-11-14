import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { fetchLinkedCategory } from '../../utils/blog';
import segmentTrackEditorialItemClicked from '../../utils/segmentTrackEditorialItemClicked';

const FeaturedItem = ({post}) => {
  const [category, setCategory] = useState('General');
  const [slug, setSlug] = useState(null);
  let segmentAnalyticsTracker = segmentTrackEditorialItemClicked;
  let p = post;
  let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

  if (p.fields.featuredImage && p.fields.featuredImage.fields) {
    imageUrl = `${p.fields.featuredImage.fields.file.url}?w=424&fm=jpg&q=50`;
  }

  useEffect(() => {
    if (p.fields.categories && p.fields.categories.length > 0 && p.fields.categories[0].fields) {
      setCategory(p.fields.categories[0].fields.title);
      setSlug(p.fields.categories[0].fields.slug);
    } else if (p.fields.categories && p.fields.categories.length > 0 && p.fields.categories[0].sys && p.fields.categories[0].sys.type === 'Link') {
      fetchLinkedCategory(p.fields.categories[0].sys.id).then(cat => {
        if (cat && cat.fields) {
          setCategory(cat.fields.title);
          setSlug(cat.fields.slug);
        }
      });
    }
  }, []);

  return (
    <Grid item xs={12} md={4}>
      <Link onClick={()=>{segmentAnalyticsTracker(p)}} to={`/journal/posts/${ p.fields.slug }`}>
        <img src={ imageUrl } alt={ p.fields.title } />
      </Link>
      <div className="flex">
        <span className="categoryName"><Link to={`/journal/category/${ slug }`}>{ category }</Link></span>&mdash;
        <span className="minRead">{ p.fields.minuteRead } Min Read</span>
      </div>
      <h2><Link onClick={()=>{segmentAnalyticsTracker(p)}} to={`/journal/posts/${ p.fields.slug }`}>{ p.fields.title }</Link></h2>
      <p>{ p.fields.teaser }</p>
      <Link onClick={()=>{segmentAnalyticsTracker(p, "Read More")}} to={`/journal/posts/${ p.fields.slug }`}>Read More</Link>
    </Grid>
  );
};

export default FeaturedItem;