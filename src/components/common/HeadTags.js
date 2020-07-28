import React from 'react';
import { Helmet } from 'react-helmet';

const HeadTags = ({ title, description, indexThisPage }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && (
      <meta name="description" content={indexThisPage ? description : 'noindex,nofollow'} />
    )}
  </Helmet>
);

export default HeadTags;
