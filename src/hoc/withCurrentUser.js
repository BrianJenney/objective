import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function withCurrentUser(ComposedComponent) {
  const ComponentWithCurrentUser = props => <ComposedComponent {...props} />;
  const mapStateToProps = state => ({ currentUser: state.account });

  ComponentWithCurrentUser.propTypes = {
    currentUser: PropTypes.object.isRequired
  };

  return connect(
    mapStateToProps,
    null
  )(ComponentWithCurrentUser);
}
