import React from 'react';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import withDialog from '../../hoc/withDialog';
import { InputField } from '../../components/form-fields';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email')
});

const ProductPopUp = () => {
  const renderFormDialog = () => (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} p={4}>
        <Box component={Typography} variant="h5" my={3} align="center">
          It'll be back soon, we promise!
        </Box>
        <Box component={Typography} variant="h4" align="center">
          We don't have this at the moment, but we'll let you know as soon as
          it's in stock
        </Box>
        <Grid item xs={12}>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
        </Grid>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Subscribe to True Health news"
        />
        <Grid item xs={12}>
          <Button fullWidth type="submit" children="Submit" />
        </Grid>
      </Box>
    </Container>
  );
  return <Formik validationSchema={schema} render={renderFormDialog} />;
};

export default withDialog(ProductPopUp);
