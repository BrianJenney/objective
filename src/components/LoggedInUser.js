import React from 'react';
import Container from '@material-ui/core/Container';
import store from '../store';

const LoggedInUser = () => (
  <Container>
    <div>Hi, {store.getState().account.data.firstName}</div>
  </Container>
);

export default LoggedInUser;
