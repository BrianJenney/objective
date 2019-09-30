import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AccountPaymentDetails } from '../../components/account';
import { requestPatchAccount } from '../../modules/account/actions';

const AccountPaymentDetailsContainer = props => {
  const { currentUser } = props;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentUser.error) {
      const errors = Array.isArray(currentUser.error)
        ? currentUser.error
        : [currentUser.error];
      const errorMessage = errors
        .map(
          err =>
            err.message || err.errorMessage || currentUser.data.errorMessage
        )
        .join('\n');
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000
      });
    }
  }, [currentUser.error]);

  return (
    <AccountPaymentDetails
      {...props}
      seedEnabled
      useSeedLabel="Use default address"
    />
  );
};

AccountPaymentDetailsContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = { requestPatchAccount };

export default connect(
  null,
  mapDispatchToProps
)(AccountPaymentDetailsContainer);
