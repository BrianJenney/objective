import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { Route, Redirect, withRouter } from 'react-router-dom';
import { withCurrentUser } from '../../hoc';

import Loader from '../common/Loader';

const RouteWithSubRoutes = ({
  location,
  injectCurrentUser,
  currentUser,
  path,
  component,
  auth,
  nonAuth,
  exact,
  redirectTo,
  ...rest
}) => {
  const currentUserProp = injectCurrentUser ? { currentUser } : {};
  const { account_jwt } = currentUser.data;
  let Component = component;
  let redirectPath = redirectTo;

  if (auth && !account_jwt) {
    if (!redirectPath) {
      redirectPath = '/';
    }
    Component = () => <Redirect to={redirectPath} />;
  } else if (nonAuth && account_jwt) {
    switch (location.pathname) {
      case '/login/order':
        redirectPath = '/account/orders';
        break;
      case '/login/account':
        redirectPath = '/account';
        break;
      case '/login/shipping':
        redirectPath = '/shipping';
        break;
      case '/login/checkout':
        redirectPath = '/checkout';
        break;
      case '/login/checkout2':
        redirectPath = '/checkout2';
        break;
      case '/login/checkout/':
        redirectPath = '/checkout';
        break;
      case '/login/checkout2/':
        redirectPath = '/checkout2';
        break;
      default:
        if (!redirectPath) {
          redirectPath = '/gallery';
        }
    }
    Component = () => <Redirect to={redirectPath} />;
  }

  if (
    (location.pathname.startsWith('/account') && currentUser.fetchAccountLoading === null) ||
    (location.pathname.startsWith('/orders') && currentUser.fetchAccountLoading === null)
  ) {
    return <Loader />;
  }

  return <Route path={path} exact={exact} render={props => <Component {...currentUserProp} {...props} {...rest} />} />;
};

RouteWithSubRoutes.propTypes = {
  injectCurrentUser: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.object,
  routes: PropTypes.array,
  auth: PropTypes.bool,
  nonAuth: PropTypes.bool,
  redirectTo: PropTypes.string
};

RouteWithSubRoutes.defaultProps = {
  injectCurrentUser: false,
  exact: false
};

export default compose(withRouter, withCurrentUser)(RouteWithSubRoutes);
