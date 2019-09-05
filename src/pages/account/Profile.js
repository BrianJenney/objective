import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import { omit } from 'lodash';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../../components/form-fields';
import ProfileDetails from '../../components/account/ProfileDetails';
import ChangePassword from '../../components/account/ChangePassword';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};
const schema = object().shape({
  firstName: string(),
  lastName: string(),
  email: string()
});

class AccountProfile extends React.Component {
  renderForm = () => {
    return (
      <>
        <ProfileDetails />
        <ChangePassword />
      </>
    );
  };

  handleSubmit = values => {
    store.dispatch(requestPatchAccount(this.props.account.account_jwt, values));
  };

  render() {
    const { account } = this.props;

    const INITIAL_VALUES = {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email
    };

    if (!account.account_jwt) {
      return <div>No Account</div>;
    }

    return (
      <Container>
        <ProfileDetails />
        <ChangePassword />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    account: state.account
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountProfile);
