import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useTheme, withStyles } from '@material-ui/core/styles';
import ScrollToTop from './common/ScrollToTop';

import { Button, NavLink } from './common';
import Link from '@material-ui/core/Link';
import './Footer-style.scss';


import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ContactPhone from './common/Icons/ContactPhone/ContactPhone';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);


const NeedHelpDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem style={{ padding: 0 }}>
        <NavLink onClick={handleClickOpen} style={{ textDecoration: 'underline' }}>CONTACT US</NavLink>
      </ListItem>
      <Dialog
        className="checkout-contact-container"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} />
        <DialogContent>
          <Box textAlign="center">
            <Grid
              container
              spacing={0}
              style={{ borderBottom: '1px solid #979797' }}
            >
              <Grid item>
                <Box textAlign="center">
                  <ContactPhone />
                </Box>
                <Box textAlign="center" pb={2}>
                  <Typography variant="h2">
                    Need help? Give us a call for immediate assistance:
                  </Typography>
                  <Typography>(800) 270-5771</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item>
                <Box textAlign="center" px={3}>
                  <Typography variant="h3">
                    or send us an email and will get back to you as soon as
                    possible:
                  </Typography>
                  <Typography variant="h4">
                    <Link style={{
                      cursor: "pointer", borderBottom: "1px solid #000",
                      paddingBottom: "1px", textDecoration: "none"
                    }}>
                      help@objectivewellnes.com
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
class CheckoutFooter extends React.Component {
  render() {
    return (
      <div
        className="checkout-footer-container"
        style={{
          padding: 50,
          background: 'rgba(252, 248, 244, 0.5)',
          borderTop: '1px solid',
          fontFamily: 'p22-underground, sans-serif',
          fontSize: 18,
          display: 'flex'
        }}
      >
        <span style={{ paddingRight: 5 }}>Need Help?</span>{' '}
        <NeedHelpDialog />
      </div>
    );
  }
}

export default CheckoutFooter;
