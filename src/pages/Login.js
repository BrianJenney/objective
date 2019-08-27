import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, NavLink } from '../components/common';
import { InputField } from '../components/form-fields';
import { withAuthToken } from '../hoc';
import store from '../store';
import { requestLoginAttempt } from '../modules/account/actions';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email'),
  password: string().required('Password is required')
});

const INITIAL_VALUES = {
  email: 'kevinch@nutranext.net',
  password: '44444'
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = ({ authToken, account }) => {
  const classes = useStyles();
console.log(authToken);
  const handleSubmit = ({ email, password }) => {
    store.dispatch(requestLoginAttempt(email, password));
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
        <Grid item xs={12}>
          <Field
            name="password"
            label="Password"
            component={InputField}
            type="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" className={classes.submit} fullWidth>
          Log In
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box>
          Don&#39;t have an account?
          <NavLink to="/signup">Sign Up</NavLink>!
        </Box>
      </Grid>
    </Form>
  );

  return (
    <div>
      {authToken || (account && account.account_jwt) ? (
        <Redirect to="/checkout" />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Formik
              initialValues={INITIAL_VALUES}
              onSubmit={handleSubmit}
              validationSchema={schema}
              render={renderForm}
            />
          </div>
        </Container>
      )}
    </div>
  );
};

Login.propTypes = {
  authToken: PropTypes.string,
  account: PropTypes.object
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  null
)(withAuthToken(Login));
