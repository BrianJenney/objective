import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Link as RouterLink } from 'react-router-dom';
import LeftArrowIcon from '@material-ui/icons/ArrowBack';
import { StyledArrowIcon } from '../cart/StyledComponents';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { RouteWithSubRoutes } from '../../components/common';
import { AccountMenu } from '../../components/account';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './account-style.scss';
export { default as AccountOverviewPage } from './Overview';
export { default as AccountOrdersPage } from './Orders';
export { default as AccountAddressesPage } from './Addresses';
export { default as AccountPaymentDetailsPage } from './PaymentDetails';
export { default as AccountProfilePage } from './Profile';

const backLink = {
  fontFamily: 'proxima-nova, sans-serif',
  fontSize: '14px',
  color: '#a06958',
  textDecoration: 'underline'
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f6f5f1',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      backgroundColor: '#FFF'
    }
  },
  title: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: 34,
    marginBottom: 30,
    color: theme.palette.brand.camoGreen,
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      marginTop: 15,
      marginBottom: 5
    }
  },
  paper: {
    padding: '58px 58px 58px 25px',
    backgroundColor: '#FFF',
    margin: '0px 70px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 32px',
      margin: 0
    }
  },
  rightSideGrid: {
    paddingLeft: '64px !important',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '12px !important'
    }
  },
  accountMenuGrid: {
    borderRight: '1px solid #231f20',
    paddingRight: '40px',
    [theme.breakpoints.down('xs')]: {
      borderRight: 'unset',
      padding: '12px',
      width: '100%'
    }
  }
}));
const Account = ({ routes, history }) => {
  const currentUser = useSelector(state => state.account.data);
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Box className={classes.root} py={10}>
      <Container>
        <Box className={classes.paper}>
          <Grid container spacing={3}>
            <div className={classes.accountMenuGrid}>
            
              {xs ? (
                <>
                <RouterLink
                onClick={() => history.goBack()}
              >
                <StyledArrowIcon>
                  <LeftArrowIcon style={{color: '#a06958'}} />
                </StyledArrowIcon>
                <span style={backLink}>Back</span>
              </RouterLink>
                <Typography className={classes.title} variant="h1" gutterBottom>
                  Welcome, {currentUser.firstName}!
                </Typography>
                </>
              ) : (
                <></>
              )}

              <Box>
                <AccountMenu />
              </Box>
            </div>
            <Grid item xs={12} md={9} className={`right-side-account ${classes.rightSideGrid}`}>
              <Switch>
                <Redirect exact from="/account" to="/account/overview" />
                {routes.map(route => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
Account.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};
export const AccountPage = Account;
