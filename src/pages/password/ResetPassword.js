import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '../../components/common';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import { InputField } from '../../components/form-fields';
import withDialog from '../../hoc/withDialog';
import './password-styles.scss';

const schema = object().shape({
  newPassword1: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both fields are required!'),
  newPassword2: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both fields are required!')
});

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '48px',
    color: '#231f20',
    fontFamily: 'Canela Text',
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  subTitle: {
    fontSize: '18px',
    fontFamily: 'FreightTextProBook',
    paddingBottom: theme.spacing(3)
  }
}));

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.getAll('tk').toString();

const ResetPassword = () => {
  const INITIAL_VALUES = {};
  const classes = useStyles();

  const renderForm = () => {
    return (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              label="New Password"
              name="newPassword1"
              type="password"
              component={InputField}
            />
            <Typography
              style={{
                fontFamily: 'p22-underground',
                fontSize: '11px',
                padding: '5px',
                textAlign: 'left'
              }}
            >
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
          <Grid item xs={12}>
            <Button type="submit" fullWidth>
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  };

  const handleSubmit = values => {
    store.dispatch(requestPatchAccount(token, values));
    window.location = '/password/success';
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={5} textAlign="center">
        <Typography className={classes.title}>Reset your password</Typography>
        <Typography className={classes.subTitle}>
          Enter your new password below.
        </Typography>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={schema}
          render={renderForm}
        />
      </Box>
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
  ),
  withDialog
)(ResetPassword);
