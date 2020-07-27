import React from 'react';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';
import { InputField, CheckboxField } from '../form-fields';
import { Button } from '../common';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Must be a valid email address')
});

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '36px',
    fontFamily: 'Canela Text Web',
    lineHeight: 'normal',
    paddingBottom: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
      paddingBottom: '8px',
      width: '300px'
    }
  },
  subTitle: {
    fontSize: '20px',
    fontFamily: 'FreightTextProBook',
    lineHeight: '1.5',

    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      lineHeight: '1.43'
    }
  },
  name: {
    fontSize: '30px',
    fontFamily: 'Canela Text Web',
    paddingBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
      paddingBottom: '16px'
    }
  },
  bigAvatar: {
    width: 111,
    height: 129,
    margin: '14px 0'
  },

  paper: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    }
  },
  box: {
    width: '340px',
    [theme.breakpoints.down('xs')]: {
      width: '250px'
    }
  }
}));

const ProductOutOfStockForm = ({
  closeDialog,
  product_img,
  product_name,
  product_color,
  product_category,
  product_id,
  product_sku,
  product_variant,
  product_url,
  handleOpenEmailConfirmation
}) => {
  const classes = useStyles();
  const initialValues = {
    email: '',
    subscribed: true
  };

  const handleEmailNotification = values => {
    const { email, subscribed } = values;
    // send email notification
    // alert(`send email notification to ${email} with ${subscribed}`);

    window.analytics.track('Email Capture Successful', {
      email: email,
      site_location: 'back in stock'
    });

    window.analytics.track('Email Capture Completed', {
      email: email,
      site_location: 'back in stock'
    });

    if (subscribed) {
      window.analytics.track('Subscribed', {
        email: email,
        site_location: 'back in stock'
      });

      window.analytics.track('Subscribed Listrak Auto', {
        email: email,
        site_location: 'back in stock'
      });
    }
    // Listrak event
    let listrakProductSku = product_variant ? product_variant : product_sku; //For some reason a different value for 'product_sku' is being passed to the component on the PDP vs on the Gallery page. This hotfix guarantees the right value for now
    //This try-catch block prevents the ProductOutOfStockForm from breaking if Listrak as a destination isn't enabled in Segment
    try {
      window._ltk.Alerts.AddAlert(email, listrakProductSku, 'BIS');
      window._ltk.Alerts.Submit();
    } catch (e) {
      console.log(e.message);
    }
    handleOpenEmailConfirmation();

    closeDialog();
  };

  const renderForm = ({ values, isValid }) => (
    <Form>
      <Paper className={classes.paper}>
        <CssBaseline />
        <Box align="center">
          <Typography className={classes.title}>It'll be back soon, we promise!</Typography>

          <Box className={classes.box}>
            <Typography className={classes.subTitle}>
              We don't have this at the moment, but we'll let you know as soon as it's in stock
            </Typography>

            <CardMedia image={product_img} className={classes.bigAvatar} />
            <Typography style={{ color: product_color }} className={classes.name}>
              {product_name}
            </Typography>
          </Box>
          <Box align="start">
            <Field name="email" label="Email Address" component={InputField} autoComplete="email" />
            <Box align="start">
              <Field
                style={{ padding: '20px 7px 20px 0' }}
                name="subscribed"
                label="Subscribe for tips and new product launches"
                color="primary"
                component={CheckboxField}
                value={values.subscribed}
              />
            </Box>
            <Button fullWidth type="submit" children="Submit" disabled={!isValid} />
          </Box>
        </Box>
      </Paper>
    </Form>
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleEmailNotification}
      render={renderForm}
    />
  );
};

export default withDialog(ProductOutOfStockForm);
