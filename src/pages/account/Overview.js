import React, { useEffect } from 'react';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { fonts } from '../../components/Theme/fonts.js';
import { getDefaultEntity } from '../../utils/misc';
import { NavLink, Button } from '../../components/common';
import { withLogout } from '../../hoc';
import ScrollToTop from '../../components/common/ScrollToTop';

const pStyle = {
  padding: 20
};
const change = {
  fontFamily: fonts.smallHeader,
  fontSize: 12,
  padding: 9,
  color: 'black'
};
const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: fonts.header,
    fontSize: 48,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: 36,
      marginBottom: 15
    }
  },
  info: {
    fontFamily: fonts.smallHeader,
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
    fontFamily: 'p22-underground, sans-serif'
  }
}));
const AccountOverview = props => {
  const { currentUser } = props;
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = React.useState(true);
  const paymentMethods = get(currentUser, 'data.paymentMethods', []);
  const defaultPaymentMethod = getDefaultEntity(paymentMethods) || {};
  console.log('defaultPaymentMethod', defaultPaymentMethod);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    window.analytics.page('Account Overview');
  }, []);
  const RenderOverview = () => (
    <div className="account-overview">
      <Typography className={classes.title} variant="h1" gutterBottom>
        Welcome, {currentUser.data.firstName}!
      </Typography>
      <p>
        <strong>NAME</strong> {currentUser.data.firstName}{' '}
        {currentUser.data.lastName}
      </p>
      <p>
        <strong>EMAIL</strong>
        {currentUser.data.email}
      </p>
      <p>
        <strong>PASSWORD</strong>
        xxxxxx
        <NavLink to="/account/profile" style={change}>
          CHANGE
        </NavLink>
      </p>
      <p>
        <strong>SAVED PAYMENT METHOD</strong>
        {isEmpty(defaultPaymentMethod)
          ? 'None'
          : `${defaultPaymentMethod.cardType} ${defaultPaymentMethod.last4}`}
      </p>
      {xs ? (
        <Button mt={2} mp={3} fullWidth type="submit" onClick={props.logout}>
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
  logout: PropTypes.func.isRequired
};
export default withLogout(AccountOverview);
