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
import { InputField } from '../form-fields';
import { AccountResetPassword } from '.';

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
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <Field label="First Name" name="firstName" component={InputField} />
          </Grid>
          <Grid item xs={6}>
            <Field label="Last Name" name="lastName" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Email" name="email" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Save Changes</Button>
          </Grid>
          <Typography variant="h3" gutterBottom children="Change Password" />
          <Grid item xs={12}>
            <Field
              label="Current Password"
              name="currentPassword"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="New Password"
              name="newPassword1"
              helperText="Must be at least 6 characters"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Confirm New Password"
              name="newPassword2"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Change Password</Button>
          </Grid>
        </Grid>
      </Form>
    );
  };

  handleSubmit = (values) => {
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
        <Typography variant="h3" gutterBottom>
          Your Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={pStyle}>
              <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={this.handleSubmit}
                validationSchema={schema}
                render={this.renderForm}
              />
            </Paper>
          </Grid>
        </Grid>
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
