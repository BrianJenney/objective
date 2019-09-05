import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Avatar
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { LoginForm } from '../components/forms';
import { requestLoginAttempt as requestLoginAttemptAction } from '../modules/account/actions';

const LoginPage = ({ requestLoginAttempt }) => {
  const handleSubmit = ({ email, password }) => {
    requestLoginAttempt(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box component={Paper} p={4}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Box component={Typography} variant="h5" my={4} align="center">
          Log in to your account
        </Box>
        <LoginForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

LoginPage.propTypes = {
  requestLoginAttempt: PropTypes.func.isRequired
};

const mapDispatchToProps = { requestLoginAttempt: requestLoginAttemptAction };

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
