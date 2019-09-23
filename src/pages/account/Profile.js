import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestPatchAccount as requestPatchAccountAction } from '../../modules/account/actions';
import {
  AccountProfileDetails,
  AccountChangePassword
} from '../../components/account';

const AccountProfile = ({ currentUser, requestPatchAccount }) => (
  <div>
    <AccountProfileDetails
      currentUser={currentUser}
      requestPatchAccount={requestPatchAccount}
      mb={2}
    />
    <AccountChangePassword
      currentUser={currentUser}
      requestPatchAccount={requestPatchAccount}
    />
  </div>
);

AccountProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = { requestPatchAccount: requestPatchAccountAction };

export default connect(
  null,
  mapDispatchToProps
)(AccountProfile);
