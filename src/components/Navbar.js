import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import utils from './utils/utils';
import Logout from './Logout';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: 'none'
    },
    a: {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Company name
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" className={classes.link}>
              <RouterLink to="/">Home</RouterLink>
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link}>
              <RouterLink to="/gallery">All Products</RouterLink>
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link}>
              <RouterLink to="/cart">Cart</RouterLink>
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link}>
              <RouterLink to="/checkout">Checkout</RouterLink>
            </Link>
            <Link variant="button" color="textPrimary" className={classes.link}>
              <RouterLink to="/account">Account</RouterLink>
            </Link>
          </nav>
          {utils.isLoggedIn() ? (
            <Logout />
          ) : (
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              <RouterLink to="/login" className="item">
                Login
              </RouterLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box mb="2rem" />
    </React.Fragment>
  );
};

export default Navbar;
