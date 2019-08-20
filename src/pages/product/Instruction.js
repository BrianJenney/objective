import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ProductContext from '../../contexts/ProductContext';


export default function Instruction() {
  const { whhmBoxes } = useContext(ProductContext);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: whhmBoxes }} />
    </Container>
  );
}