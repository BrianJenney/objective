import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { fonts } from './Theme/fonts';
import { NavLink, MenuLink } from './common';
import { withLogout } from '../hoc';
const { $brandSans } = fonts;

const StyledMenu = withStyles({
  paper: {
    border: '1px solid',
    width: '286px',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.5)'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    padding: theme.spacing(0, 3),
    fontFamily: $brandSans,
    fontSize: '16px',
    '&:hover': {
      textDecoration: 'underline',
      backgroundColor: 'transparent'
    }
  }
}))(MenuItem);

const LoggedInUser = ({ name, logout }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const menuItems = [
    { key: 'overview', to: '/account/overview', label: 'ACCOUNT OVERVIEW' },
    { key: 'orders', to: '/account/orders', label: 'YOUR ORDERS' },
    { key: 'logout', label: 'LOGOUT' }
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return xs ? (
    <NavLink to="/account/overview">Hi, {name}</NavLink>
  ) : (
    <div className="logged-in-user-desktop">
      <Button
        margin="0 10px"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ backgroundColor: 'transparent', padding: 0 }}
      >
        <Typography
          style={{
            fontFamily: $brandSans,
            fontSize: '16px',
            letterSpacing: '1px'
          }}
        >
          Hi, {name}
        </Typography>{' '}
        &nbsp; {xs ? '' : <ExpandMore />}
      </Button>

      <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {menuItems.map(menuItem =>
          menuItem.key === 'logout' ? (
            <NavLink onClick={logout}>
              <StyledMenuItem key={menuItem.key} button onClick={handleClose}>
                <MenuLink onClick={logout}>{menuItem.label}</MenuLink>
              </StyledMenuItem>
            </NavLink>
          ) : (
            <NavLink to={menuItem.to}>
              <StyledMenuItem key={menuItem.key} button onClick={handleClose}>
                <NavLink to={menuItem.to}>{menuItem.label}</NavLink>
              </StyledMenuItem>
            </NavLink>
          )
        )}
      </StyledMenu>
    </div>
  );
};

LoggedInUser.propTypes = {
  name: PropTypes.string,
  logout: PropTypes.func.isRequired
};

export default withLogout(LoggedInUser);
