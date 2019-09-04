import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestLogout } from '../modules/account/actions';

export default function withLogout(ComposedComponent) {
  const ComponentWithLogout = props => <ComposedComponent {...props} />;
  const mapDispatchToProps = { logout: requestLogout };

  ComponentWithLogout.propTypes = {
    logout: PropTypes.func.isRequired
  };

  return connect(
    null,
    mapDispatchToProps
  )(ComponentWithLogout);
}
