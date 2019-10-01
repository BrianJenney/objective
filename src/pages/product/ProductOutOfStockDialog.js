import React from 'react';
import { object, string } from 'yup';
import { Formik, Field, Form  } from 'formik';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';
import { InputField, CheckboxField } from '../../components/form-fields';
import { Button } from '../../components/common';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email')
});

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '35px',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: '18px'
  },
  name: {
    color: '#003732',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  bigAvatar: {
    width: 100,
    height: 100
  },

  paper: {
    padding: theme.spacing(5)
  }
}));

const ProductOutOfStockForm = ({
  closeDialog,
  product_img,
  product_name,
}) => {
  const classes = useStyles();
  const initialValues = {
    email: '',
    subscribed: false,
  };

  const handleEmailNotification = (values) => {
    const { email, subscribed } = values;
    // send email notification
    // alert(`send email notification to ${email} with ${subscribed}`);
    closeDialog();
  };

  const renderForm = ({ values, isValid}) => (
    <Form>
      <Paper className={classes.paper}>
        <CssBaseline />
        <Box align="center">
          <Typography gutterBottom className={classes.title}>
            It'll be back soon, we promise!
          </Typography>

          <Box m={(2, 2)} align="center">
            <Typography gutterBottom className={classes.subTitle}>
              We don't have this at the moment, but
            </Typography>
            <Typography gutterBottom className={classes.subTitle}>
              we'll let you know as soon as it's in stock
            </Typography>
            <CardMedia image={product_img} className={classes.bigAvatar} />
            <Typography className={classes.name} gutterBottom>
              {product_name}
            </Typography>
          </Box>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
          <Box align="start">
            <Field
              name="subscribed"
              label="Subscribe to True Health news"
              color="primary"
              component={CheckboxField}
              value={values.subscribed}
            />
          </Box>
          <Button fullWidth type="submit" children="Submit" disabled={!isValid}/>
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
