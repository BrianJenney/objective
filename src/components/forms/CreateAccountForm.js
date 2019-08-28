import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { CheckboxField, InputField } from '../form-fields';
import { fonts, sizes } from '../Theme/fonts';
import { colorPalette } from '../Theme/color-palette';
import {
  StyledSectionHeader,
  StyledSubmitButton
} from '../../pages/checkout/StyledComponents';

const { $brandSans } = fonts;
const { miniText } = sizes;
const { LIGHT_GRAY, MEDIUM_GRAY, BLACK } = colorPalette;

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  },
  agreement: {
    fontSize: miniText,
    fontColor: BLACK,
    fontFamily: $brandSans
  }
}));

const StyledLink = withStyles(() => ({
  root: {
    fontFamily: $brandSans,
    fontWeight: 'bold',
    color: BLACK,
    textTransform: 'uppercase',
    textDecoration: 'underline',
    fontSize: miniText
  }
}))(Link);

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
  email: string().required('Email is required'),
  password: string().required('Password is required'),
  newsletter: string().required('Newsletter is required')
});

const CreateAccountForm = ({ onSubmit }) => {
  const classes = useStyles();
  const renderForm = () => (
    <>
      <Form>
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={10}>
            <StyledSectionHeader component="h2" gutterBottom>
              Create an Account
            </StyledSectionHeader>
          </Grid>
          <Grid item xs={2} style={{ 'margin-right': '0 !important' }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ 'text-align': 'right' }}
            >
              <StyledLink
                component={RouterLink}
                to="/login"
                style={{ 'font-size': '18px' }}
              >
                Log in
              </StyledLink>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field name="firstName" label="First Name" component={InputField} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field name="lastName" label="Last Name" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field name="email" label="Email Address" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field name="password" label="Password" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="newsletter"
              label="Subscribe to True Health news"
              component={CheckboxField}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              {/* <Button type="button" mr={2} /> */}
              <StyledSubmitButton type="submit" children="Create Account" />
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ 'text-align': 'center', 'margin-top': '10px' }}
        >
          <Typography gutterBottom className={classes.agreement}>
            By creating an account you agree to the True Health&nbsp;
            <StyledLink
              className={classes.agreement}
              component={RouterLink}
              to="/termsandconsitions"
            >
              Terms &amp; Conditions
            </StyledLink>
            &nbsp;&amp;&nbsp;
            <StyledLink
              className={classes.agreement}
              component={RouterLink}
              to="/privacypolicy"
            >
              Privacy Policy
            </StyledLink>
          </Typography>
        </Grid>
      </Form>
    </>
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

CreateAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CreateAccountForm;
