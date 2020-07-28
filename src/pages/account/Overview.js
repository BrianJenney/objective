import React, { useEffect } from 'react';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

import { fonts } from '../../components/Theme/fonts';
import { getDefaultEntity } from '../../utils/misc';
import { NavLink, Button } from '../../components/common';
import { withLogout } from '../../hoc';
import ScrollToTop from '../../components/common/ScrollToTop';

const change = {
  fontFamily: 'proxima-nova, sans-serif',
  fontSize: 14,
  padding: 9,
  color: '#a06958'
};
const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: 25,
    marginBottom: 20,
    color: theme.palette.brand.camoGreen,
  },
  info: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
  },
  subTexts: {
    fontFamily: fonts.body,
    fontSize: '21px',
    padding: 10
  },
  inline: {
    display: 'flex'
  },
  root: {
    width: '100%',
    maxWidth: 360
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  box: {
    backgroundColor: '#003833',
    '&:hover': {
      backgroundColor: '#003833'
    }
  },
  item: {
    color: 'white',
    fontSize: '16px',
    fontFamily: theme.typography.bodyFontFamily
  }
}));
const AccountOverview = ({ currentUser, logout }) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const paymentMethods = get(currentUser, 'data.paymentMethods', []);
  const defaultPaymentMethod = getDefaultEntity(paymentMethods) || {};

  useEffect(() => {
    window.analytics.page('Account Overview');
  }, []);
  const RenderOverview = () => (
    <div className="account-overview">
      {xs ? (
        <></>
      ) : (
        <Typography className={classes.title} variant="h1" gutterBottom>
          Welcome, {currentUser.data.firstName}!
        </Typography>
      )}

      <p>
        <strong>NAME</strong> {currentUser.data.firstName} {currentUser.data.lastName}
      </p>
      <p>
        <strong>EMAIL</strong>
        {currentUser.data.email}
      </p>
      <p>
        <strong>PASSWORD</strong>
        xxxxxx
        <NavLink to="/account/profile" style={change}>
          Change
        </NavLink>
      </p>
      <p>
        <strong>SAVED PAYMENT METHOD</strong>
        {isEmpty(defaultPaymentMethod)
          ? 'None'
          : `${defaultPaymentMethod.cardType} ${defaultPaymentMethod.last4}`}
      </p>
      {xs ? (
        <Button mt={2} mp={3} fullWidth type="submit" onClick={logout}>
          Logout
        </Button>
      ) : (
        ''
      )}
    </div>
  );
  return (
    <ScrollToTop>
      <RenderOverview />
    </ScrollToTop>
  );
};

AccountOverview.propTypes = {
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};
export default withLogout(AccountOverview);
