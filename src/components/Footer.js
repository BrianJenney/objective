import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter, matchPath } from 'react-router-dom';
import { compose } from 'redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { StyledContainer } from '../assets/styles/StyledComponents';

import './Footer-style.scss';

import { InputField } from './form-fields';
import { NavLink } from './common';
import CheckoutFooter from './CheckoutFooter';
import Logo from '../assets/images/Bee.svg';
import { requestSignupEmail, requestCheckEmailExistence } from '../modules/account/actions';
import { withCurrentUser } from '../hoc';
import segmentSiteLocation from '../utils/segmentSiteLocation';
import Arrow from './common/Icons/Arrow/Arrow';

import igIcon from '../assets/images/instagram-icon.svg';
import fbIcon from '../assets/images/fb-icon.svg';
import twitterIcon from '../assets/images/twitter-icon.svg';
import pinterestIcon from '../assets/images/pinterest-icon.svg';
import ytIcon from '../assets/images/youtube-icon.svg';
import alertError from '../assets/images/alert_error.svg';

const segmentTrackNavigationClick = e => {
  window.analytics.track('Navigation Clicked', {
    label: e.target.innerText ? e.target.innerText : '',
    site_location: segmentSiteLocation()
  });
};

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Please enter a valid email address')
});

const StyledBox = withStyles(() => ({
  root: {
    fontWeight: 'normal',
    letterSpacing: '.54px',
    fontSize: '13px'
  }
}))(Box);

