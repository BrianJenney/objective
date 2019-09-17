import React from 'react';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, NavLink } from './common';
import { InputField } from './form-fields';
import './Footer-style.scss';

const arrowImage = require('../../src/assets/images/arrow.png');
const igIcon = require('../../src/assets/images/instagram.png');
const fbIcon = require('../../src/assets/images/facebook.png');

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
    letterSpacing: '1px'
    // fontSize: '12px',
    // lineHeight: '44px'
  }
}))(Box);

const StyledList = withStyles(() => ({
  root: {
    fontFamily: 'p22-underground, sans-serif',
    fontWeight: 'normal',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1px'
    // fontSize: '12px',
    // lineHeight: '44px'
  }
}))(List);

const Footer = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {xs ? (
        <StyledBox className="footer-container">
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
                  shaman hot chicken sustainable vegan yr jianbing affogato. Hot
                  chicken Schlitz squad, migas single-origin single-origin
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
                        <NavLink to="/contact">Contact Us</NavLink>
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
                      Objective Wellness &bull; All rights reserved
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
        </StyledBox>
      ) : (
        <StyledBox className="footer-container">
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
                  shaman hot chicken sustainable vegan yr jianbing affogato. Hot
                  chicken Schlitz squad, migas single-origin single-origin
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
                  className="title border-bottom logo border-left"
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
                      <NavLink to="/contact">Contact Us</NavLink>
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
                <Grid item xs={1} className="border-left border-bottom">
                  <StyledBox>
                    <div className="rotate">Copyright 2019</div>
                  </StyledBox>
                </Grid>
                <Grid item xs={10} className="border-bottom signup-box">
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
                <Grid item xs={1} className="border-left border-bottom icon">
                  <NavLink href="">
                    <img src={igIcon} alt="instagram" />
                  </NavLink>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom icon">
                  <NavLink href="https://www.facebook.com/">
                    <img src={fbIcon} alt="facebook" />
                  </NavLink>
                </Grid>
                <Grid container item={true} xs={12} className="legal">
                  <StyledList>
                    <ListItem>
                      Objective Wellness &bull; All rights reserved
                    </ListItem>
                    <ListItem>
                      <NavLink to="/pricavypolicy">Privacy Policy</NavLink>
                    </ListItem>
                    <ListItem>
                      <NavLink to="/terms">Terms of use</NavLink>
                    </ListItem>
                  </StyledList>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </StyledBox>
      )}
    </>
  );
};

export default Footer;
