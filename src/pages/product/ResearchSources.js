import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import ProductContext from '../../contexts/ProductContext';

export default function ResearchSources() {
  const { content } = useContext(ProductContext);

  if (!content || !content.researchSources) {
    return null;
  }

  const sources = content.researchSources.map(source => (
    <li>{source.replace(/\|/, ',')}</li>
  ));

  return (
    <Container className="research-sources">
      <h2>Research Sources &amp; Studies</h2>
      <ul>{sources}</ul>
    </Container>
  );
}
