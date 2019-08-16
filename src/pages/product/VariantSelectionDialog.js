import React, { Component, useContext, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, number } from 'yup';
import { Container, FormLabel } from '@material-ui/core';
import ProductContext from '../../contexts/ProductContext';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { Button } from '../../components/common';
import { RadioGroupField } from '../../components/form-fields';
import withDialog from '../../components/common/withDialog';

const schema = object().shape({ selectedVariantIndex: number() });
const INITIAL_VALUES = {
  selectedVariantIndex: null
};

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const VariantSelectionForm = ({closeVariantSelectionDialog, closeDialog, onExited}) => {
  const { variants } = useContext(ProductContext);

  const handleClose = () => {
    closeDialog();
    closeVariantSelectionDialog();
  };

  const handleSubmit = values => {
    const variant = variants[values.selectedVariantIndex];
    console.log('variant:', variant )
    handleClose();
    onExited(variant);
  };

  const renderForm = ({ values }) => {

    const variantOptions = variants.map((variant, index) => ({
      key: variant._id,
      label: `${variant.sku}: $${variant.price.$numberDecimal}`,
      value: String(index)
    }));

    return (
      <Form>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <strong>Product Variant</strong>
        </DialogTitle>
        <DialogContent dividers>
          <Field
            component={RadioGroupField}
            name="selectedVariantIndex"
            options={variantOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" type="submit" disabled={values.selectedVariantIndex === null}>
            Save
          </Button>
        </DialogActions>
      </Form>
    );
  };

  if (!variants) {
    return null;
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

export default withDialog(VariantSelectionForm);
