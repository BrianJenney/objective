import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter, matchPath } from 'react-router-dom';
import { compose } from 'redux';

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
import CheckoutFooter from './CheckoutFooter';
import ContactMail from './common/Icons/ContactMail/ContactMail';
import ContactPhone from './common/Icons/ContactPhone/ContactPhone';
import LogoShort from './common/Icons/LogoShort/LogoShort';
import { requestSignupEmail } from '../modules/account/actions';
import { withCurrentUser } from '../hoc';
import segmentSiteLocation from '../utils/segmentSiteLocation';
const arrowImage = require('../../src/assets/images/arrow.png');
const igIcon = require('../../src/assets/images/instagram.png');
const fbIcon = require('../../src/assets/images/facebook.png');

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

const segmentTrackNavigationClick = e => {
  window.analytics.track('Navigation Clicked', {
    label: e.target.innerText ? e.target.innerText : '',
    site_location: segmentSiteLocation()
  });
};

const trackEmailSubmitFailure = (email, error_message) => {
  window.analytics.track('Email Capture Failed', {
    email: email,
    error_message: error_message,
    site_location: 'footer'
  });
};

const NeedHelpDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem style={{ padding: '0px' }}>
        <NavLink onClick={handleClickOpen} style={{ textDecoration: 'none' }}>
          HELP
        </NavLink>
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
                    <Link
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #000',
                        paddingBottom: '1px',
                        textDecoration: 'none'
                      }}
                      href="mailto:Help@objectivewellness.com"
                    >
                      help@objectivewellness.com
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

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email(props => {
      return 'Input valid email address';
    })
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

