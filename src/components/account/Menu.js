import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ACCOUNT_MENU_KEYS, ACCOUNT_MENU_ITEMS } from '../../constants/menu';
import { NavLink, MenuLink } from '../common';
import { withLogout } from '../../hoc';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
const StyledMenuItem = withStyles(theme => ({
  root: {
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen,
    fontSize: 22,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))(MenuItem);

const useStyles = makeStyles(theme => ({
  accountHeaderMobile: {
    fontSize: '24px',
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: '600',
    marginTop: '5px'
  },
  nxTextField: {
    fontFamily: theme.typography.bodyFontFamily,
    fontSize: '18px',
    marginTop: '5px',
    color: theme.palette.brand.camoGreen
  },
  link: {
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '14px'
  },
  selectedLink: {
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 800,
    fontStyle: 'normal',
    fontSize: '14px'
  }
}));

const AccountMenu = ({ logout }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const [mobileSelected, setMobileSelected] = useState(window.location.pathname);
  const [deskSelected, setDeskSelected] = useState(window.location.pathname);

  const NTextField = withRouter(({ history }) => (
    <TextField
      className={`${classes.nxTextField} nxTextField`}
      fullWidth
      select
      value={mobileSelected}
      onChange={e => {
        history.push(e.target.value, history.location.state);
        setMobileSelected(e.target.value);
      }}
    >
      {ACCOUNT_MENU_ITEMS.filter(item => item.key !== ACCOUNT_MENU_KEYS.LOGOUT).map(menuItem => (
        <StyledMenuItem key={menuItem.key} value={menuItem.to}>
          {menuItem.label}
        </StyledMenuItem>
      ))}
    </TextField>
  ));

  const DesktopMenu = withRouter(({history}) => (
    <Box width={1} className="account-menu-box">
      <List component="nav" className="account-left-side">
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
          <ListItem key={menuItem.key} style={{ paddingBottom: '0px' }}>
            {console.log('MENU ITEM', menuItem)}
            <ListItemText
              primary={
                <div className="account-side-menu">
                  {menuItem.key === ACCOUNT_MENU_KEYS.LOGOUT ? (
                    <MenuLink className={classes.link} onClick={logout}>{menuItem.label}</MenuLink>
                  ) : deskSelected === menuItem.to ? (
                    <NavLink className={classes.selectedLink} value={menuItem.to} to={menuItem.to} onClick={e => {
                      history.push(e.target.value, history.location.state);
                      setDeskSelected(menuItem.to);
                    }}>{menuItem.label}</NavLink>
                  ) : (
                    <NavLink className={classes.link} value={menuItem.to} to={menuItem.to} onClick={e => {
                      history.push(e.target.value, history.location.state);
                      setDeskSelected(menuItem.to);
                    }}>{menuItem.label}</NavLink>
                  ) }
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  ))

  return xs ? (
    <>
      <NTextField />
    </>
  ) : (
    <>
    <DesktopMenu />
    </>
  );
};

AccountMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  router: PropTypes.object
};

export default withLogout(AccountMenu);
