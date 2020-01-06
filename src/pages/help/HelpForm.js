import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTheme  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

import { Button } from '../../components/common';
import { InputField, TextareaField} from '../../components/form-fields';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  orderId: '',
  message: '',
};

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .email('Invalid email')
    .required('Email is required'),
  message: string()
    .required('Message is required'),
});

const HelpForm = ({
  title,
  closeDialog,
  showHelpConfirmedDialog
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const handleCreateCase = useCallback((values) => {
    // send values to email manager
    closeDialog();
    showHelpConfirmedDialog();
  }, [closeDialog, showHelpConfirmedDialog]);

  const renderForm = ({ isValid }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={xs ? 12 : 6}>
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={xs ? 12 : 6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
        <Grid item xs={xs ? 12 : 6}>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={xs ? 12 : 6}>
          <Field
            name="phone"
            label="Phone"
            component={InputField}
            autoComplete="phone"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="orderId"
            label="Order ID"
            component={InputField}
            autoComplete="orderId"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="message"
            color="primary"
            label="What can we help you with today?"
            rows={5}
            maxRows={10}
            component={TextareaField}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            children="Submit"
            disabled={!isValid}
            className="create-account-btn"
          />
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleCreateCase}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

HelpForm.propTypes = {
  title: PropTypes.string,
  closeDialog: PropTypes.func.isRequired,
  showHelpConfirmedDialog: PropTypes.func.isRequired,
};

export default HelpForm;
