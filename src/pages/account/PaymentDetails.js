import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AccountPaymentDetails } from '../../components/account';
import { requestPatchAccount } from '../../modules/account/actions';

const AccountPaymentDetailsContainer = props => (
  <AccountPaymentDetails
    {...props}
    seedEnabled
    useSeedLabel="Use default address"
  />
);

AccountPaymentDetailsContainer.propTypes = {
  requestPatchAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = { requestPatchAccount };

export default connect(
  null,
  mapDispatchToProps
)(AccountPaymentDetailsContainer);
