import React, { useContext } from 'react';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Container from '@material-ui/core/Container';

import ProductContext from '../../contexts/ProductContext';

export default function ResearchSources() {
  const { content } = useContext(ProductContext);

  if (!content || !content.researchSources) {
    return null;
  }

  return (
    <Container className="research-sources">
      <h2>Research Sources &amp; Studies</h2>
      {documentToReactComponents(
        content.researchSources
      )}
    </Container>
  );
}
