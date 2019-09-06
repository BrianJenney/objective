import { connect } from 'react-redux';
import { AccountPaymentDetails } from '../../components/account';
import { requestPatchAccount } from '../../modules/account/actions';

const mapDispatchToProps = { requestPatchAccount };

export default connect(
  null,
  mapDispatchToProps
)(AccountPaymentDetails);
