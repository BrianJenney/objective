import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EmailAddressInput from './EmailAddressInput';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const black = '#000000';
const offWhite = '#fcf8f4';

const useStyles = makeStyles(theme => ({
  aboutLink: {
    background: black,
    color: offWhite,
    paddingTop: 10,
    textTransform: 'none'
  },
  container: {
    background: black,
    padding: 10
  },
  footerBoxTop: {
    background: black,
    border: '1px solid ' + offWhite,
    color: offWhite,
    height: 80,
    paddingTop: 55,
    textTransform: 'uppercase'
  },
  emailBox: {
    background: black,
    border: '1px solid ' + offWhite,
    color: offWhite,
    height: 70
  },
  footerBoxMid: {
    background: black,
    border: '1px solid ' + offWhite,
    color: offWhite,
    height: 150,
    paddingTop: 25,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },
  socialBox: {
    background: black,
    border: '1px solid ' + offWhite,
    color: offWhite,
    height: 70,
    paddingTop: 30
  },
  legalBox: {
    background: black,
    color: offWhite,
    height: 30,
    paddingTop: 7,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
}));

const Footer = () => {
  const classes = useStyles();

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {xs ? (
        <Box className={classes.container}>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Box fontSize={11} className={classes.footerBoxTop}>
                TH Logo
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box fontSize={11} className={classes.footerBoxTop}>
                Copyright 2019
              </Box>
            </Grid>

            <Grid item xs={6} className={classes.footerBoxMid}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  About
                </Grid>
                <Grid item xs={12} className={classes.aboutLink}>
                  <Box fontSize={11} className={classes.aboutLink}>
                    <Link
                      color={offWhite}
                      component={RouterLink}
                      to="/ourstory"
                    >
                      Our Story
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box fontSize={11} className={classes.aboutLink}>
                    <Link
                      color={offWhite}
                      component={RouterLink}
                      to="/ingredients"
                    >
                      Ingredients
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box fontSize={11} className={classes.aboutLink}>
                    <Link color={offWhite} component={RouterLink} to="/journal">
                      Read Our Journal
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.footerBoxMid}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  Shop
                </Grid>
                <Grid item xs={12}>
                  <Box fontSize={11} className={classes.aboutLink}>
                    <Link color={offWhite} component={RouterLink} to="/faqs">
                      FAQs
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box fontSize={11} className={classes.aboutLink}>
                    <Link
                      color={offWhite}
                      component={RouterLink}
                      to="/ordertracking"
                    >
                      Account &amp; Orders
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box fontSize={11} className={classes.aboutLink}>
                    <Link color={offWhite} component={RouterLink} to="/contact">
                      Contact Us
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.emailBox}>
              <EmailAddressInput />
            </Grid>

            <Grid item xs={4} className={classes.socialBox}>
              <Link color={offWhite} href="">
                IG Icon
              </Link>
            </Grid>
            <Grid item xs={4} className={classes.socialBox}>
              <Link color={offWhite} href="">
                TW Icon
              </Link>
            </Grid>
            <Grid item xs={4} className={classes.socialBox}>
              <Link
                color={offWhite}
                href="https://www.facebook.com/truehealthsupplements"
              >
                FB Icon
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Box fontSize={9} className={classes.legalBox}>
                TrueHealth - All rights reserved
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box fontSize={9} className={classes.legalBox}>
                <Link color={offWhite} to="/pricavypolicy">
                  Privacy Policy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box fontSize={9} className={classes.legalBox}>
                <Link color={offWhite} to="/terms">
                  Terms of use
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={classes.container}>
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <Box className={classes.footerBoxTop}>
                <Link color={offWhite} component={RouterLink} to="/gallery">
                  Shop
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box fontSize={11} className={classes.footerBoxTop}>
                About
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box fontSize={11} className={classes.footerBoxTop}>
                TH Logo
              </Box>
            </Grid>

            <Grid item xs={5} className={classes.footerBoxMid}>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/ourstory">
                  Our Story
                </Link>
              </Box>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/ingredients">
                  Ingredients
                </Link>
              </Box>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/faqs">
                  FAQs
                </Link>
              </Box>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/contact">
                  Contact Us
                </Link>
              </Box>
            </Grid>

            <Grid item xs={6} className={classes.footerBoxMid}>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/shipping">
                  Shipping &amp; Returns
                </Link>
              </Box>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/account">
                  My Account
                </Link>
              </Box>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link
                  color={offWhite}
                  component={RouterLink}
                  to="/ordertracking"
                >
                  Track an Order
                </Link>
              </Box>
              <Box fontSize={11} className={classes.aboutLink}>
                <Link color={offWhite} component={RouterLink} to="/careers">
                  Careers
                </Link>
              </Box>
            </Grid>

            <Grid item xs={1}>
              <Box fontSize={11} className={classes.footerBoxMid}>
                <div style={{ transform: 'rotate(90deg)' }}>Copyright 2019</div>
              </Box>
            </Grid>

            <Grid item xs={9} className={classes.emailBox}>
              <EmailAddressInput />
            </Grid>
            <Grid item xs={1} className={classes.socialBox}>
              <Link color={offWhite} href="">
                IG Icon
              </Link>
            </Grid>
            <Grid item xs={1} className={classes.socialBox}>
              <Link color={offWhite} href="">
                TW Icon
              </Link>
            </Grid>
            <Grid item xs={1} className={classes.socialBox}>
              <Link
                color={offWhite}
                href="https://www.facebook.com/truehealthsupplements"
              >
                FB Icon
              </Link>
            </Grid>

            <Grid item xs={3} className={classes.legalBox}></Grid>
            <Grid item xs={3}>
              <Box fontSize={9} className={classes.legalBox}>
                TrueHealth - All rights reserved
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box fontSize={9} className={classes.legalBox}>
                <Link color={offWhite} to="/pricavypolicy">
                  Privacy Policy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box fontSize={9} className={classes.legalBox}>
                <Link color={offWhite} to="/terms">
                  Terms of use
                </Link>
              </Box>
            </Grid>
            <Grid item xs={2} className={classes.legalBox}></Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Footer;
