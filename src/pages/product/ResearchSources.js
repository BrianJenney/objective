import React, { useContext } from 'react';

import ProductContext from '../../contexts/ProductContext';

export default function ResearchSources() {
  const { content } = useContext(ProductContext);

  if (!content) {
    return null;
  }

  const sources = content.researchSources.map(source =>
    <li>{source.replace(/\|/, ',')}</li>
  );

  return (
    <>
      <h2>Research Sources &amp; Studies</h2>
      <ul>
        {sources}
      </ul>
    </>
  );
};
