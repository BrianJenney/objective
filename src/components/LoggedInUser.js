import React from 'react';
import Box from '@material-ui/core/Box';
import store from '../store';

const LoggedInUser = () => (
  <Box>
    <div>Hi, {store.getState().account.data.firstName}</div>
  </Box>
);

export default LoggedInUser;
