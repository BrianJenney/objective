import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom';
import { compose } from 'redux';
import CheckoutFooter from './CheckoutFooter';


import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import { Divider } from '@material-ui/core';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';

import { Button, NavLink } from './common';
import { InputField } from './form-fields';
import './Footer-style.scss';
import { Container } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ContactMail from './common/Icons/ContactMail/ContactMail';
import ContactPhone from './common/Icons/ContactPhone/ContactPhone';

const arrowImage = require('../../src/assets/images/arrow.png');
const igIcon = require('../../src/assets/images/instagram.png');
const fbIcon = require('../../src/assets/images/facebook.png');

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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ContactUsDialogDesktop = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem>
        <NavLink onClick={handleClickOpen}>Contact Us</NavLink>
      </ListItem>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Box textAlign="center">
            <Typography variant="h1">Contact us</Typography>
          </Box>
          <Box textAlign="center">
            <Typography gutterBottom>
              We'd love to hear from you. You can reach us by phone or email.
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box py={3} px={4}>
            <Grid container spacing={0}>
              <Grid item xs={6} px={4} py={4} style={{ borderRight: '0.1em solid #979797' }}>
                <Box textAlign="center">
                  <ContactPhone />
                </Box>
                <Box textAlign="center">
                  <Typography>
                    Give us a call for immediate assistance and chat with one of our customer care specialists.
                  </Typography>
                  <Typography variant="h4">(800) 270-5771</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} pl={8} py={4}>
                <Box textAlign="center">
                  <ContactMail />
                </Box>
                <Box textAlign="center">
                  <Typography pl={8}>
                    Email our customer care department. We'll respond as soon as possible.
                  </Typography>
                  <Typography variant="h4">help@objectivewellnes.com</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div >
  );
};
const ContactUsDialogMobile = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem>
        <NavLink onClick={handleClickOpen}>Contact Us</NavLink>
      </ListItem>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Box textAlign="center">
            <Typography variant="h1">Contact us</Typography>
          </Box>
          <Box textAlign="center">
            <Typography gutterBottom variant="h4">
              We'd love to hear from you. You can reach us by phone or email.
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <Grid container spacing={0} style={{ borderBottom: '0.1em solid #979797' }}>
              <Grid item>
                <Box textAlign="center">
                  <ContactPhone />
                </Box>
                <Box textAlign="center" pb={2}>
                  <Typography variant="h4">
                    Give us a call for immediate assistance and chat with one of our customer care specialists.
                  </Typography>
                  <Typography>(800) 270-5771</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item>
                <Box textAlign="center" pt={2}>
                  <ContactMail />
                </Box>
                <Box textAlign="center">
                  <Typography variant="h4">
                    Email our customer care department. We'll respond as soon as possible.
                  </Typography>
                  <Box>
                    <Typography variant="h4">help@objectivewellnes.com</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div >
  );
};

const NeedHelpDialogDesktop = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem>
        <NavLink onClick={handleClickOpen}>Need Help</NavLink>
      </ListItem>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} />
        <DialogContent>
          <Box textAlign="center">
            <Grid container spacing={0} style={{ borderBottom: '0.1em solid #979797' }}>
              <Grid item>
                <Box textAlign="center">
                  <ContactPhone />
                </Box>
                <Box textAlign="center" pb={2}>
                  <Typography variant="h1">Need help? Give us a call for immediate assistance</Typography>
                  <Typography variant="h1">(800) 270-5771</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item>
                <Box textAlign="center" pl={20}>
                  <Typography variant="h4">
                    or send us an email and will get
                  </Typography>
                  <Typography variant="h4">
                    back to you as soon as possible:
                  </Typography>
                  <Typography variant="h4">help@objectivewellnes.com</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div >
  );
};

