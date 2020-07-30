import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { fonts } from '../Theme/fonts';
import { Button, AlertPanel, Loader } from '../common';
import { getErrorMessage } from '../../utils/misc';
import { InputField } from '../form-fields';

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .required('Email is required')
    .email('Please enter a valid email.')
});

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: theme.typography.headerFontFamily,
    color: theme.palette.brand.camoGreen,
    fontSize: 25,
    marginBottom: 15
  },
  info: {
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 'normal',
    marginBottom: 20
  },
  subTexts: {
    fontFamily: fonts.body,
    fontSize: '21px',
    padding: 10
  },
  inline: {
    display: 'flex'
  },
  root: {
    width: '100%',
    maxWidth: 360
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  box: {
    backgroundColor: '#003833',
    '&:hover': {
      backgroundColor: '#003833'
    }
  },
  item: {
    color: 'white'
  }
}));

const ProfileDetails = ({ currentUser, requestPatchAccount, clearPatchAccountError, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [resultVisible, setResultVisible] = useState(false);
  const prevSubmitting = usePrevious(currentUser.patchAccountSubmitting);
  const errorMessage = getErrorMessage(currentUser.patchAccountError);

  const handleSubmit = useCallback((values, actions) => {
    requestPatchAccount(currentUser.data.account_jwt, values, actions);
  });

  useEffect(() => {
    clearPatchAccountError();

    return () => {
      clearPatchAccountError();
    };
  }, []);

  useEffect(() => {
    if (prevSubmitting && !currentUser.patchAccountSubmitting) {
      if (!currentUser.patchAccountError) {
        setResultVisible(true);
      } else {
        setResultVisible(false);
      }
    }
  }, [currentUser.patchAccountSubmitting]);

  useEffect(() => {
    if (window.location.pathname.indexOf('/account/profile') !== -1) {
      window.analytics.page('Account Profile');
    }
  }, []);

  if (!currentUser.data.account_jwt) {
    return <div>No Account</div>;
  }

  if (currentUser.fetchAccountLoading === null || currentUser.fetchAccountLoading) {
    return <Loader />;
  }

  if (currentUser.fetchAccountError) {
    return (
      <AlertPanel type="error" text={getErrorMessage(currentUser.fetchAccountError)} notClosable />
    );
  }

  const initialValues = {
    firstName: currentUser.data.firstName,
    lastName: currentUser.data.lastName,
    email: currentUser.data.email
  };

  const renderForm = () => (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {currentUser.patchAccountError && (
            <AlertPanel type="error" text={errorMessage} onClose={clearPatchAccountError} />
          )}
          {resultVisible && (
            <AlertPanel
              type="success"
              text="Profile updated successfully!"
              onClose={() => setResultVisible(false)}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Field label="First Name" name="firstName" component={InputField} />
        </Grid>
        <Grid item xs={6}>
          <Field label="Last Name" name="lastName" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field label="Email" name="email" component={InputField} />
        </Grid>
        <Grid item xs={xs ? 12 : 4}>
          <Button
            mt={2}
            mp={3}
            fullWidth
            type="submit"
            loading={currentUser.patchAccountSubmitting}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <div className="account-profile">
      {xs ? (
        ''
      ) : (
        <Typography className={classes.title} variant="h1" gutterBottom>
          Your Profile
        </Typography>
      )}

      <Typography className={classes.info} variant="h3" gutterBottom>
        NAME & EMAIL
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box {...rest}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={schema}
              render={renderForm}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

ProfileDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired
};

export default ProfileDetails;
