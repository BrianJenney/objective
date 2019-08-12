import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

const NavLink = props => <Link component={RRNavLink} {...props} />;

export default NavLink;
