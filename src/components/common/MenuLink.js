import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import NavLink from './NavLink';

const MenuLink = ({ to, ...rest }) => {
  if (to) {
    return <NavLink to={to} {...rest} />;
  }

  return <Link style={{ cursor: 'pointer' }} {...rest} />;
};

MenuLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default MenuLink;
