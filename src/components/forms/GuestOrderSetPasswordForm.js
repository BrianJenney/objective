import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InputField } from '../form-fields';
import { Button, NavLink } from '../common';
import { getInitialValues } from '../../utils/misc';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiInputLabel-root': {
      fontSize: '16px'
    },
    '& .MuiInputBase-root': {
      fontSize: '16px'
    },
    '& .MuiFormHelperText-root': {
      fontSize: '11px',
      color: '#231f20'
    },
    '& .MuiInputBase-input': {
      zIndex: 1
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#231f20',
      backgroundColor: '#fff'
    }
  }
}));

const schema = object().shape({
  password: string()
    .required('Password is required')
    .min(6, 'Password has to be longer than 6 characters!')
});

const INITIAL_VALUES = {
  password: ''
};

const GuestOrderSetPasswordForm = ({
  title,
  defaultValues,
  onSubmit,
  submitLabel,
  isSuccessful,
  handleOrderDetail,
  style
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!passwordVisible);
    },
    [passwordVisible, setPasswordVisible]
  );
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const renderForm = () => (
    <Form
      style={{
        backgroundColor: 'rgba(195, 241, 207, 0.5)',
        padding: '5px 25px 26px 24px',
        ...style
      }}
      className={classes.root}
    >
      {title && (
        <Typography
          variant="h6"
          gutterBottom
          children={title}
          style={{ fontSize: '26px', lineHeight: '2rem', marginTop: '16px' }}
        />
      )}
      <Grid container spacing={2}>
        <Grid
          item
          xs={xs ? 12 : 8}
          style={{ display: !isSuccessful ? 'flex' : 'none', marginTop: '16px' }}
        >
          <Field
            name="password"
            label="Password"
            component={InputField}
            type={passwordVisible ? 'text' : 'password'}
            style={{ zIndex: 1 }}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right" style={{ zIndex: 1 }}>
                  <NavLink
                    style={{
                      fontFamily: 'proxima-nova, sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: '#553226'
                    }}
                    type="button"
                    underline="always"
                    onClick={event => togglePasswordVisibility(event)}
                    children={passwordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                  />
                </Box>
              )
            }}
          />
        </Grid>

        <Grid item xs={xs || isSuccessful ? 12 : 4} style={{ padding: '4px' }}>
          {!isSuccessful && (
            <Button
              type="submit"
              children={submitLabel}
              style={{
                height: '60px',
                padding: '0px 40px',
                marginTop: '16px',
                marginBottom: '10px'
              }}
            />
          )}
          {isSuccessful && handleOrderDetail && (
            <Button
              type="button"
              onClick={handleOrderDetail}
              children={submitLabel}
              style={{
                height: '60px',
                padding: '0px 40px',
                marginTop: '16px',
                marginBottom: '10px'
              }}
            />
          )}
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

GuestOrderSetPasswordForm.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

GuestOrderSetPasswordForm.defaultProps = {
  defaultValues: {},
  submitLabel: 'Create Password'
};

export default GuestOrderSetPasswordForm;
