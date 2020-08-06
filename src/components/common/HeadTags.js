import React from 'react';
import { Helmet } from 'react-helmet';

const HeadTags = ({ title, description, indexThisPage }) => (
  <Helmet>
    {indexThisPage && title ? <title>{title}</title> : null}
    {description && (
      <meta name="robots" content={indexThisPage ? description : 'noindex,nofollow'} />
    )}
  </Helmet>
);

export default HeadTags;
