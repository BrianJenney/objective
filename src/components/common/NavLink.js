import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const NavLink = React.forwardRef((props, ref) => <Link component={RRNavLink} ref={ref} {...props} />);

export default NavLink;
