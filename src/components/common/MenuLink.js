import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Link from '@material-ui/core/Link';
import NavLink from './NavLink';

const MenuLink = ({ to, ...rest }) => {
  if (to) {
    return <NavLink to={to} {...rest} />;
  }

  const style = get(rest, 'style', {});
  style.cursor = 'pointer';

  return <Link {...rest} style={style} />;
};

MenuLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default MenuLink;
