import React from 'react';
import { object, string } from 'yup';
import { Formik, Field } from 'formik';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';
import { InputField } from '../../components/form-fields';
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

        <Button fullWidth type="submit" children="Submit" />
      </Box>
    </Paper>
  );
  return <Formik validationSchema={schema} render={renderFormDialog} />;
};

export default withDialog(ProductPopUp);
