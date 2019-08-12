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
    padding:10
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
  footerBoxMid : {
    background: black,
    border: '1px solid ' + offWhite,
    color: offWhite,
    height: 140,
    paddingTop: 25,
    textTransform: 'uppercase'
  },
  socialBox: {
    background: black,
    border: '1px solid ' + offWhite,
    color: offWhite,
    height: 70,
    paddingTop:30
  },
  legalBox: {
    background: black,
    color: offWhite,
    height: 30,
    paddingTop: 7,
    textAlign:'center',
    textTransform: 'uppercase'
  },
  verticalText: {
    //extend: 'footerBoxMid',
    transform: [{rotate: '90deg'}]
  }
}));

const Footer = () => {

  const classes = useStyles();

  const theme = useTheme();
  let xs = useMediaQuery(theme.breakpoints.down('xs'));
  
  return (
    <>
    {xs ? (
      <Grid container spacing={0}>
        <Grid item xs={1} className={classes.footerBoxTop}></Grid>
        <Grid item xs={10}>
          <Box fontSize={11} className={classes.footerBoxTop}>Shop</Box>
        </Grid>
        <Grid item xs={1}>
          <Box fontSize={11} className={classes.footerBoxTop}>
            TH Logo
          </Box>
        </Grid>

        <Grid item xs={12} className={classes.footerBoxMid}>About</Grid>
        <Grid item xs={6} >
          <Box fontSize={11} className={classes.aboutLink}>
            <Link color={offWhite} component={RouterLink} to='/ourstory'>Our Story</Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box fontSize={11} className={classes.aboutLink}>
            <Link color={offWhite} component={RouterLink} to='/shipping'>Shipping &amp; Returns</Link>
          </Box>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={6}>
            <Box fontSize={11} className={classes.aboutLink}>
              <Link color={offWhite} component={RouterLink} to='/ingredients'>Ingredients</Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box fontSize={11} className={classes.aboutLink}>
              <Link color={offWhite} component={RouterLink} to='/account'>My Account</Link>
            </Box>
          </Grid>
        </Grid>    
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Box fontSize={11} className={classes.aboutLink}>
              <Link color={offWhite} component={RouterLink} to='/faqs'>FAQs</Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box fontSize={11} className={classes.aboutLink}>
              <Link color={offWhite} component={RouterLink} to='/ordertracking'>Track an Order</Link>
            </Box>
          </Grid>
        </Grid>    
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Box fontSize={11} className={classes.aboutLink}>
              <Link color={offWhite} component={RouterLink} to='/contact'>Contact Us</Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box fontSize={11} className={classes.aboutLink}>
              <Link color={offWhite} component={RouterLink} to='/careers'>Careers</Link>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.emailBox}>
          <EmailAddressInput/>
        </Grid>

        <Grid item xs={4} className={classes.socialBox}>
          <Link color={offWhite} href=''>
          IG Icon
          </Link>
        </Grid>
        <Grid item xs={4} className={classes.socialBox}>
          <Link color={offWhite} href=''>
          TW Icon
          </Link>
        </Grid>
        <Grid item xs={4} className={classes.socialBox}>
          <Link color={offWhite} href='https://www.facebook.com/truehealthsupplements'>
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
            <Link color={offWhite} to="/pricavypolicy">Privacy Policy</Link>
          </Box>
        </Grid>
        <Grid item xs={6}> 
          <Box fontSize={9} className={classes.legalBox}>
            <Link color={offWhite} to="/terms">Terms of use</Link>
          </Box>
        </Grid>

      </Grid>
    ) : (
      <Box className={classes.container}>
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <Box fontSize={11} className={classes.footerBoxTop}>Shop</Box>
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
        
          <Grid item xs={5} className={classes.footerBoxMid}></Grid>
          <Grid item xs={6} className={classes.footerBoxMid}>
            <Grid container xs={12}>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/ourstory'>Our Story</Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/shipping'>Shipping &amp; Returns</Link>
                </Box>
              </Grid>
            </Grid>
            <Grid container xs={12}>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/ingredients'>Ingredients</Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/account'>My Account</Link>
                </Box>
              </Grid>
            </Grid>    
            <Grid container xs={12}>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/faqs'>FAQs</Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/ordertracking'>Track an Order</Link>
                </Box>
              </Grid>
            </Grid>    
            <Grid container xs={12}>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/contact'>Contact Us</Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box fontSize={11} className={classes.aboutLink}>
                  <Link color={offWhite} component={RouterLink} to='/careers'>Careers</Link>
                </Box>
              </Grid>
            </Grid>              
          </Grid>
          <Grid item xs={1} className={classes.verticalText}>
          Copyright 2019
          </Grid>

          <Grid item xs={9} className={classes.emailBox}>
            <EmailAddressInput/>
          </Grid>
          <Grid item xs={1} className={classes.socialBox}>
            <Link color={offWhite} href=''>
          IG Icon
            </Link>
          </Grid>
          <Grid item xs={1} className={classes.socialBox}>
            <Link color={offWhite} href=''>
          TW Icon
            </Link>
          </Grid>
          <Grid item xs={1} className={classes.socialBox}>
            <Link color={offWhite} href='https://www.facebook.com/truehealthsupplements'>
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
              <Link color={offWhite} to="/pricavypolicy">Privacy Policy</Link>
            </Box>
          </Grid>
          <Grid item xs={2}> 
            <Box fontSize={9} className={classes.legalBox}>
        ;  <Link color={offWhite} to="/terms">Terms of use</Link>
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