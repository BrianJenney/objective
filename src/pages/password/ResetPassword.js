import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../../components/form-fields';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};
const schema = object().shape({
  newPassword1: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both fields are required!'),
  newPassword2: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both fields are required!')
});

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.getAll('tk').toString();

class ResetPassword extends React.Component {
  renderForm = () => {
    return (
      <Container>
        <Form>
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
        </Form>
      </Container>
    );
  };

  handleSubmit = values => {
    store.dispatch(requestPatchAccount(token, values));
    window.location = '/password/success';
  };

  render() {
    const INITIAL_VALUES = {};

    return (
      <Container>
        <Typography variant="h3" gutterBottom>
          Change Password
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
)(ResetPassword);
