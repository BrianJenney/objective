import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  requestFetchAccount,
  requestPatchAccount
} from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';
import { AlertPanel, Button } from '../common';

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
    //this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
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
    store.dispatch(requestPatchAccount(user.data._id, payload));
  };

  render() {
    const { account: user } = this.props;

    if (!user.data.contactPreferences) {
      return <AlertPanel type="info" text="No Account" />;
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
