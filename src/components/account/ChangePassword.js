import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { object, string, ref } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InputField } from '../form-fields';
import { Button, NavLink, AlertPanel } from '../common';
import { getInitialValues, getErrorMessage } from '../../utils/misc';

const schema = object().shape({
  currentPassword: string().required('Your current password is required'),
  newPassword1: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both password fields are required'),

  newPassword2: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both password fields are required')
    .oneOf([ref('newPassword1'), null], 'Passwords must match')
});
const INITIAL_VALUES = {
  currentPassword: '',
  newPassword1: '',
  newPassword2: ''
};
const useStyles = makeStyles(theme => ({
  info: {
    fontFamily: 'p22-underground, sans-serif',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 'normal',
    marginBottom: 20
  }
}));
const ChangePassword = ({
  currentUser,
  requestChangePassword,
  clearChangePasswordError
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const errorMessage = getErrorMessage(currentUser.changePasswordError);

  useEffect(() => {
    clearChangePasswordError();
  }, []);

  const [isClicked, handleSubmitBtn] = useState(false);
  const handleSubmit = useCallback(
    values => {
      requestChangePassword(currentUser.data.account_jwt, values);
    },
    [isClicked, handleSubmitBtn]
  );

  const [currentPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!currentPasswordVisible);
    },
    [currentPasswordVisible, setPasswordVisible]
  );

  const [firstNewPasswordVisible, setFirstPasswordVisible] = useState(false);
  const toggleFirstPassword = useCallback(
    event => {
      event.preventDefault();
      setFirstPasswordVisible(!firstNewPasswordVisible);
    },
    [firstNewPasswordVisible, setFirstPasswordVisible]
  );

  const [secondNewPasswordVisible, setSecondPasswordVisible] = useState(false);
  const toggleSecondPassword = useCallback(
    event => {
      event.preventDefault();
      setSecondPasswordVisible(!secondNewPasswordVisible);
    },
    [secondNewPasswordVisible, setSecondPasswordVisible]
  );

  const renderForm = () => (
    <Form>
      <Typography className={classes.info} variant="h3" gutterBottom>
        CHANGE PASSWORD
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="currentPassword"
            label="Current Password"
            component={InputField}
            type={currentPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{
                      fontFamily: 'p22-underground',
                      fontSize: '12px'
                    }}
                    component="button"
                    underline="always"
                    onClick={event => togglePasswordVisibility(event)}
                    children={
                      currentPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'
                    }
                  ></NavLink>
                </Box>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <AlertPanel
            p={2}
            type="error"
            bgcolor="#ffcdd2"
            text={errorMessage}
            variant="subtitle2"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newPassword1"
            label="New Password"
            component={InputField}
            type={firstNewPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{
                      fontFamily: 'p22-underground',
                      fontSize: '12px'
                    }}
                    component="button"
                    underline="always"
                    onClick={event => toggleFirstPassword(event)}
                    children={
                      firstNewPasswordVisible
                        ? 'HIDE PASSWORD'
                        : 'SHOW PASSWORD'
                    }
                  ></NavLink>
                </Box>
              )
            }}
            helperText="Must be at least 6 characters"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newPassword2"
            label="Confirm New Password"
            component={InputField}
            type={secondNewPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{
                      fontFamily: 'p22-underground',
                      fontSize: '12px'
                    }}
                    component="button"
                    underline="always"
                    onClick={event => toggleSecondPassword(event)}
                    children={
                      secondNewPasswordVisible
                        ? 'HIDE PASSWORD'
                        : 'SHOW PASSWORD'
                    }
                  ></NavLink>
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={xs ? 12 : 4}>
          <Box display="flex" alignItems="center">
            <Button fullWidth type="submit" children="Change Password" />
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
  return (
    <Grid container className="account-change-password">
      <Grid item xs={12} md={12}>
        <Formik
          initialValues={getInitialValues(INITIAL_VALUES, {})}
          onSubmit={handleSubmit}
          validationSchema={schema}
          render={renderForm}
        />
      </Grid>
    </Grid>
  );
};

ChangePassword.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestChangePassword: PropTypes.func.isRequired,
  clearChangePasswordError: PropTypes.func.isRequired
};

export default ChangePassword;
