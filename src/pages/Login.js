import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from '../components/common';
import { InputField } from '../components/form-fields';
import { withAuthToken } from '../hoc';
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

const INITIAL_VALUES = {
  email: 'kevinch@nutranext.net',
  password: '44444'
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

const Login = props => {
  const classes = useStyles();
  const account = props.account;
  const authToken = props.authToken;

  const handleSubmit = ({ email, password }) => {
    store.dispatch(requestLoginAttempt(email, password));
  };

  const renderForm = () => (
    <Form>
      <Grid>
        <Field
          margin="normal"
          name="email"
          label="Email Address"
          component={InputField}
          // onChange={handleChange}
        />

        <Field
          margin="normal"
          label="Password"
          type="password"
          name="password"
          component={InputField}
          // onChange={handleChange}
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

  /* Display error message when password/email is incorrect */
  let displayMessage;
  if (authToken || (account && account.account_jwt)) {
    // props.history.goBack()
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
  authToken: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  null
)(withAuthToken(Login));
