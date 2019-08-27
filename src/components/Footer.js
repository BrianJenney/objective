import React from 'react';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, List, ListItem, Typography } from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, NavLink } from './common';
import { InputField } from './form-fields';
import './Footer-style.scss';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email address')
});

const StyledBox = withStyles(() => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
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
    fontFamily: 'p22-underground, Helvetica, sans',
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
            <Grid container className="promise" xs={12}>
              <Grid item xs={12}>
                Diamond Logo
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3" gutterBottom className="uppercase">
                  The True<br></br>Health Promise
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  TH Promse text goes here. Brunch church-key reclette
                  chartreuse poke, XOXO next level shaman hot chicken
                  sustainable vegan yr jianbing affogato. Hot chicken Schlitz
                  squad, migas single-origin single-origin coffee chambray umami
                  raclette.
                </Typography>
              </Grid>
            </Grid>
            <div className="footer-main-holder">
              <Grid container className="footer-main" xs={12}>
                <Grid item xs={6} className="border-bottom row1">
                  <StyledBox>TH Logo</StyledBox>
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
                  Sign up for tips and new prouct launches.<br></br>
                  <Formik
                    initialValues={{ email: '' }}
                    onSubmit={() => null}
                    validationSchema={schema}
                    render={() => (
                      <Form>
                        <Field name="email" label="" component={InputField} />
                        <Button type="submit" children="Sign Up" />
                      </Form>
                    )}
                  />
                </Grid>
                <Grid item xs={4} className="border-bottom p-20 text-center">
                  <NavLink href="http://www.instagram.com">IG Icon</NavLink>
                </Grid>
                <Grid
                  item
                  xs={4}
                  className="border-bottom p-20 text-center border-left"
                >
                  <NavLink href="http://www.twitter.com">TW Icon</NavLink>
                </Grid>
                <Grid
                  item
                  xs={4}
                  className="border-bottom p-20 text-center border-left"
                >
                  <NavLink href="https://www.facebook.com/truehealthsupplements">
                    FB Icon
                  </NavLink>
                </Grid>
                <Grid container xs={12} className="legal">
                  <StyledList>
                    <ListItem className="text-center">
                      TrueHealth &bull; All rights reserved
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
            <Grid container xs={12} className="promise">
              <Grid item xs={12}>
                <Typography variant="h3" gutterBottom className="uppercase">
                  The True Health Promise
                </Typography>
              </Grid>
              <Grid item xs={12}>
                Diamond Logo
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom className="uppercase">
                  Dek Line Goes Here
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  TH Promse text goes here. Brunch church-key reclette
                  chartreuse poke, XOXO next level shaman hot chicken
                  sustainable vegan yr jianbing affogato. Hot chicken Schlitz
                  squad, migas single-origin single-origin coffee chambray umami
                  raclette.
                </Typography>
              </Grid>
            </Grid>
            <div className="footer-main-holder">
              <Grid container xs={12} className="footer-main">
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
                <Grid item xs={8} className="border-bottom signup-box p-40">
                  Sign up for tips and new prouct launches.<br></br>
                  <Formik
                    initialValues={{ email: '' }}
                    onSubmit={() => null}
                    validationSchema={schema}
                    render={() => (
                      <Form>
                        <Field name="email" label="" component={InputField} />
                        <Button type="submit" children="Sign Up" />
                      </Form>
                    )}
                  />
                </Grid>
                <Grid item xs={1} className="border-left border-bottom p-40">
                  <NavLink href="">IG Icon</NavLink>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom p-40">
                  <NavLink href="">TW Icon</NavLink>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom p-40">
                  <NavLink href="https://www.facebook.com/truehealthsupplements">
                    FB Icon
                  </NavLink>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom">
                  &nbsp;
                </Grid>
                <Grid container xs={12} className="legal">
                  <StyledList>
                    <ListItem>TrueHealth &bull; All rights reserved</ListItem>
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
