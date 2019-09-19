import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '../common';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';

const schema = object().shape({
  firstName: string(),
  lastName: string(),
  email: string().email('Please enter a valid email.')
});
const ProfileDetails = props => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const { account } = props;
  const INITIAL_VALUES = {
    firstName: account.data.firstName,
    lastName: account.data.lastName,
    email: account.data.email,
    phone: account.data.phone
  };
  if (!account.data.account_jwt) {
    return <div>No Account</div>;
  }
  const handleSubmit = values => {
    store.dispatch(requestPatchAccount(props.account.data.account_jwt, values));
  };
  const renderForm = () => {
    return (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field
              margin="20px"
              label="First Name"
              name="firstName"
              component={InputField}
            />
          </Grid>
          <Grid item xs={6}>
            <Field label="Last Name" name="lastName" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Email" name="email" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Phone Number" name="phone" component={InputField} />
          </Grid>
          <Grid item xs={xs ? 12 : 4}>
            <Button mt={2} mp={3} fullWidth type="submit" >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  };
  return (
    <Container style={{ paddingTop: '20px' }}>
      <Typography variant="h1" gutterBottom>
        Your Profile
      </Typography>
      <Typography
        style={{ padding: '10px 0', fontFamily: 'p22-underground' }}
        variant="h3"
        gutterBottom
      >
        NAME {'&'} EMAIL
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Formik
              initialValues={INITIAL_VALUES}
              onSubmit={handleSubmit}
              validationSchema={schema}
              render={renderForm}
            />
          </Paper>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetails);