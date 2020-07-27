import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { object, string, boolean } from 'yup';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, NavLink, AlertPanel } from '../common';
import { getErrorMessage } from '../../utils/misc';
import { CheckboxField, InputField } from '../form-fields';
import { withCurrentUser } from '../../hoc';

const useStyles = makeStyles(theme => ({
  text: {
    fontFamily: theme.typography.bodyFontFamily,
    fontSize: '14px',
    color: theme.palette.brand.darkSubTextGray,
    display: 'block',
    lineHeight: '21px',
    padding: '0 30px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    }
  },
  text2: {
    fontFamily: theme.typography.bodyFontFamily,
    fontSize: '14px',
    color: theme.palette.brand.accentBrown,
    display: 'block',
    lineHeight: '21px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    }
  },
  subText: {
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.darkSubTextGray,
    fontSize: '11px',
    textAlign: 'left',
  },
  newsletter: {
    paddingLeft: 0,
    // fontFamily: theme.typography.bodyFontFamily + ' !important',
    color: theme.palette.brand.darkSubTextGray
  }
}));

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newsletter: true,
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

const SignupForm = ({
  title,
  onSubmit,
  clearCreateAccountError,
  currentUser
}) => {
  const classes = useStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!passwordVisible);
    },
    [passwordVisible, setPasswordVisible]
  );
  const errorMessage = getErrorMessage(currentUser.signupError);

  useEffect(() => {
    clearCreateAccountError();
  }, []);

  const handleSubmit = useCallback((values, form) => {
    values.disableGuestLogic = true;
    values.isGuest = false;
    values.passwordSet = true;
    onSubmit(values);
    form.setSubmitting(false);
  }, [onSubmit]);

  const renderForm = ({ isValid }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <AlertPanel
        my={2}
        py={2}
        px={4}
        type="success"
        bgcolor="#ffcdd2"
        text={errorMessage}
        variant="subtitle2"
      />
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
            autoComplete="current-password"
          />
          <Typography className={classes.subText}>
            Must be at least 6 characters
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            className={classes.newsletter}
            style={{fontFamily: 'proxima-nova, sans-serif'}}
            name="newsletter"
            label="Keep me updated with exclusive offers"
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
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.text}>
            By creating an account you agree to Burt's Bees&nbsp;
            <div className={classes.text2}>
              <NavLink to="/terms" underline="always" target="_blank" style={{color: '#a06958'}}>
                Terms &amp; Conditions
              </NavLink>
              &nbsp;&amp;&nbsp;
              {/* <NavLink to="/privacypolicy" underline="always">
                Privacy Policy
              </NavLink> */}
              <a
                href="/privacypolicy"
                target="_blank"
                style={{ color: '#a06958' }}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

SignupForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  clearCreateAccountError: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withCurrentUser(SignupForm);
