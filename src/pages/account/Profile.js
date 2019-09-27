import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestPatchAccount as requestPatchAccountAction,
  clearAccountError as clearAccountErrorAction
} from '../../modules/account/actions';
import {
  AccountProfileDetails,
  AccountChangePassword
} from '../../components/account';

const AccountProfile = ({
  currentUser,
  requestPatchAccount,
  clearAccountError
}) => {
  return (
    <div>
      <AccountProfileDetails
        currentUser={currentUser}
        requestPatchAccount={requestPatchAccount}
        clearAccountError={clearAccountError}
        mb={2}
      />
      <AccountChangePassword
        currentUser={currentUser}
        requestPatchAccount={requestPatchAccount}
        clearAccountError={clearAccountError}
      />
    </div>
  );
};

AccountProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearAccountError: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  requestPatchAccount: requestPatchAccountAction,
  clearAccountError: clearAccountErrorAction
};

export default connect(
  null,
  mapDispatchToProps
)(AccountProfile);
