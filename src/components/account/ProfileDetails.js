import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fonts } from '../Theme/fonts';
import { Button } from '../common';
import { InputField } from '../form-fields';
import ProfileUpdateFeedback from '../../pages/account/ProfileUpdateFeedback';

const schema = object().shape({
  firstName: string(),
  lastName: string(),
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
    fontFamily: fonts.header,
    fontSize: 48,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  info: {
    fontFamily: 'p22-underground, sans-serif',
    fontSize: 18,
    fontWeight: 600,
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

const ProfileDetails = ({ currentUser, requestPatchAccount }) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [isClicked, handleSubmitBtn] = useState(false);
  const prevSubmitting = usePrevious(currentUser.loading);

  const handleSubmit = useCallback(values => {
    requestPatchAccount(currentUser.data.account_jwt, values);
  });

  useEffect(() => {
    if (prevSubmitting && !currentUser.loading && !currentUser.error) {
      handleSubmitBtn(!isClicked);
    }
  }, [currentUser.loading]);

  const INITIAL_VALUES = {
    firstName: currentUser.data.firstName,
    lastName: currentUser.data.lastName,
    email: currentUser.data.email,
    phone: currentUser.data.phone
  };
  if (!currentUser.data.account_jwt) {
    return <div>No Account</div>;
  }

  const renderForm = () => {
    let accountError = null;
    if (currentUser.error) {
      accountError =
        currentUser.error.message ||
        currentUser.error.errorMessage ||
        currentUser.data.errorMessage;
    }

    return (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field label="First Name" name="firstName" component={InputField} />
          </Grid>
          <Grid item xs={6}>
            <Field label="Last Name" name="lastName" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Email" name="email" component={InputField} />
          </Grid>
          {/* <Grid item xs={12}>
            <Field label="Phone Number" name="phone" component={InputField} />
          </Grid> */}
          <Grid item xs={xs ? 12 : 4}>
            <Button mt={2} mp={3} fullWidth type="submit">
              Save Changes
            </Button>
            {isClicked && <ProfileUpdateFeedback error={accountError} />}
          </Grid>
        </Grid>
      </Form>
    );
  };
  console.log('--PROFILEDETAIL--', currentUser);
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
        NAME {'&'} EMAIL
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            validationSchema={schema}
            render={renderForm}
            enableReinitialize
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProfileDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

export default ProfileDetails;
