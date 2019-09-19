import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../../components/common';
import { InputField } from '../../components/form-fields';
import store from '../../store';
import { requestForgotPassword } from '../../modules/account/actions';
import withDialog from '../../hoc/withDialog';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email')
});

const INITIAL_VALUES = {
  email: ''
};

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '44px',
    color: '#231f20',
    fontFamily: 'Canela Text',
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  subTitle: {
    fontSize: '17px',
    fontFamily: 'FreightTextProBook',
    paddingBottom: theme.spacing(3)
  }
}));

const ForgotPassword = () => {
  console.log('here forgot password');
  const classes = useStyles();

  const handleSubmit = ({ email }) => {
    store.dispatch(requestForgotPassword(email));
    window.location = '/password/confirm';
  };

  const renderForm = () => (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth children="Request Reset Link" />
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={5} textAlign="center">
        <Typography className={classes.title}>
          Forgot your email/password?
        </Typography>
        <Typography className={classes.subTitle}>
          It's easy to forget. Enter your email address and we'll send you a
          reset link.
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

ForgotPassword.propTypes = {
  email: PropTypes.string
};

const mapStateToProps = state => ({
  email: state.email
});

const ForgotPasswordDialog = compose(
  connect(
    mapStateToProps,
    null
  ),
  withDialog
)(ForgotPassword);

const ForgotPasswordPage = (props) => <ForgotPasswordDialog onExited={props.history.goBack} {...props} />;

export default withRouter(ForgotPasswordPage);