const NeedHelpDialogMobile = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem>
        <NavLink onClick={handleClickOpen}>Need Help</NavLink>
      </ListItem>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} />
        <DialogContent>
          <Box textAlign="center">
            <Grid container spacing={0} style={{ borderBottom: '0.1em solid #979797' }}>
              <Grid item>
                <Box textAlign="center">
                  <ContactPhone />
                </Box>
                <Box textAlign="center" pb={2}>
                  <Typography>Need help? Give us a call for immediate assistance</Typography>
                  <Typography>(800) 270-5771</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item>
                <Box textAlign="center" px={3}>
                  <Typography variant="h4">
                    or send us an email and will get back to you as soon as possible:
                  </Typography>
                  <Typography variant="h4">help@objectivewellnes.com</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div >
  );
};

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email address')
});

const StyledBox = withStyles(() => ({
  root: {
    fontFamily: 'p22-underground, sans-serif',
    fontWeight: 'normal',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontSize: 16
    // lineHeight: '44px'
  }
}))(Box);

const StyledList = withStyles(() => ({
  root: {
    fontFamily: 'FreightTextProBook',
    fontWeight: 'normal',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: 18,
    lineHeight: '2.22'
  }
}))(List);

const StyledLegalList = withStyles(() => ({
  root: {
    fontFamily: 'p22-underground, sans-serif',
    fontWeight: 'normal',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.83px',
    fontSize: 10,
    lineHeight: 'normal'
  }
}))(List);

