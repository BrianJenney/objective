import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loader = props => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    width={1}
    height={300}
    {...props}
  >
    <CircularProgress />
  </Box>
);

export default Loader;
