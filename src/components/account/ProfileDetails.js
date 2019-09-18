import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ProfileDetailsForm } from '../forms';

const ProfileDetails = ({ currentUser, requestPatchAccount, ...rest }) => {
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const profile = get(currentUser, 'data', {});
  const handleSubmit = values => requestPatchAccount(account_jwt, values);

  return (
    <Box {...rest}>
      <Box
        component={Typography}
        color="#231f20"
        variant="h5"
        children="Your Profile"
        gutterBottom
      />
      <Box
        component={Typography}
        color="#231f20"
        variant="h6"
        children="Name, Email &amp; Phone"
        gutterBottom
      />
      <ProfileDetailsForm
        defaultValues={profile}
        title=""
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

ProfileDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

export default ProfileDetails;