const Footer = ({ location }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const isCheckoutPage = matchPath(location.pathname, { path: '/checkout' });

  console.log('here', location, isCheckoutPage)
  return (
    <>
      {xs && !isCheckoutPage ? (
        <StyledBox className="footer-container">
          <Container>
            <Grid container spacing={0}>
              <Grid container item={true} xs={12} className="promise">
                <Grid item xs={12}>
                  Diamond Logo
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom className="uppercase">
                    Dek Line Goes Here
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    Brunch church-key reclette chartreuse poke, XOXO next level
                    shaman hot chicken sustainable vegan yr jianbing affogato.
                    Hot chicken Schlitz squad, migas single-origin single-origin
                    coffee chambray umami raclette.
                  </p>
                </Grid>
              </Grid>
              <div className="footer-main-holder">
                <Grid container className="footer-main" xs={12}>
                  <Grid item xs={6} className="border-bottom row1">
                    <StyledBox>OBJ Logo</StyledBox>
                  </Grid>
                  <Grid item xs={6} className="border-bottom border-left row1">
                    <StyledBox>
                      <div className="rotate">Copyright 2019</div>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={6} className="row2 border-bottom">
                    <Grid container spacing={0}>
                      <Grid item xs={12} className="title">
                        <NavLink to="/gallery">About</NavLink>
                      </Grid>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink to="/ourstory">Our Story</NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink to="/ingredients">Ingredients</NavLink>
                        </ListItem>
                        <ListItem>
                          <ContactUsDialogMobile />
                        </ListItem>
                      </StyledList>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="row2 border-bottom border-left">
                    <Grid container spacing={0}>
                      <Grid item xs={12} className="title">
                        <NavLink to="/gallery">Help</NavLink>
                      </Grid>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink to="/ourstory">FAQs</NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink to="/ingredients">Contact Us</NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink to="/contact">Accounts &amp; Orders</NavLink>
                        </ListItem>
                      </StyledList>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="border-bottom signup-box p-20">
                    <span>Sign up for tips and new product launches.</span>
                    <Formik
                      initialValues={{ email: '' }}
                      onSubmit={() => null}
                      validationSchema={schema}
                      render={() => (
                        <Form>
                          <Field
                            name="email"
                            label=""
                            placeholder="Your Email"
                            component={InputField}
                          />
                          <Button type="submit">
                            <img
                              src={arrowImage}
                              className="mobile-arrow"
                              alt="arrow"
                            />
                          </Button>
                        </Form>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} className="border-bottom icon">
                    <NavLink href="http://www.instagram.com">
                      <img src={igIcon} alt="instagram" />
                    </NavLink>
                  </Grid>
                  <Grid item xs={6} className="border-bottom border-left icon">
                    <NavLink href="https://www.facebook.com">
                      <img src={fbIcon} alt="facebook" />
                    </NavLink>
                  </Grid>
                  <Grid container item={true} xs={12} className="legal">
                    <StyledList>
                      <ListItem className="text-center">
                        Objective &bull; All rights reserved
                      </ListItem>
                    </StyledList>
                  </Grid>
                  <Grid container xs={12} className="legal">
                    <StyledList>
                      <ListItem className="text-center">
                        <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                      </ListItem>
                      <ListItem className="text-center">
                        <NavLink to="/terms">Terms of use</NavLink>
                      </ListItem>
                    </StyledList>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Container>
        </StyledBox>
      ) :
        (!isCheckoutPage ?
          (
            <StyledBox className="footer-container">
              <Container>
                <Grid container spacing={0}>
                  <Grid container item={true} xs={12} className="promise">
                    <Grid item xs={12}>
                      Diamond Logo
                </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" gutterBottom className="uppercase">
                        Dek Line Goes Here
                  </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <p>
                        Brunch church-key reclette chartreuse poke, XOXO next level
                        shaman hot chicken sustainable vegan yr jianbing affogato.
                        Hot chicken Schlitz squad, migas single-origin single-origin
                        coffee chambray umami raclette.
                  </p>
                    </Grid>
                  </Grid>
                  <div className="footer-main-holder">
                    <Grid container item={true} xs={12} className="footer-main">
                      <Grid item xs={5} className="title border-bottom">
                        <StyledBox>
                          <NavLink to="/gallery">About</NavLink>
                        </StyledBox>
                      </Grid>
                      <Grid item xs={6} className="title border-bottom border-left">
                        <StyledBox>
                          <NavLink to="/help">Help</NavLink>
                        </StyledBox>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        className="border-bottom logo border-left copy"
                      >
                        <StyledBox>Logo</StyledBox>
                      </Grid>
                      <Grid item xs={5} className="border-bottom">
                        <StyledList className="links">
                          <ListItem>
                            <NavLink to="/ourstory">Our Story</NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink to="/ingredients">Ingredients</NavLink>
                          </ListItem>
                          <ListItem>
                            <ContactUsDialogDesktop />
                          </ListItem>
                        </StyledList>
                      </Grid>
                      <Grid item xs={6} className="border-left border-bottom">
                        <StyledList className="links">
                          <ListItem>
                            <NavLink to="/shipping">Shipping &amp; Returns</NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink to="/account">My Account</NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink to="/ordertracking">Track an Order</NavLink>
                          </ListItem>
                        </StyledList>
                      </Grid>
                      <Grid item xs={1} className="border-left copy">
                        <StyledBox>
                          <div className="rotate">Copyright 2019</div>
                        </StyledBox>
                      </Grid>
                      <Grid item xs={8} className="signup-box">
                        <span>Sign up for tips and new product launches.</span>
                        <Formik
                          initialValues={{ email: '' }}
                          onSubmit={() => null}
                          validationSchema={schema}
                          render={() => (
                            <Form>
                              <Field
                                name="email"
                                label=""
                                placeholder="Your Email"
                                component={InputField}
                              />
                              <Button type="submit">
                                <img
                                  src={arrowImage}
                                  className="signup-arrow"
                                  alt="arrow"
                                />
                              </Button>
                            </Form>
                          )}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Grid container className="h-100">
                          <Grid item xs={6} className="border-left icon">
                            <Link href="https://www.instagram.com/">
                              <img src={igIcon} alt="instagram" />
                            </Link>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            className="border-left icon border-right"
                          >
                            <Link href="https://www.facebook.com/">
                              <img src={fbIcon} alt="facebook" />
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container item={true} xs={12} className="legal">
                        <StyledLegalList>
                          <ListItem>Objective &bull; All rights reserved</ListItem>
                          <ListItem>
                            <NavLink to="/pricavypolicy">Privacy Policy</NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink to="/terms">Terms of use</NavLink>
                          </ListItem>
                        </StyledLegalList>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Container>
            </StyledBox>
          )
          : <CheckoutFooter />
        )
      }
    </>
  );
};
Footer.propTypes = {
  location: PropTypes.object.isRequired
};

const enhance = compose(
  withRouter
);

export default enhance(Footer);
