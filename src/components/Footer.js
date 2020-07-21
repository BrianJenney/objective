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
import { Container, Button } from '@material-ui/core';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { StyledContainer } from '../assets/styles/StyledComponents';

import './Footer-style.scss';

import { InputField } from './form-fields';
import { NavLink } from './common';
import CheckoutFooter from './CheckoutFooter';
import LogoShort from './common/Icons/LogoShort/LogoShort';
import { requestSignupEmail } from '../modules/account/actions';
import { withCurrentUser } from '../hoc';
import segmentSiteLocation from '../utils/segmentSiteLocation';
import Arrow from './common/Icons/Arrow/Arrow';

const igIcon = require('../../src/assets/images/instagram.png');
const fbIcon = require('../../src/assets/images/facebook.png');
const pinIcon = require('../../src/assets/images/pinterest.png');

const segmentTrackNavigationClick = e => {
  window.analytics.track('Navigation Clicked', {
    label: e.target.innerText ? e.target.innerText : '',
    site_location: segmentSiteLocation()
  });
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

const Footer = ({ location, currentUser }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
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

  const renderFooter = () => {
    if (sm) {
      return (
        <StyledBox className="footer-container">
          <Container>
            <div className="footer-main-holder">
              <Grid container className="footer-main" xs={12}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="border-top border-bottom"
                >
                  <Grid item xs={3} sm={2} className="border-right">
                    <Box className=" row1 logo">
                      <LogoShort />
                    </Box>
                  </Grid>
                  <Grid
                    container
                    xs={9}
                    spacing={2}
                    alignItems="center"
                    style={{ paddingLeft: 10 }}
                  >
                    <Grid item className="uppercase follow-text">
                      Follow Us
                    </Grid>
                    <Grid
                      container
                      item
                      xs={6}
                      sm={4}
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
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
                </Grid>
                <Grid container item xs={12} className="promise border-bottom">
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom className="uppercase">
                      THE OBJECTIVE PROMISE
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      Behind every Objective supplement are studies, endless hours of research and a
                      team with over 50 years of combined experience formulating dietary
                      supplements. And the one thing we know for sure? Everybody&#39;s different.
                      Every body is different. It&#39;s possible that what works wonders for your
                      best friend might not do a thing for you. So let us know and we&#39;ll refund
                      your money. It&#39;s that simple.
                    </p>
                  </Grid>
                </Grid>
                <Grid container direction="row" className="border-bottom">
                  <Grid item>
                    <div className="title">About</div>
                    <StyledList className="links">
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/about_us">
                          About Us
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/journal">
                          Journal
                        </NavLink>
                      </ListItem>
                    </StyledList>
                  </Grid>
                  <Grid item xs={3} sm={2}></Grid>
                  <Grid item>
                    <div className="title">HELP</div>
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
                          to={gotoUrl('/account/orders', '/login/order')}
                          onClick={segmentTrackNavigationClick}
                        >
                          Track an Order
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/faq">
                          Shipping &amp; Refunds
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/contact">
                          Contact Us
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink onClick={segmentTrackNavigationClick} to="/faq">
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
                        Awesome! You&#39;re on the list!
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: 'FreightTextProBook',
                          fontSize: '16px',
                          opacity: '0.75',
                          letterSpacing: 'normal',
                          color: '#fff'
                        }}
                      >
                        Be a step ahead and{' '}
                        <NavLink
                          to="/signup"
                          underline="always"
                          children="create an account"
                          onClick={segmentTrackNavigationClick}
                          style={{ color: '#fff' }}
                        ></NavLink>{' '}
                        in seconds.
                      </Typography>
                    </>
                  ) : (
                    <Grid xs={12} sm={7} item>
                      <span>
                        Subscribe and never miss out on new products, special offers, health tips,
                        and more.
                      </span>
                      <Formik
                        initialValues={{ email: '' }}
                        onSubmit={handleSubmit}
                        validationSchema={schema}
                        render={() => (
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
                            <Button type="submit">
                              <Grid container alignItems="center" justify="center">
                                <Box pt={1}>
                                  <Arrow />
                                  <div
                                    style={{
                                      fontFamily: 'P22-Underground',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      position: 'relative',
                                      bottom: 4,
                                      letterSpacing: 1
                                    }}
                                  >
                                    Submit
                                  </div>
                                </Box>
                              </Grid>
                            </Button>
                          </Form>
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  className="legal border-bottom"
                >
                  <div>&#169; Objective 2020</div>
                  <Grid container direction="row" justify="center" className="legal-text">
                    <a
                      onClick={segmentTrackNavigationClick}
                      href="/privacypolicy"
                      target="_blank"
                      style={{ paddingRight: 10 }}
                    >
                      Privacy Policy
                    </a>
                    <NavLink onClick={segmentTrackNavigationClick} to="/terms" target="_blank">
                      Terms of use
                    </NavLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="disclaimer-container">
                <Typography className="disclaimer-text">
                  * Statements on this website have not been evaluated by the Food and Drug
                  Administration. Any products discussed or advertised are not intended to diagnose,
                  treat, cure or prevent any disease. Testimonial results are not typical. Customers
                  may have received a gift certificate after submitting their testimonial. If you
                  are pregnant, nursing, taking medication, or have a medical condition, consult
                  your physician before using any dietary supplement.
                </Typography>
                <Typography className="disclaimer-text">
                  Objective is committed to making its website accessible for all users, and will
                  continue to take all steps necessary to ensure compliance with applicable laws.
                </Typography>
                <Typography className="disclaimer-text">
                  If you have difficulty accessing any content, feature or functionality on our
                  website or on our other electronic platforms, please email us at{' '}
                  <Link
                    style={{
                      borderBottom: '1px solid #959595',
                      textDecoration: 'none',
                      color: '#959595'
                    }}
                    href="mailto:Help@objectivewellness.com"
                  >
                    Help@objectivewellness.com
                  </Link>{' '}
                  or call us at{' '}
                  <Link href="tel:800-270-5771" style={{ color: '#959595' }}>
                    800-270-5771
                  </Link>{' '}
                  so that we can provide you access through an alternative method.
                </Typography>
                <Typography
                  className="disclaimer-text"
                  style={{ textAlign: 'center', marginBottom: 0 }}
                >
                  1301 Sawgrass Corporate Parkway, Sunrise, FL 33323
                </Typography>
              </Grid>
              <div className="ccpa-footer">
                <a href="https://thecloroxcompany.com/brands" target="_blank" rel="external">
                  <img
                    src="https://www.glad.com/wp-content/themes/electro/img/clx-footer-logo.svg"
                    alt="CLX"
                  />
                  <span>Member of the CLX family of brands</span>
                </a>
              </div>
            </div>
          </Container>
        </StyledBox>
      );
    }
    return (
      <StyledBox className="footer-container">
        <StyledContainer>
          <Grid container spacing={0}>
            <Grid item xs={12} className="footer-main-holder">
              <Grid container item xs={12} className="footer-main">
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="border-top border-bottom"
                >
                  <Grid item xs={2}>
                    <Box className="logo">
                      <LogoShort />
                    </Box>
                  </Grid>
                  <Grid item xs={9} className="promise border-left">
                    <Grid item>
                      <Typography variant="h4" gutterBottom className="uppercase">
                        THE OBJECTIVE PROMISE
                      </Typography>
                    </Grid>
                    <Grid item>
                      <p>
                        Behind every Objective supplement are studies, endless hours of research and
                        a team with over 50 years of combined experience formulating dietary
                        supplements. And the one thing we know for sure? Everybody&#39;s different.
                        Every body is different. It&#39;s possible that what works wonders for your
                        best friend might not do a thing for you. So let us know and we&#39;ll
                        refund your money. It&#39;s that simple.
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container direction="row" className="border-bottom">
                  <Grid
                    container
                    sm={5}
                    direction="row"
                    className="border-right"
                    style={{ padding: '30px 0px' }}
                  >
                    <Grid item>
                      <div className="title">About</div>
                      <StyledList className="links">
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/about_us">
                            About Us
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/journal">
                            Journal
                          </NavLink>
                        </ListItem>
                      </StyledList>
                    </Grid>
                    <Grid item sm={3}></Grid>
                    <Grid item>
                      <div className="title">Help</div>
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
                            to={gotoUrl('/account/orders', '/order-tracker')}
                            onClick={segmentTrackNavigationClick}
                          >
                            Track an Order
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/faq">
                            Shipping &amp; Refunds
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/contact">
                            Contact Us
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink onClick={segmentTrackNavigationClick} to="/faq">
                            FAQs
                          </NavLink>
                        </ListItem>
                      </StyledList>
                    </Grid>
                  </Grid>

                  <Grid item sm={7} spacing={3} className="signup-box">
                    {confirmationVisibility ? (
                      <Grid item sm={9}>
                        <Typography
                          style={{
                            fontFamily: 'P22-Underground',
                            fontSize: '24px',
                            lineHeight: 'normal',
                            letterSpacing: 'normal',
                            color: '#fff'
                          }}
                        >
                          Awesome! You&#39;re on the list!
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
                      </Grid>
                    ) : (
                      <Grid item sm={9} lg={11}>
                        <Grid item sm={9}>
                          Subscribe and never miss out on new products, special offers, health tips,
                          and more.
                        </Grid>

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
                              <Button type="submit">
                                <Grid container alignItems="center" justify="center">
                                  <Box pt={1}>
                                    <Arrow />
                                    <div
                                      style={{
                                        fontFamily: 'P22-Underground',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        position: 'relative',
                                        bottom: 4,
                                        letterSpacing: 1.17
                                      }}
                                    >
                                      Submit
                                    </div>
                                  </Box>
                                </Grid>
                              </Button>
                            </Form>
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" className="border-bottom">
                  <Grid
                    container
                    sm={4}
                    spacing={3}
                    alignItems="center"
                    style={{ padding: '10px 0px' }}
                  >
                    <Grid item className="uppercase follow-text">
                      Follow Us
                    </Grid>
                    <Grid
                      container
                      item
                      sm={5}
                      spacing={3}
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
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
                    sm={7}
                    justify="space-evenly"
                    className="legal legal-text border-left"
                  >
                    <div>&#169; Objective 2020 </div>
                    <div>&bull;</div>

                    <a onClick={segmentTrackNavigationClick} href="/privacypolicy" target="_blank">
                      Privacy Policy
                    </a>
                    <NavLink onClick={segmentTrackNavigationClick} to="/terms" target="_blank">
                      Terms of use
                    </NavLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="disclaimer-container">
                <Typography className="disclaimer-text">
                  * Statements on this website have not been evaluated by the Food and Drug
                  Administration. Any products discussed or advertised are not intended to diagnose,
                  treat, cure or prevent any disease. Testimonial results are not typical. Customers
                  may have received a gift certificate after submitting their testimonial. If you
                  are pregnant, nursing, taking medication, or have a medical condition, consult
                  your physician before using any dietary supplement.
                </Typography>
                <Typography className="disclaimer-text">
                  Objective is committed to making its website accessible for all users, and will
                  continue to take all steps necessary to ensure compliance with applicable laws.
                </Typography>
                <Typography className="disclaimer-text">
                  If you have difficulty accessing any content, feature or functionality on our
                  website or on our other electronic platforms, please email us at{' '}
                  <Link
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #959595',
                      textDecoration: 'none',
                      color: '#959595'
                    }}
                    href="mailto:help@objectivewellness.com"
                  >
                    Help@objectivewellness.com
                  </Link>{' '}
                  or call us at 800-270-5771 so that we can provide you access through an
                  alternative method.
                </Typography>
                <Typography className="disclaimer-text" style={{ textAlign: 'center' }}>
                  1301 Sawgrass Corporate Parkway, Sunrise, FL 33323
                </Typography>
              </Grid>
              <div className="ccpa-footer">
                <a href="https://thecloroxcompany.com/brands" target="_blank" rel="external">
                  <img
                    src="https://www.glad.com/wp-content/themes/electro/img/clx-footer-logo.svg"
                    alt="CLX"
                  />
                  <span>Member of the CLX family of brands</span>
                </a>
              </div>
            </Grid>
          </Grid>
        </StyledContainer>
      </StyledBox>
    );
  };

  const renderFooterContainer = () => {
    if (isCheckoutPage || isOrderPage) {
      return <CheckoutFooter />;
    }
    return renderFooter();
  };

  return <div className="Footer">{renderFooterContainer()}</div>;
};

Footer.propTypes = {
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

const enhance = compose(withRouter, withCurrentUser);

export default enhance(Footer);
