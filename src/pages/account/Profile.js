import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestPatchAccount as requestPatchAccountAction,
  requestChangePassword as requestChangePasswordAction,
  clearPatchAccountError as clearPatchAccountErrorAction,
  clearChangePasswordError as clearChangePasswordErrorAction
} from '../../modules/account/actions';
import {
  AccountProfileDetails,
  AccountChangePassword
} from '../../components/account';

const AccountProfile = ({
  currentUser,
  requestPatchAccount,
  requestChangePassword,
  clearPatchAccountError,
  clearChangePasswordError
}) => (
  <div>
    <AccountProfileDetails
      currentUser={currentUser}
      requestPatchAccount={requestPatchAccount}
      clearPatchAccountError={clearPatchAccountError}
      mb="50px"
    />
    <AccountChangePassword
      currentUser={currentUser}
      requestChangePassword={requestChangePassword}
      clearChangePasswordError={clearChangePasswordError}
    />
  </div>
);

AccountProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  requestChangePassword: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired,
  clearChangePasswordError: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  requestPatchAccount: requestPatchAccountAction,
  requestChangePassword: requestChangePasswordAction,
  clearPatchAccountError: clearPatchAccountErrorAction,
  clearChangePasswordError: clearChangePasswordErrorAction
};

export default connect(
  null,
  mapDispatchToProps
)(AccountProfile);
