import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EmailAddressInput from './EmailAddressInput';
import './Footer-style.scss';

const Footer = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {xs ? (
        <Box className="footer-container">
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
                  <Box>TH Logo</Box>
                </Grid>
                <Grid item xs={6} className="border-bottom border-left row1">
                  <Box>
                    <div className="rotate">Copyright 2019</div>
                  </Box>
                </Grid>
                <Grid item xs={6} className="row2 border-bottom">
                  <Grid container spacing={0}>
                    <Grid item xs={12} className="title">
                      <Link component={RouterLink} to="/gallery">
                        About
                      </Link>
                    </Grid>
                    <List className="links">
                      <ListItem>
                        <Link component={RouterLink} to="/ourstory">
                          Our Story
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link component={RouterLink} to="/ingredients">
                          Ingredients
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link component={RouterLink} to="/contact">
                          Contact Us
                        </Link>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Grid item xs={6} className="row2 border-bottom border-left">
                  <Grid container spacing={0}>
                    <Grid item xs={12} className="title">
                      <Link component={RouterLink} to="/gallery">
                        Help
                      </Link>
                    </Grid>
                    <List className="links">
                      <ListItem>
                        <Link component={RouterLink} to="/ourstory">
                          FAQs
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link component={RouterLink} to="/ingredients">
                          Contact Us
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link component={RouterLink} to="/contact">
                          Accounts &amp; Orders
                        </Link>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="border-bottom signup-box p-20">
                  Sign up for tips and new prouct launches.<br></br>
                  <EmailAddressInput />
                </Grid>
                <Grid item xs={4} className="border-bottom p-20 text-center">
                  <Link to="">IG Icon</Link>
                </Grid>
                <Grid
                  item
                  xs={4}
                  className="border-bottom p-20 text-center border-left"
                >
                  <Link href="">TW Icon</Link>
                </Grid>
                <Grid
                  item
                  xs={4}
                  className="border-bottom p-20 text-center border-left"
                >
                  <Link href="https://www.facebook.com/truehealthsupplements">
                    FB Icon
                  </Link>
                </Grid>
                <Grid container xs={12} className="legal">
                  <List>
                    <ListItem className="text-center">
                      TrueHealth &bull; All rights reserved
                    </ListItem>
                  </List>
                </Grid>
                <Grid container xs={12} className="legal">
                  <List>
                    <ListItem className="text-center">
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </ListItem>
                    <ListItem className="text-center">
                      <Link to="/terms">Terms of use</Link>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Box>
      ) : (
        <Box className="footer-container">
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
                  <Box>
                    <Link component={RouterLink} to="/gallery">
                      About
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={6} className="title border-bottom border-left">
                  <Box>
                    <Link component={RouterLink} to="/help">
                      Help
                    </Link>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={1}
                  className="title border-bottom logo border-left"
                >
                  <Box>Logo</Box>
                </Grid>
                <Grid item xs={5} className="border-bottom">
                  <List className="links">
                    <ListItem>
                      <Link component={RouterLink} to="/ourstory">
                        Our Story
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link component={RouterLink} to="/ingredients">
                        Ingredients
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link component={RouterLink} to="/contact">
                        Contact Us
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6} className="border-left border-bottom">
                  <List className="links">
                    <ListItem>
                      <Link component={RouterLink} to="/shipping">
                        Shipping &amp; Returns
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link component={RouterLink} to="/account">
                        My Account
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link component={RouterLink} to="/ordertracking">
                        Track an Order
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom">
                  <Box>
                    <div className="rotate">Copyright 2019</div>
                  </Box>
                </Grid>
                <Grid item xs={8} className="border-bottom signup-box p-40">
                  Sign up for tips and new prouct launches.<br></br>
                  <EmailAddressInput />
                </Grid>
                <Grid item xs={1} className="border-left border-bottom p-40">
                  <Link href="">IG Icon</Link>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom p-40">
                  <Link href="">TW Icon</Link>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom p-40">
                  <Link href="https://www.facebook.com/truehealthsupplements">
                    FB Icon
                  </Link>
                </Grid>
                <Grid item xs={1} className="border-left border-bottom">
                  &nbsp;
                </Grid>
                <Grid container xs={12} className="legal">
                  <List>
                    <ListItem>TrueHealth &bull; All rights reserved</ListItem>
                    <ListItem>
                      <Link to="/pricavypolicy">Privacy Policy</Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/terms">Terms of use</Link>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Footer;
