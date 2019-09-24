import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InputField } from '../form-fields';
import { Button, NavLink } from '../common';
import { getInitialValues } from '../../utils/misc';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
const schema = object().shape({
  currentPassword: string().required('Your current password is required'),
  newPassword1: string().required('Both password fields are required'),
  newPassword2: string().required('Both password fields are required')
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
const ChangePasswordForm = ({
  title,
  currentUser,
  onBack,
  backLabel,
  submitLabel,
  defaultValues
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const handleSubmit = values => {
    store.dispatch(requestPatchAccount(currentUser.data.account_jwt, values));
  };

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
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.info} variant="h3" gutterBottom>
            CHANGE PASSWORD
          </Typography>
          <Field
            name="currentPassword"
            label="Current Password"
            component={InputField}
            type="password"
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
          <Field
            name="newPassword1"
            label="New Password"
            component={InputField}
            type="password"
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
            type="password"
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
            {' '}
            {onBack && (
              <Button
                type="button"
                onClick={onBack}
                children={backLabel}
                mr={2}
              />
            )}
            <Button fullWidth type="submit" children={submitLabel} />
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
  return (
    <Grid container className="account-change-password">
      <Grid item xs={12} md={12}>
        <Formik
          initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
          onSubmit={handleSubmit}
          validationSchema={schema}
          render={renderForm}
        />
      </Grid>
    </Grid>
  );
};
ChangePasswordForm.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};
ChangePasswordForm.defaultProps = {
  defaultValues: {},
  submitLabel: 'Change Password',
  backLabel: 'Cancel'
};
export default ChangePasswordForm;
