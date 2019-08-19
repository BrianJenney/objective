import React, { useState, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';

const withDialog = (WrappedComponent) => {
  const  WithDialog = (props) => {
    const [open, setOpen] = useState(true);
    const handleDialogClose = useCallback(() => {
      setOpen(false);
    },[]);
    return (
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onExited={props.onExited}
      >
        <WrappedComponent closeDialog={handleDialogClose} {...props} />
      </Dialog>
    );
  };
  return WithDialog;
};

export default withDialog;
