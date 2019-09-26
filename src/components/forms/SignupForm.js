import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Formik, Field, Form } from 'formik';
import { object, string, boolean } from 'yup';
import { CheckboxField, InputField } from '../form-fields';
import { Button, NavLink, AlertPanel } from '../common';
import { makeStyles } from '@material-ui/core/styles';
import { withCurrentUser } from '../../hoc';

const useStyles = makeStyles(theme => ({
  text: {
    fontFamily: 'p22-underground',
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    }
  },
  subText: {
    fontFamily: 'p22-underground',
    fontSize: '11px',
    textAlign: 'left',
    margin: theme.spacing(1, 0)
  }
}));

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newsletter: false
};

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .email('Invalid email')
    .required('Email is required'),
  password: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required'),
  newsletter: boolean()
});

const SignupForm = ({ title, onSubmit, currentUser }) => {
  const classes = useStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!passwordVisible);
    },
    [passwordVisible, setPasswordVisible]
  );

  const renderForm = ({ isValid }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs>
          <Field
            name="password"
            label="Password"
            component={InputField}
            type={passwordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{ fontFamily: 'P22-underground', fontSize: '12px' }}
                    component="button"
                    underline="always"
                    onClick={event => togglePasswordVisibility(event)}
                    children={
                      passwordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'
                    }
                  ></NavLink>
                </Box>
              )
            }}
            autoComplete="current-password"
          />
          <Typography className={classes.subText}>
            Must be at least 6 characters
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newsletter"
            color="primary"
            label="Subscribe to True Health news"
            component={CheckboxField}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            children="Create account"
            disabled={!isValid}
            className="create-account-btn"
          />
        </Grid>
        {currentUser.error && (
          <AlertPanel
            my={2}
            p={2}
            type="error"
            bgcolor="#ffcdd2"
            text={currentUser.error.message}
            variant="subtitle2"
          />
        )}
        {currentUser.data && (
          <AlertPanel
            my={2}
            p={2}
            type="error"
            bgcolor="#ffcdd2"
            text={currentUser.data.errorMessage}
            variant="subtitle2"
          />
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.text}>
            By creating an account you agree to the Objective Wellness&nbsp;
            <Typography className={classes.text}>
              <NavLink to="/termsandconditions" underline="always">
                Terms &amp; Conditions&nbsp;
              </NavLink>
              &amp;&nbsp;
              <NavLink to="/privacypolicy" underline="always">
                Privacy Policy
              </NavLink>
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

SignupForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withCurrentUser(SignupForm);
