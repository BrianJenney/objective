import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { makeStyles, styled } from '@material-ui/core/styles';
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
import ContactMail from '../components/common/Icons/ContactMail/ContactMail';

import { fonts } from './Theme/fonts';

import {
  StyledBackground,
  StyledSubHeader,
  StyledHours,
  StyledParagraph1,
  StyledParagraph2,
  StyledPhoneNumber,
  StyledContainerBackground,
  StyledEmail,
  StyledHeader,
  StyledMoreQuestions
} from '../pages/contactUs/StyledComponents';

const { $brandSans, $brandSerif, body } = fonts;

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


const StyledContainerBackgroundAlt = styled(StyledContainerBackground)({
  padding: '0px',
    width: 'auto',
    height: 570,
});


const StyledParagraph1Alt = styled(StyledParagraph1)({
  paddingLeft: '0px',
  paddingRight: '0px',
});

const StyledParagraph2Alt = styled(StyledParagraph2)({
  paddingLeft: '0px',
  paddingRight: '0px',
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))(MuiDialogContent);

const DialogContentMobile = withStyles(theme => ({
  root: {
    display: 'none',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  }
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    height: 270,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      height: 'auto'
    }
  },
  phoneGrid: {
    borderRight: '1px solid #979797',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      borderRight: 'none',
      borderBottom: '1px solid #979797',
      marginBottom: 33.9
    }
  },
  mailGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '400px',
    paddingTop: 10,
    [theme.breakpoints.down('xs')]: {
      width: 'auto'
    }
  },
  subHeadTitle: {
    fontFamily: $brandSerif,
    fontSize: '38px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.27,
    letterSpacing: 'normal',
    color: '#231f20',
    paddingTop: 50,
    paddingBottom: 14,
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSerif,
      fontSize: '30px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.27,
      letterSpacing: 'normal',
      color: '#231f20',
      paddingBottom: 7,
      paddingTop: 0,
    }
  }
}));

const NeedHelpDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <ListItem style={{ padding: 0 }}>
        <NavLink
          onClick={handleClickOpen}
          style={{ textDecoration: 'underline' }}
        >
          CONTACT US
        </NavLink>
      </ListItem>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} />
        <DialogContent>
          <Container>
            <StyledContainerBackgroundAlt>
              <Grid>
                <Box textAlign="center">
                  <StyledHeader className={classes.subHeadTitle}>Need Help?</StyledHeader>
                </Box>
                <Box textAlign="center">
                  <StyledSubHeader>
                    We'd love to hear from you. You can reach us by phone or email.
                  </StyledSubHeader>
                </Box>
                <Box textAlign="center">
                  <StyledHours>
                   <strong>Mon-Fri</strong> 8am-8pm EST/ 5am-5pm PST
                  </StyledHours>
                </Box>
              </Grid>
              <Box className={classes.box}>
                <Grid className={classes.phoneGrid}>
                  <Box textAlign="center">
                    <ContactPhone />
                  </Box>
                  <Box textAlign="center">
                    <StyledParagraph1Alt>
                      Give us a call for immediate assistance and chat with one
                      of our customer care specialists.
                    </StyledParagraph1Alt>
                    <StyledPhoneNumber>
                      <Link
                        href="tel:800-270-5771"
                        style={{ textDecoration: 'none' }}
                      >
                        (800) 270-5771
                      </Link>
                    </StyledPhoneNumber>
                  </Box>
                </Grid>
                <Grid className={classes.mailGrid}>
                  <Box textAlign="center">
                    <ContactMail />
                  </Box>
                  <Box textAlign="center">
                    <StyledParagraph2Alt>
                      Email our customer care department. We'll respond as soon
                      as possible.
                    </StyledParagraph2Alt>
                    <StyledEmail>
                      <Link
                        style={{
                          cursor: 'pointer',
                          borderBottom: '1px solid #000',
                          paddingBottom: '1.5px',
                          textDecoration: 'none'
                        }}
                        href="mailto:help@objectivewellness.com"
                      >
                        help@objectivewellness.com
                      </Link>
                    </StyledEmail>
                  </Box>
                </Grid>
              </Box>
            </StyledContainerBackgroundAlt>
          </Container>
        </DialogContent>
        <Container className="checkout-contact-container">
        <DialogContentMobile>
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
                    Need help? Give us a call for assistance.
                  </Typography>
                  <Typography variant="h4">
                     <strong>Mon-Fri</strong> 8am-8pm EST/ 5am-5pm PST
                  </Typography>
                  <Typography>
                    <Link
                      href="tel:800-270-5771"
                      style={{ textDecoration: 'none' }}
                    >
                      (800) 270-5771
                    </Link>
                  </Typography>
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
                    <Link
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #000',
                        paddingBottom: '1px',
                        textDecoration: 'none'
                      }}
                      href="mailto:help@objectivewellness.com"
                    >
                      help@objectivewellness.com
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContentMobile>
        </Container>
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
          background: '#f6f5f1',
          borderTop: '1px solid',
          fontFamily: 'proxima-nova, sans-serif',
          fontSize: 18,
          display: 'flex'
        }}
      >
        <span style={{ paddingRight: 5 }}>Need Help?</span> <NeedHelpDialog />
      </div>
    );
  }
}

export default CheckoutFooter;
