import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button } from '../common';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';
const schema = object().shape({
  currentPassword: string().required('Your current password is required'),
  newPassword1: string().required('Both password fields are required.'),
  newPassword2: string().required('Both password fields are required.')
});
const ChangePassword = props => {
  const { account } = props;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const INITIAL_VALUES = {};
  if (!account.data.account_jwt) {
    return <div>No Account</div>;
  }
  const handleSubmit = values => {
    // if (values.newPassword1 !== values.newPassword2) {
    //   return false;
    // }
    store.dispatch(requestPatchAccount(props.account.data.account_jwt, values));
  };
  const renderForm = () => {
    return (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              label="Current Password"
              name="currentPassword"
              type="password"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="New Password"
              name="newPassword1"
              type="password"
              component={InputField}
            ></Field>
            <Typography style={{ fontSize: '0.75rem' }}>
              Must be at least 6 characters
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Confirm New Password"
              name="newPassword2"
              type="password"
              component={InputField}
            />
          </Grid>
          <Grid item xs={xs ? 12 : 4}>
            <Button mt={2} mp={3} type="submit">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  };
  return (
    <Container style={{ paddingTop: '30px' }}>
      <Typography
        variant="h3"
        style={{ fontFamily: 'p22-underground' }}
        gutterBottom
      >
        CHANGE PASSWORD
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            validationSchema={schema}
            render={renderForm}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    account: state.account
  };
};
const mapDispatchToProps = {};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ChangePassword);