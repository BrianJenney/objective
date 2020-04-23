import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InputField } from '../form-fields';
import { Button, AlertPanel } from '../common';
import { getInitialValues } from '../../utils/misc';
import EventEmitter from '../../events';
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
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#231f20'
    }
  },
  title: { fontSize: '26px', textAlign: 'center' }
}));

const schema = object().shape({
  email: string().required('Email is required'),
  orderNumber: string().required('Order number is required'),
  zip: string().required('Zip is required')
});

const INITIAL_VALUES = {
  email: '',
  orderNumber: '',
  zip: ''
};

const OrderTrackerForm = ({
  title,
  defaultValues,
  submitLabel,
  requestFindOrdersByAccount,
  receivedGetOrder,
  requestFetchAccount,
  dispatch,
  history
}) => {
  const [orderFoundError, setOrderFoundError] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const queryStringParams = queryString.parse(history.location.search);

  const onSubmit = (values, actions) => {
    dispatch(
      requestFindOrdersByAccount(false, {
        orderNumber: values.orderNumber.trim(),
        email: values.email.trim(),
        'billingAddress.zipcode': values.zip.trim()
      })
    );
    //We received a response from the server for the order request
    EventEmitter.once('RECEIVED_FIND_ORDERS_BY_ACCOUNT', d => {
      if (d.payload.length > 0) {
        //Order found
        const order = d.payload[0];
        //Let's fetch an account so that we can get the jwt to allow user to cancel account.
        dispatch(
          requestFetchAccount(
            {
              query: {
                _id: order.accountId,
                $select: ['_id', 'firstName', 'lastName', 'email', 'storeCode', 'isGuest', 'passwordSet']
              },
              accessScope: { 'order.cancel': order._id }
            },
            true
          )
        );
        //We received a successful response for fetching account
        EventEmitter.once('RECEIVED_FETCH_ACCOUNT_SUCCESS', data => {
          //An account currently exists for this order, let's set the order payload and redirect to the order details page
          if (data.payload._id) {
            order.account = { ...data.payload, isGuest: true, temporarilyLogin: true };
            dispatch(receivedGetOrder(order));
            history.push(`/orders/${order._id}`);
          } else {
            //No account holder found, display error message
            setOrderFoundError(true);
            if (actions) {
              actions.setSubmitting(false);
            }
          }
        });
      } else {
        //Order not found, display error message
        setOrderFoundError(true);
        if (actions) {
          actions.setSubmitting(false);
        }
      }
    });
  };

  if (queryStringParams.email && queryStringParams.zip && queryStringParams.orderNumber) {
    INITIAL_VALUES.email = queryStringParams.email;
    INITIAL_VALUES.zip = queryStringParams.zip;
    INITIAL_VALUES.orderNumber = queryStringParams.orderNumber;
  }

  useEffect(() => {
    if (INITIAL_VALUES.email !== '' && INITIAL_VALUES.zip !== '' && INITIAL_VALUES.orderNumber !== '') {
      onSubmit(INITIAL_VALUES);
    }
  }, [INITIAL_VALUES]);

  const renderForm = () => (
    <Form className={classes.root}>
      {title && <Typography variant="h6" gutterBottom children={title} className={classes.title} />}
      {orderFoundError && (
        <AlertPanel
          type="error"
          text={`Order number could not be found. Please try again or contact us for help.`}
          onClose={() => {
            setOrderFoundError(false);
          }}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field name="email" label="Email" component={InputField} type="email" />
        </Grid>

        <Grid item xs={12}>
          <Field name="orderNumber" label="Order Number" component={InputField} type="text" />
        </Grid>

        <Grid item xs={12}>
          <Field name="zip" label="Zip Code" component={InputField} type="text" />
        </Grid>

        <Grid item xs={12} style={{}}>
          <Button
            fullWidth
            type="submit"
            children={submitLabel}
            style={{ height: '60px', padding: '0px 40px', width: '100%' }}
          />
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

OrderTrackerForm.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

OrderTrackerForm.defaultProps = {
  defaultValues: {},
  submitLabel: 'Check Status'
};

export default OrderTrackerForm;
