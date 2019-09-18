import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ProductContext from '../../contexts/ProductContext';

export default function Instruction() {
  const { whhmBoxes } = useContext(ProductContext);
  const box = {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: 2.25,
    fontFamily: 'p22-underground, sans-serif',
    textAlign: 'center',
    alignItems: 'center',
    pt: 10,
    pb: 5
  };

  if (!whhmBoxes) {
    return null;
  }

  return (
    <Container>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} sm={5}>
          <Box {...box}>HOW TO TAKE</Box>
        </Grid>
      </Grid>
      <div dangerouslySetInnerHTML={{ __html: whhmBoxes }} />
    </Container>
  );
}
