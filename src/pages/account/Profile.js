import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    clearAccountError();
  }, []);

  useEffect(() => {
    if (currentUser.error) {
      const accountError =
        currentUser.error.message ||
        currentUser.error.errorMessage ||
        currentUser.data.errorMessage;
      enqueueSnackbar(accountError, {
        variant: 'error',
        autoHideDuration: 10000
      });
    }
  }, [currentUser.error]);

  return (
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
