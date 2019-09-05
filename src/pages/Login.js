import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from '../components/common';
import { InputField } from '../components/form-fields';
import store from '../store';
import { requestLoginAttempt } from '../modules/account/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  Container,
  Checkbox,
  Button,
  Box,
  Grid,
  CssBaseline,
  Typography
} from '@material-ui/core';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email'),
  password: string().required('Password is required')
});

// testing account:  {email: 'kevinch@nutranext.net', password: '44444'}
const INITIAL_VALUES = {
  email: '',
  password: ''
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.black
    }
  },

  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  }
}));

const Login = ({ account }) => {
  const classes = useStyles();

  const handleSubmit = ({ email, password }) => {
    store.dispatch(requestLoginAttempt(email, password));
  };

  /* Display error message when password/email is incorrect */
  let displayMessage;
  if (!account.msg) {
    displayMessage = null;
  } else {
    displayMessage = (
      <Typography fontFamily="Roboto">
        <Box fontSize={15} border={(1, '#ffcdd2')} bgcolor="#ffcdd2">
          Password or username is not valid. Please check your spelling and try
          again.
        </Box>
      </Typography>
    );
  }

  const renderForm = () => (
    <Form>
      <Grid>
        <Field
          margin="normal"
          name="email"
          label="Email Address"
          component={InputField}
        />

        <Field
          margin="normal"
          label="Password"
          type="password"
          name="password"
          component={InputField}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
      </Grid>

      <Button type="submit" fullWidth variant="contained" color="primary">
        LOG IN
      </Button>

      <Grid>
        <Grid container item xs={12} justify="center">
          <NavLink href="/reset-password" variant="body1" underline="always">
            Forgot your email/password?
          </NavLink>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Typography variant="body1" gutterBottom>
            Don't have an account?{' '}
          </Typography>
          <NavLink to="/signup" variant="body1" underline="always">
            Sign up
          </NavLink>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Container component="main">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography variant="h1" gutterBottom>
          <Box fontFamily="Roboto">Log in to your account</Box>
        </Typography>
        {displayMessage}
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

Login.propTypes = {
  account: PropTypes.object
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  null
)(Login);
