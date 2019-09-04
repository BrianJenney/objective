import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withCurrentUser } from '../../hoc';

const RouteWithSubRoutes = ({
  currentUser,
  path,
  component,
  auth,
  nonAuth,
  exact,
  redirectTo,
  ...rest
}) => {
  let Component = component;
  let redirectPath = redirectTo;

  if (auth && !currentUser.account_jwt) {
    if (!redirectPath) {
      redirectPath = '/login';
    }
    Component = () => <Redirect to={redirectPath} />;
  } else if (nonAuth && currentUser.account_jwt) {
    if (!redirectPath) {
      redirectPath = '/account';
    }
    Component = () => <Redirect to={redirectPath} />;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={props => <Component {...props} {...rest} />}
    />
  );
};

RouteWithSubRoutes.propTypes = {
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
  exact: false
};

export default withCurrentUser(RouteWithSubRoutes);
