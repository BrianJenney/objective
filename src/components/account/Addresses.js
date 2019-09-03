import React from 'react';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import { omit } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  requestGetAccount,
  requestPatchAccount
} from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';

const pStyle = {
  padding: 20,
};

class AccountAddresses extends React.Component {
  componentDidMount() {
    console.log('******************MOUNTED****************************');
  }

  deleteAddress = id => {
    const { account } = this.props;

    let existing = account.addressBook;
    existing.splice(id, 1)

    const payload = {
      addressBook: existing
    }

    store.dispatch(
      requestPatchAccount(account.account_jwt, payload)
    );
  }

  setDefaultAddress = targetIndex => {
    const { account } = this.props;
    const newAddressBook = account.addressBook.map((addressEntity, index) => {
      if (index === targetIndex) {
        return {
          ...addressEntity,
          isDefault: true
        };
      }
      return {
        ...addressEntity,
        isDefault: false
      };

    });

    // selected default address move to the beginning of the array
    // newAddressBook.unshift(newAddressBook.splice(targetIndex, 1))

    const payload = {
      addressBook: newAddressBook
    };

    store.dispatch(
      requestPatchAccount(account.account_jwt, payload)
    );
  }

  render() {
    const { account } = this.props;

    if (!account.contactPreferences) {
      return <div>No Account</div>;
    }

    return (
      <Container>
        <Grid container spacing={3}>
          <Typography variant="h2" gutterBottom>
            Saved Addresses
          </Typography>
          <Grid item xs={6} container direction="row">
            {account.addressBook.map((address, i) =>
              (address.isDefault === true) ?

                <Paper style={pStyle}>
                  <Typography key={i} variant="body1" gutterBottom>{address.firstName} {address.lastName}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.address1}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.address2}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.city}, {address.state} {address.zipcode}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.country}</Typography>
                  <Typography>**Saved as default**</Typography>
                  <Link variant="button" color="textPrimary">
                    <RouterLink to={`/edit-address/${account.account_jwt}/${i}`}>Edit</RouterLink>
                  </Link>
                </Paper>
                :
                <Paper style={pStyle}>
                  <Typography key={i} variant="body1" gutterBottom>{address.firstName} {address.lastName}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.address1}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.address2}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.city}, {address.state} {address.zipcode}</Typography>
                  <Typography key={i} variant="body1" gutterBottom>{address.country}</Typography>
                  <Link variant="button" color="textPrimary">
                    <a href='#' onClick={() => { this.deleteAddress(i) }}>Remove</a> | <RouterLink to={`/edit-address/${account.account_jwt}/${i}`}>Edit</RouterLink> | <a href='#' onClick={() => { this.setDefaultAddress(i) }}>Set as Default</a>
                  </Link>
                </Paper>
            )}
          </Grid>
        </Grid>
        <Link variant="button" color="textPrimary">
          <RouterLink to="add-address">Add Address</RouterLink>
        </Link>
      </Container >
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    account: state.account
  };
};

const mapDispatchToProps = {
  requestGetAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountAddresses);
