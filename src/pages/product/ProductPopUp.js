import React from 'react';
import { object, string } from 'yup';
import { Formik, Field } from 'formik';
import {
  CssBaseline,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  CardMedia,
  Box
} from '@material-ui/core';
import withDialog from '../../hoc/withDialog';
import { InputField } from '../../components/form-fields';
import { makeStyles } from '@material-ui/core/styles';
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
  button: {
    height: '50px',
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'bold'
  },
  paper: {
    padding: theme.spacing(5)
  }
}));

const ProductPopUp = props => {
  const classes = useStyles();
  const renderFormDialog = () => (
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
          <CardMedia image={props.product_img} className={classes.bigAvatar} />
          <Typography className={classes.name} gutterBottom>
            {props.product_name}
          </Typography>
        </Box>
        <Field
          name="email"
          label="Email Address"
          component={InputField}
          autoComplete="email"
        />
        <Box align="start">
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Subscribe to True Health news"
          />
        </Box>

        <Button
          className={classes.button}
          fullWidth
          type="submit"
          children="Submit"
        />
      </Box>
    </Paper>
  );
  return <Formik validationSchema={schema} render={renderFormDialog} />;
};

export default withDialog(ProductPopUp);
