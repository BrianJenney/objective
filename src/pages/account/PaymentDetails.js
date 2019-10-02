import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AccountPaymentDetails } from '../../components/account';
import {
  requestPatchAccount,
  clearPatchAccountError
} from '../../modules/account/actions';

const AccountPaymentDetailsContainer = props => (
  <AccountPaymentDetails
    {...props}
    seedEnabled
    useSeedLabel="Use default address"
  />
);

AccountPaymentDetailsContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired
};

const mapDispatchToProps = { requestPatchAccount, clearPatchAccountError };

export default connect(
  null,
  mapDispatchToProps
)(AccountPaymentDetailsContainer);