const Footer = ({ location, currentUser }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const isCheckoutPage = matchPath(location.pathname, { path: '/checkout' });
  const isOrderPage = matchPath(location.pathname, { path: '/order' });

  const [confirmationVisibility, setConfirmationVisibility] = useState(false);
  const gotoUrl = (url, login) => (currentUser.data.account_jwt ? url : login);
  const handleSubmit = useCallback(
    ({ email }) => {
      console.log('SUBMIT SUCCEED!!!', email);
      window.analytics.track('Email Capture Completed', {
        email,
        site_location: 'footer'
      });

      window.analytics.track('Email Capture Successful', {
        email,
        site_location: 'footer'
      });

      window.analytics.track('Subscribed', {
        email,
        site_location: 'footer'
      });

      window.analytics.track('Subscribed Listrak Auto', {
        email,
        site_location: 'footer'
      });

      window.analytics.identify({
        email
      });
      dispatch(requestSignupEmail(email));
      setConfirmationVisibility(!confirmationVisibility);
    },
    [confirmationVisibility, setConfirmationVisibility]
  );

  return (
    <>
      {xs && !isCheckoutPage && !isOrderPage ? (
        <StyledBox className="footer-container">
          <Container>
            <Grid container spacing={0}>
              <Grid container item xs={12} className="promise">
                <Grid item xs={12}>
                  <div className="diamond-outer">
                    <div className="diamond">
                      <LogoShort />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom className="uppercase">
                    THE OBJECTIVE PROMISE
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    Behind every Objective supplement are studies, endless hours
                    of research and a team with over 50 years of combined
                    experience formulating dietary supplements. And the one
                    thing we know for sure? Everybody's different. Every body is
                    different. It's possible that what works wonders for your
                    best friend might not do a thing for you. So let us know and
                    we'll refund your money. It's that simple.
                  </p>
                </Grid>
              </Grid>
              <div className="footer-main-holder">
                <Grid container className="footer-main" xs={12}>
                  <Grid item xs={6} className="border-bottom row1 logo">
                    <StyledBox>
                      <LogoShort />
                    </StyledBox>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    className="border-bottom border-left row1 copy-mobile"
                  >
                    <StyledBox>
                      <div className="rotate">Copyright 2019</div>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={6} className="row2 border-bottom">
                    <Grid container spacing={0}>
                      <Grid item xs={12} className="title">
                        <NavLink onClick={segmentTrackNavigationClick} to="/about_us">About</NavLink>
                      </Grid>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/contact">Contact Us</NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/faq">FAQs</NavLink>
                        </ListItem>
                      </StyledList>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="row2 border-bottom border-left">
                    <Grid container spacing={0}>
                      <Grid item xs={12} className="title">
                        <NavLink onClick={segmentTrackNavigationClick} to="/faq">HELP</NavLink>
                      </Grid>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to={gotoUrl('/account', '/login/account')}>
                            My Account
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/faq">Shipping &amp; Returns</NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink
                            to={gotoUrl('/account/orders', '/login/order')}
                            onClick={segmentTrackNavigationClick}
                          >
                            Track an Order
                          </NavLink>
                        </ListItem>
                      </StyledList>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="border-bottom signup-box p-20">
                    {confirmationVisibility ? (
                      <>
                        <Typography
                          style={{
                            fontFamily: 'P22-Underground',
                            fontSize: '22px',
                            lineHeight: 'normal',
                            letterSpacing: 'normal'
                          }}
                        >
                          Awesome! You're on the list!
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: 'FreightTextProBook',
                            fontSize: '16px',
                            opacity: '0.75',
                            letterSpacing: 'normal'
                          }}
                        >
                          Be a step ahead and{' '}
                          <NavLink
                            to="/signup"
                            underline="always"
                            children="create an account"
                            onClick={segmentTrackNavigationClick}
                          ></NavLink>{' '}
                          in seconds.
                        </Typography>
                      </>
                    ) : (
                      <>
                        <span>Sign up for tips and new product launches.</span>
                        <Formik
                          initialValues={{ email: '' }}
                          onSubmit={handleSubmit}
                          validationSchema={schema}
                          render={({ errors }) => (
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
                      </>
                    )}
                  </Grid>
                  <Grid item xs={6} className="border-bottom icon">
                    <Link
                      href="https://www.instagram.com/objective_wellness"
                      target="_blank"
                      rel="noopener"
                    >
                      <img src={igIcon} alt="instagram" />
                    </Link>
                  </Grid>
                  <Grid item xs={6} className="border-bottom border-left icon">
                    <Link
                      href="https://www.facebook.com/Objective_Wellness-114299813287253/"
                      target="_blank"
                      rel="noopener"
                    >
                      <img src={fbIcon} alt="facebook" />
                    </Link>
                  </Grid>
                  <Grid container item xs={12} className="legal">
                    <StyledList>
                      <ListItem className="text-center">
                        Objective &bull; All rights reserved
                      </ListItem>
                    </StyledList>
                  </Grid>
                  <Grid container xs={12} className="legal">
                    <StyledList>
                      <ListItem className="text-center">
                        <NavLink onClick={segmentTrackNavigationClick} to="/privacy-policy">Privacy Policy</NavLink>
                      </ListItem>
                      <ListItem className="text-center">
                        <NavLink onClick={segmentTrackNavigationClick} to="/terms">Terms of use</NavLink>
                      </ListItem>
                    </StyledList>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="disclaimer-container">
                  <Typography className="disclaimer-text">
                    * Statements on this website have not been evaluated by the
                    Food and Drug Administration. Any products discussed or
                    advertised are not intended to diagnose, treat, cure or
                    prevent any disease. Testimonial results are not typical.
                  </Typography>
                  <Typography className="disclaimer-text">
                    Objective is committed to making its website accessible for
                    all users, and will continue to take all steps necessary to
                    ensure compliance with applicable laws.
                  </Typography>
                  <Typography
                    className="disclaimer-text"
                    style={{ marginBottom: 0 }}
                  >
                    If you have difficulty accessing any content, feature or
                    functionality on our website or on our other electronic
                    platforms, please email us at{' '}
                    <Link
                      style={{
                        borderBottom: '1px solid #fff',
                        textDecoration: 'none'
                      }}
                      href="mailto:Help@objectivewellness.com"
                    >
                      Help@objectivewellness.com
                    </Link>{' '}
                    or call us at 800-270-5771 so that we can provide you access
                    through an alternative method.
                  </Typography>
                </Grid>
              </div>
            </Grid>
          </Container>
        </StyledBox>
      ) : !isCheckoutPage && !isOrderPage ? (
        <StyledBox className="footer-container">
          <Container>
            <Grid container spacing={0}>
              <Grid container item xs={12} className="promise">
                <Grid item xs={12}>
                  <div className="diamond-outer">
                    <div className="diamond">
                      <LogoShort />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom className="uppercase">
                    THE OBJECTIVE PROMISE
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <p>
                    Behind every Objective supplement are studies, endless hours
                    of research and a team with over 50 years of combined
                    experience formulating dietary supplements. And the one
                    thing we know for sure? Everybody's different. Every body is
                    different. It's possible that what works wonders for your
                    best friend might not do a thing for you. So let us know and
                    we'll refund your money. It's that simple.
                  </p>
                </Grid>
              </Grid>
              <div className="footer-main-holder">
                <Grid container item xs={12} className="footer-main">
                  <Grid item xs={5} className="title border-bottom">
                    <StyledBox>
                      <NavLink onClick={segmentTrackNavigationClick} to="/about_us">About</NavLink>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={6} className="title border-bottom border-left">
                    <StyledBox>
                      <NavLink onClick={segmentTrackNavigationClick} to="/faq">HELP</NavLink>
                    </StyledBox>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    className="border-bottom logo border-left copy"
                  >
                    <StyledBox>
                      <LogoShort />
                    </StyledBox>
                  </Grid>
                  <Grid item xs={5} className="border-bottom">
                    <StyledList className="links">
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/contact">Contact Us</NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/faq">FAQs</NavLink>
                      </ListItem>
                    </StyledList>
                  </Grid>
                  <Grid item xs={6} className="border-left border-bottom">
                    <StyledList className="links">
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to={gotoUrl('/account', '/login/account')}>
                          My Account
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/faq">Shipping &amp; Returns</NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink
                          to={gotoUrl('/account/orders', '/login/order')}
                          onClick={segmentTrackNavigationClick}
                        >
                          Track an Order
                        </NavLink>
                      </ListItem>
                    </StyledList>
                  </Grid>
                  <Grid item xs={1} className="border-left copy">
                    <StyledBox>
                      <div className="rotate">Copyright 2019</div>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={5} className="signup-box">
                    {confirmationVisibility ? (
                      <>
                        <Typography
                          style={{
                            fontFamily: 'P22-Underground',
                            fontSize: '24px',
                            lineHeight: 'normal',
                            letterSpacing: 'normal'
                          }}
                        >
                          Awesome! You're on the list!
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: 'FreightTextProBook',
                            fontSize: '16px',
                            opacity: '0.5',
                            letterSpacing: 'normal'
                          }}
                        >
                          Be a step ahead and{' '}
                          <NavLink
                            to="/signup"
                            underline="always"
                            children="create an account"
                            onClick={segmentTrackNavigationClick}
                          ></NavLink>{' '}
                          in seconds.
                        </Typography>
                      </>
                    ) : (
                      <>
                        <span>Sign up for tips and new product launches.</span>
                        <Formik
                          initialValues={{ email: '' }}
                          onSubmit={handleSubmit}
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
                      </>
                    )}
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={3}>
                    <Grid container className="h-100">
                      <Grid item xs={6} className="border-left icon">
                        <Link
                          href="https://www.instagram.com/objective_wellness"
                          target="_blank"
                          rel="noopener"
                        >
                          <img src={igIcon} alt="instagram" />
                        </Link>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className="border-left icon border-right"
                      >
                        <Link
                          href="https://www.facebook.com/Objective_Wellness-114299813287253/"
                          target="_blank"
                          rel="noopener"
                        >
                          <img src={fbIcon} alt="facebook" />
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} className="legal">
                    <StyledLegalList>
                      <ListItem>Objective &bull; All rights reserved</ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/privacypolicy">Privacy Policy</NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/terms">Terms of use</NavLink>
                      </ListItem>
                    </StyledLegalList>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="disclaimer-container">
                  <Typography className="disclaimer-text">
                    * Statements on this website have not been evaluated by the
                    Food and Drug Administration. Any products discussed or
                    advertised are not intended to diagnose, treat, cure or
                    prevent any disease. Testimonial results are not typical.
                  </Typography>
                  <Typography className="disclaimer-text">
                    Objective is committed to making its website accessible for
                    all users, and will continue to take all steps necessary to
                    ensure compliance with applicable laws.
                  </Typography>
                  <Typography
                    className="disclaimer-text"
                    style={{ marginBottom: 0 }}
                  >
                    If you have difficulty accessing any content, feature or
                    functionality on our website or on our other electronic
                    platforms, please email us at{' '}
                    <Link
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #fff',
                        textDecoration: 'none'
                      }}
                      href="mailto:help@objectivewellness.com"
                    >
                      Help@objectivewellness.com
                    </Link>{' '}
                    or call us at 800-270-5771 so that we can provide you access
                    through an alternative method.
                  </Typography>
                </Grid>
              </div>
            </Grid>
          </Container>
        </StyledBox>
      ) : (
        <CheckoutFooter />
      )}
    </>
  );
};

Footer.propTypes = {
  location: PropTypes.object.isRequired
};

const enhance = compose(
  withRouter,
  withCurrentUser
);

export default enhance(Footer);
