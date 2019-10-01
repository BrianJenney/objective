import { connect } from 'react-redux';
import { AccountAddresses } from '../../components/account';
import {
  requestPatchAccount,
  clearPatchAccountError
} from '../../modules/account/actions';

const mapDispatchToProps = { requestPatchAccount, clearPatchAccountError };

export default connect(
  null,
  mapDispatchToProps
)(AccountAddresses);
