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
import { Divider, Container, Button } from '@material-ui/core';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';

import './Footer-style.scss';

import { InputField } from './form-fields';
import { NavLink } from './common';
import CheckoutFooter from './CheckoutFooter';
import LogoShort from './common/Icons/LogoShort/LogoShort';
import { requestSignupEmail } from '../modules/account/actions';
import { withCurrentUser } from '../hoc';
import segmentSiteLocation from '../utils/segmentSiteLocation';
import Arrow from '../../src/components/common/Icons/Arrow/Arrow.js';
const arrowImage = require('../../src/assets/images/arrow.png');
const igIcon = require('../../src/assets/images/instagram.png');
const fbIcon = require('../../src/assets/images/facebook.png');
const pinIcon = require('../../src/assets/images/pinterest.png');

const segmentTrackNavigationClick = e => {
  window.analytics.track('Navigation Clicked', {
    label: e.target.innerText ? e.target.innerText : '',
    site_location: segmentSiteLocation()
  });
};

const trackEmailSubmitFailure = (email, error_message) => {
  window.analytics.track('Email Capture Failed', {
    email,
    error_message,
    site_location: 'footer'
  });
};

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email(props => 'Input valid email address')
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
              <div className="footer-main-holder">
                <Grid container className="footer-main" xs={12}>
                  <Grid item xs className="row1 border-top border-bottom ">
                    <Grid item xs={3} className="row1 logo border-right">
                      <StyledBox>
                        <LogoShort />
                      </StyledBox>
                    </Grid>
                    <Grid className="row1 icon-container">
                      <div className="uppercase follow-text">Follow Us</div>
                      <Link
                        href="https://www.instagram.com/objective_wellness"
                        target="_blank"
                        rel="noopener"
                      >
                        <img src={igIcon} alt="instagram" />
                      </Link>
                      <Link
                        href="https://www.facebook.com/Objective_Wellness-114299813287253/"
                        target="_blank"
                        rel="noopener"
                      >
                        <img src={fbIcon} alt="facebook" />
                      </Link>
                      <Link
                        href="https://www.pinterest.com/objectivewellness"
                        target="_blank"
                        rel="noopener"
                      >
                        <img src={pinIcon} alt="pinterest" />
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    className="promise border-bottom"
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        gutterBottom
                        className="uppercase"
                      >
                        THE OBJECTIVE PROMISE
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <p>
                        Behind every Objective supplement are studies, endless
                        hours of research and a team with over 50 years of
                        combined experience formulating dietary supplements. And
                        the one thing we know for sure? Everybody's different.
                        Every body is different. It's possible that what works
                        wonders for your best friend might not do a thing for
                        you. So let us know and we'll refund your money. It's
                        that simple.
                      </p>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="border-bottom">
                    <Grid container spacing={0}>
                      <Grid item xs={12} className="title">
                        About
                      </Grid>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink
                            onClick={segmentTrackNavigationClick}
                            to="/about_us"
                          >
                            About Us
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink
                            onClick={segmentTrackNavigationClick}
                            to="/journal"
                          >
                            Journal
                          </NavLink>
                        </ListItem>
                      </StyledList>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} className="border-bottom">
                    <Grid container spacing={0}>
                      <Grid item xs={12} className="title">
                        HELP
                      </Grid>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink
                            onClick={segmentTrackNavigationClick}
                            to={gotoUrl('/account', '/login/account')}
                          >
                            My Account
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink
                            onClick={segmentTrackNavigationClick}
                            to="/faq"
                          >
                            Shipping &amp; Refunds
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink
                            onClick={segmentTrackNavigationClick}
                            to="/contact"
                          >
                            Contact Us
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink
                            onClick={segmentTrackNavigationClick}
                            to="/faq"
                          >
                            FAQs
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
                            letterSpacing: 'normal',
                            color: '#fff'
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
                            style={{ color: '#959595' }}
                          ></NavLink>{' '}
                          in seconds.
                        </Typography>
                      </>
                    ) : (
                      <>
                        <span>
                          Subscribe and never miss out on new products, special
                          offers, health tips, and more.
                        </span>
                        <Formik
                          initialValues={{ email: '' }}
                          onSubmit={handleSubmit}
                          validationSchema={schema}
                          render={({ errors }) => (
                            <Form style={{ height: 61, marginTop: 24 }}>
                              <Field
                                name="email"
                                label=""
                                placeholder="Your Email"
                                component={InputField}
                                InputProps={{
                                  style: {
                                    border: '#fff solid 1px',
                                    width: '100%',
                                    height: '100%'
                                  }
                                }}
                              />
                              <Button type="submit" className="signup-arrow">
                                <Grid>
                                  <Arrow />
                                  <Typography
                                    style={{
                                      fontFamily: 'P22-Underground',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      position: 'relative',
                                      bottom: 10,
                                      letterSpacing: 1
                                    }}
                                  >
                                    Submit
                                  </Typography>
                                </Grid>
                              </Button>
                            </Form>
                          )}
                        />
                      </>
                    )}
                  </Grid>
                  <Grid container item xs={12} className="legal border-bottom">
                    © Objective 2019
                    <Grid container xs={12} className="legal-text">
                      <NavLink
                        onClick={segmentTrackNavigationClick}
                        to="/privacy-policy"
                        style={{ paddingRight: 10, color: '#959595' }}
                      >
                        Privacy Policy
                      </NavLink>
                      <NavLink
                        onClick={segmentTrackNavigationClick}
                        to="/terms"
                        style={{ color: '#959595' }}
                      >
                        Terms of use
                      </NavLink>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="disclaimer-container">
                  <Typography className="disclaimer-text">
                    * Statements on this website have not been evaluated by the
                    Food and Drug Administration. Any products discussed or
                    advertised are not intended to diagnose, treat, cure or
                    prevent any disease. Testimonial results are not typical.
                    Customers may have received a gift certificate after
                    submitting their testimonial. If you are pregnant, nursing,
                    taking medication, or have a medical condition, consult your
                    physician before using any dietary supplement.
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
                    or call us at{' '}
                    <Link href="tel:800-270-5771">800-270-5771</Link> so that we
                    can provide you access through an alternative method.
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
              <div className="footer-main-holder">
                <Grid container item xs={12} className="footer-main">
                  <Grid
                    container
                    item
                    xs={12}
                    className=" row1 border-top border-bottom"
                  >
                    <Grid className="logo">
                      <StyledBox>
                        <LogoShort />
                      </StyledBox>
                    </Grid>
                    <Grid item xs={10} className="promise">
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          gutterBottom
                          className="uppercase"
                        >
                          THE OBJECTIVE PROMISE
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <p>
                          Behind every Objective supplement are studies, endless
                          hours of research and a team with over 50 years of
                          combined experience formulating dietary supplements.
                          And the one thing we know for sure? Everybody's
                          different. Every body is different. It's possible that
                          what works wonders for your best friend might not do a
                          thing for you. So let us know and we'll refund your
                          money. It's that simple.
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className="border-bottom"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '8px 0px 41px'
                      }}
                    >
                      <Grid item xs={2} style={{ marginRight: 60 }}>
                        <Grid className="title">About</Grid>
                        <StyledList className="links">
                          <ListItem>
                            <NavLink
                              onClick={segmentTrackNavigationClick}
                              to="/about_us"
                            >
                              About Us
                            </NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink
                              onClick={segmentTrackNavigationClick}
                              to="/journal"
                            >
                              Journal
                            </NavLink>
                          </ListItem>
                        </StyledList>
                      </Grid>
                      <Grid item xs={4} style={{ marginLeft: 59 }}>
                        <Grid className="title">Help</Grid>
                        <StyledList className="links">
                          <ListItem>
                            <NavLink
                              onClick={segmentTrackNavigationClick}
                              to={gotoUrl('/account', '/login/account')}
                            >
                              My Account
                            </NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink
                              onClick={segmentTrackNavigationClick}
                              to="/faq"
                            >
                              Shipping &amp; Refunds
                            </NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink
                              onClick={segmentTrackNavigationClick}
                              to="/contact"
                            >
                              Contact Us
                            </NavLink>
                          </ListItem>
                          <ListItem>
                            <NavLink
                              onClick={segmentTrackNavigationClick}
                              to="/faq"
                            >
                              FAQs
                            </NavLink>
                          </ListItem>
                        </StyledList>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} className=" border-left signup-box">
                      {confirmationVisibility ? (
                        <>
                          <Typography
                            style={{
                              fontFamily: 'P22-Underground',
                              fontSize: '24px',
                              lineHeight: 'normal',
                              letterSpacing: 'normal',
                              color: '#fff'
                            }}
                          >
                            Awesome! You're on the list!
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: 'FreightTextProBook',
                              fontSize: '17px',
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
                              style={{ color: '#959595' }}
                            ></NavLink>{' '}
                            in seconds.
                          </Typography>
                        </>
                      ) : (
                        <>
                          <span>
                            Subscribe and never miss out on new products,
                            special offers, health tips, and more.
                          </span>
                          <Formik
                            initialValues={{ email: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={schema}
                            render={() => (
                              <Form style={{ marginTop: 24, height: 61 }}>
                                <Field
                                  name="email"
                                  label=""
                                  placeholder="Your Email"
                                  component={InputField}
                                  InputProps={{
                                    style: {
                                      border: '#fff solid 1px',
                                      width: '100%',
                                      height: '100%'
                                    }
                                  }}
                                />
                                <Button type="submit" className="signup-arrow">
                                  <Grid>
                                    <Arrow />
                                    <Typography
                                      style={{
                                        fontFamily: 'P22-Underground',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        position: 'relative',
                                        bottom: 10,
                                        letterSpacing: 1.17
                                      }}
                                    >
                                      Submit
                                    </Typography>
                                  </Grid>
                                </Button>
                              </Form>
                            )}
                          />
                        </>
                      )}
                    </Grid>
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
                        <NavLink
                          onClick={segmentTrackNavigationClick}
                          to="/privacypolicy"
                        >
                          Privacy Policy
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink
                          onClick={segmentTrackNavigationClick}
                          to="/terms"
                        >
                          Terms of use
                        </NavLink>
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

const enhance = compose(withRouter, withCurrentUser);

export default enhance(Footer);
