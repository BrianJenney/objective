import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ChangePasswordForm } from '../forms';

const ChangePassword = ({ currentUser, requestPatchAccount, ...rest }) => {
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const handleSubmit = values => requestPatchAccount(account_jwt, values);

  return (
    <Box {...rest}>
      <Box
        component={Typography}
        color="#231f20"
        variant="h6"
        children="Change Password"
        gutterBottom
      />
      <ChangePasswordForm title="" onSubmit={handleSubmit} />
    </Box>
  );
};

ChangePassword.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

export default ChangePassword;
