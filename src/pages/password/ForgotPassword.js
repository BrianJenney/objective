import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, NavLink } from '../../components/common';
import { InputField } from '../../components/form-fields';
import store from '../../store';
import { requestForgotPassword } from '../../modules/account/actions';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email')
});

const INITIAL_VALUES = {
  email: ''
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    width: theme.spacing(55),
    textAlign: 'center',
    fontSize: '32px'
  },
  subTitle: {
    width: theme.spacing(70),
    textAlign: 'center',
    paddingTop: '10px'
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
    <Form className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" className={classes.submit} fullWidth>
          Request Reset Link
        </Button>
      </Grid>
    </Form>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h5">
          Forgot your email / password?
        </Typography>
        <Typography component='subtitle1' className={classes.subTitle}>It's easy to forget. Enter your email address and we'll send you a reset link.</Typography>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={schema}
          render={renderForm}
        />
      </div>
    </Container>
  );
};

ForgotPassword.propTypes = {
  email: PropTypes.string
};

const mapStateToProps = state => ({
  email: state.email
});

export default connect(
  mapStateToProps,
  null
)(ForgotPassword);
