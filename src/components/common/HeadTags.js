import React from 'react';
import { Helmet } from 'react-helmet';

const HeadTags = ({ title, description}) => {
  return (
    <Helmet>
      { title && <title>{title}</title> }
      { description && <meta name="description" content={description} /> }
    </Helmet>
  );
};

export default HeadTags;
