import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  requestFetchAccount,
  requestPatchAccount
} from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../../components/form-fields';

const schema = Yup.object({
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
});
const INITIAL_VALUES = {
  password: '',
  passwordConfirmation: ''
};

class ResetPassword extends React.Component {
  componentDidMount() {
    // In the future this will be updated to grab token based off of email sent to user and will not be hard coded. Also this page will not be accessible unless the user has gotten an email and clicked on the link
    // We do not have email functionality as of yet
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
    console.log('******************MOUNTED****************************');
  }

  renderForm = () => {
    return (
      <Box>
        <Typography variant="h3" gutterBottom children="Update Password" />
        <Typography variant="body1" gutterBottom>
          To update your password, please fill in the below fields.
        </Typography>
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                label="Enter New Password"
                name="password"
                component={InputField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                label="Confirm Password"
                name="passwordConfirmation"
                component={InputField}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Button type="submit" children="Submit" />
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Box>
    );
  };

  handleSubmit = values => {
    const { account: user } = this.props;
    const payload = {
      password: values.password
    };
    store.dispatch(requestPatchAccount(user._id, omit(payload)));
  };

  render() {
    const { account: user } = this.props;

    if (!user.contactPreferences) {
      return <div>No Account</div>;
    }

    return (
      <Container>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={this.handleSubmit}
          validationSchema={schema}
          render={this.renderForm}
        />
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

const mapDispatchToProps = {
  requestFetchAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
