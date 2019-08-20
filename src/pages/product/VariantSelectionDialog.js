import React, { useContext, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, number } from 'yup';

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
import withDialog from '../../hoc/withDialog';

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

const VariantSelectionForm = ({dropdownType, closeVariantSelectionDialog, closeDialog, onExited}) => {
  const { variants } = useContext(ProductContext);

  const handleClose = useCallback(() => {
    closeDialog();
    closeVariantSelectionDialog();
  },[closeVariantSelectionDialog, closeDialog]);

  const handleSubmit = useCallback((values) => {
    const variant = variants[values.selectedVariantIndex];
    handleClose();
    onExited(variant);
  }, [onExited, handleClose, variants]);

  const renderForm = ({ values }) => {

    const dropdownOptions = variants.filter(variant => variant.attributes[0].name === dropdownType)
                                    .map((variant, index) => {
                                      const dropdownValue = variant.attributes[0].value;
                                      return {
                                        key: variant._id,
                                        label: `${dropdownValue} @ $${variant.price.$numberDecimal}`,
                                        value: String(index)
                                      }
                                    });

    return (
      <Form>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <strong>{dropdownType}</strong>
        </DialogTitle>
        <DialogContent dividers>
          <Field
            component={RadioGroupField}
            name="selectedVariantIndex"
            options={dropdownOptions}
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