const StyledList = withStyles(() => ({
  root: {
    fontSize: '13px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.77',
    letterSpacing: '0.54px',
    color: '#938985'
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
      dispatch(requestCheckEmailExistence(email));
      dispatch(requestSignupEmail(email));
      setConfirmationVisibility(!confirmationVisibility);
    },
    [confirmationVisibility, setConfirmationVisibility]
  );

  const linkStyle = {
    fontFamily: 'proxima-nova',
    fontSize: '13px',
    fontWeight: 'normal',
    lineHeight: '1.77',
    letterSpacing: '0.54px',
    color: '#938985'
  };
  const customerCareLinks = [
    {
      text: 'Contact Us',
      link: gotoUrl('/account/orders', '/login/order')
    },
    {
      text: 'My Account',
      link: gotoUrl('/account/orders', '/login/order')
    },
    {
      text: 'F.A.Q.s',
      link: gotoUrl('/account/orders', '/login/order')
    },
    {
      text: 'Returns & Exchanges',
      link: gotoUrl('/account/orders', '/login/order')
    },
    {
      text: 'COA Lookup',
      link: gotoUrl('/account/orders', '/login/order')
    }
  ];

  const companyLinks = [
    {
      text: 'Our Story',
      link: gotoUrl('/account/orders', '/login/order')
    },
    {
      text: 'Patents',
      link: gotoUrl(' https://www.thecloroxcompany.com/brands/patents/')
    },
    {
      text: 'Website Accessibility',
      link: gotoUrl('/account/orders', '/login/order')
    }
  ];

  const socialMediaIcons = [
    {
      icon: igIcon,
      alt: 'instagram',
      href: 'https://www.instagram.com/burtsbees/'
    },
    {
      icon: fbIcon,
      alt: 'facebook',
      href: 'https://www.facebook.com/burtsbees/'
    },
    {
      icon: twitterIcon,
      alt: 'twitter',
      href: 'https://twitter.com/burtsbees/'
    },
    {
      icon: pinterestIcon,
      alt: 'pinterest',
      href: 'https://www.pinterest.com/burtsbees/'
    },
    {
      icon: ytIcon,
      alt: 'youtube',
      href: 'https://www.youtube.com/channel/UC5AngbC7w3patkjY8ma8zZA'
    }
  ];

  const footerLinks = [
    {
      text: 'Privacy Policy',
      link: 'https://www.thecloroxcompany.com/privacy/'
    },
    {
      text: 'Terms & Conditions',
      link: ''
    },
    {
      text: 'Cookie Settings',
      link: ''
    },
    {
      text: 'Site Map',
      link: ''
    },
    {
      text: 'Ad Choices',
      link: ''
    }
  ];

  const SIGN_UP_EMAIL_SUCCESS = `Awesome! You're on the list`;

  const BB_LEGAL_TEXT = [
    `Burt's Bees is committed to making its website accessible for all users, and will
    continue to take all steps necessary to ensure compliance with applicable laws. If you
    have difficulty accessing any content, feature or functionality on our website or on our
    other electronic platforms, please call us at 1-800-849-7112 and select option #2 so
    that we can provide you access through an alternative method.`,

    `This information is presented for educational purposes only and is
    of an editorial nature. The website has gathered the published information to provide an
    understanding of the potential uses and benefits of CBD. These statements have not been
    evaluated or approved by the Food and Drug Administration. This product is not intended
    to diagnose, treat, cure or prevent any disease. Products on this website are not for
    use by or sale to persons under the age of 21. Void where prohibited by law. We do not
    ship Burt’s Bees CBD products to AZ, IA, TK, TK, TK, TK, and TK at this time due to
    state-specific restrictions on CBD sales.`,

    `This product should be used only as directed on the label. It should not be used if you
    are pregnant or nursing. Consult with a physician before use if you have a serious
    medical condition or use prescription medications. A Doctor’s advice should be sought
    before using this and any supplemental dietary product. All trademarks and copyrights
    are property of their respective owners and are not affiliated with nor do they endorse
    this product. These statements have not been evaluated by the FDA. This product is not
    intended to diagnose, treat, cure or prevent any disease. Individual weight loss results
    will vary. By using this site, you agree to follow the Privacy Policy and all Terms &
    Conditions printed on this site. Void Where Prohibited by Law.`,

    `Burt's Bees is part of the CLX family of brands including Brita, NeoCell, Rainbow Light,
    Renew Life and Natural Vitality.`
  ];

  const renderFooter = () => (
    <StyledBox className="footer-container">
      <StyledContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <header>
              <img
                height="31"
                width="40"
                style={{ objectFit: 'contain' }}
                src={Logo}
                alt="BeeHive"
              />{' '}
              Join the Hive
            </header>
            <div className="stay-in-the-know">
              <p>
                Stay in the know about our latest products, new ingredients, special deals and more
              </p>
            </div>
            {confirmationVisibility ? (
              <p className="sign-up-confirmation">{SIGN_UP_EMAIL_SUCCESS}</p>
            ) : (
              <Formik
                initialValues={{ email: '' }}
                onSubmit={handleSubmit}
                validationSchema={schema}
                render={({ errors, touched }) => (
                  <>
                    <Form className="email-form" style={{ display: 'inline-flex', width: '282px' }}>
                      <Field
                        name="email"
                        label=""
                        placeholder="Your Email"
                        width="282px"
                        renderCustom
                        component={InputField}
                      />
                      <Button
                        style={{
                          background: '#553226',
                          color: 'white',
                          height: '46px',
                          width: '78px'
                        }}
                        type="submit"
                      >
                        <Arrow />
                      </Button>
                    </Form>
                    {errors.email && !!touched.email && (
                      <div className="email-error">
                        <p style={{ color: '#ce0e2d' }}>{errors.email}</p>
                        <img src={alertError} alt="email error" />
                      </div>
                    )}
                  </>
                )}
              />
            )}
          </Grid>

          <Grid item md={2} xs={6}>
            <header>Customer Care</header>
            <StyledList>
              {customerCareLinks.map(({ text, link }) => (
                <ListItem disableGutters style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <NavLink onClick={segmentTrackNavigationClick} style={linkStyle} to={link}>
                    {text}
                  </NavLink>
                </ListItem>
              ))}
            </StyledList>
          </Grid>
          <Grid item md={2} xs={6}>
            <header>Company</header>
            <StyledList>
              {companyLinks.map(({ text, link }) => (
                <ListItem disableGutters style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <NavLink onClick={segmentTrackNavigationClick} style={linkStyle} to={link}>
                    {text}
                  </NavLink>
                </ListItem>
              ))}
            </StyledList>
          </Grid>
          <Grid item md={2} xs={12}>
            <header>Connect With Us</header>
            <p>#Burts Bees</p>

            <div className="social-media">
              {socialMediaIcons.map(({ icon, href, alt }) => (
                <Link href={href} target="_blank" rel="noopener">
                  <img src={icon} alt={alt} />
                </Link>
              ))}
            </div>
          </Grid>
        </Grid>

        <Grid xs={12} className="disclaimer-container">
          <p>{BB_LEGAL_TEXT[0]}</p>
          <p>
            <b>*Disclaimer:{BB_LEGAL_TEXT[1]}</b> 
          </p>
          <p>{BB_LEGAL_TEXT[2]}</p>
          <p>{BB_LEGAL_TEXT[3]}</p>
        </Grid>
      </StyledContainer>
      <Grid
        container
        item
        xs={12}
        direction="column"
        alignItems="center"
        className="legal border-bottom"
      >
        <Grid container direction="row" className={`legal-text${sm ? '-mobile' : ''}`}>
          <p>© 2020 Burt’s Bees, Inc. All Rights Reserved.</p>

          <div className={`legal-links${sm ? '-mobile' : ''}`}>
            {footerLinks.map(({ text, href }) => (
              <NavLink
                style={{ color: '#52433e' }}
                onClick={segmentTrackNavigationClick}
                to={href}
                target="_blank"
              >
                {text}
              </NavLink>
            ))}
          </div>
        </Grid>
      </Grid>
    </StyledBox>
  );
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

export default compose(withRouter, withCurrentUser)(Footer);
