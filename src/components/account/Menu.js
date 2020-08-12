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

import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ReactComponent as DropDownLogo } from '../../assets/static/drop_down_arrow.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  accountHeaderMobile: {
    fontSize: '24px',
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: '600',
    marginTop: '5px'
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
  },
}));

const StyledMenuItem = withStyles(theme => ({
  root: {
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen,
    fontSize: 18,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))(MenuItem);

const StyledSelect = withStyles(theme => ({
  root: {
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen
  }
}))(Select);

const StyledOutlinedInput = withStyles(theme => ({
  root: {
    borderColor: theme.palette.brand.camoGreen,
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.brand.camoGreen
      }
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.brand.camoGreen
      }
    }
  },
  notchedOutline: {
    '& legend': {
      display: 'none'
    },
    borderColor: theme.palette.brand.camoGreen
  },
  input: {
    fontWeight: '500',
    color: theme.palette.brand.camoGreen,
    fontSize: '18px'
  }
}))(OutlinedInput);


const DownIcon = props => {
  return (
    <div style={{height: 15, width: 50}}>
    <SvgIcon>
        <DropDownLogo />
    </SvgIcon>
    </div>
  );
};


const AccountMenu = ({ logout }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const [mobileSelected, setMobileSelected] = useState(window.location.pathname);
  const [deskSelected, setDeskSelected] = useState(window.location.pathname);

  const NTextField = withRouter(({ history }) => (
    <StyledSelect
      fullWidth
      variant="outlined"
      value={mobileSelected}
      onChange={e => {
        history.push(e.target.value, history.location.state);
        setMobileSelected(e.target.value);
      }}
      IconComponent={DownIcon}
      input={<StyledOutlinedInput />}
    >
      {ACCOUNT_MENU_ITEMS.filter(item => item.key !== ACCOUNT_MENU_KEYS.LOGOUT).map(menuItem => (
        <StyledMenuItem key={menuItem.key} value={menuItem.to}>
          {menuItem.label}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  ));

  const DesktopMenu = withRouter(({ history }) => (
    <Box width={1} className="account-menu-box">
      <List component="nav" className="account-left-side">
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
          <ListItem key={menuItem.key} style={{ paddingBottom: '0px' }}>
            <ListItemText
              primary={
                <div className="account-side-menu">
                  {menuItem.key === ACCOUNT_MENU_KEYS.LOGOUT ? (
                    <MenuLink className={classes.link} onClick={logout}>
                      {menuItem.label}
                    </MenuLink>
                  ) : deskSelected === menuItem.to ? (
                    <NavLink
                      className={classes.selectedLink}
                      value={menuItem.to}
                      to={menuItem.to}
                      onClick={e => {
                        history.push(e.target.value, history.location.state);
                        setDeskSelected(menuItem.to);
                      }}
                    >
                      {menuItem.label}
                    </NavLink>
                  ) : (
                    <NavLink
                      className={classes.link}
                      value={menuItem.to}
                      to={menuItem.to}
                      onClick={e => {
                        history.push(e.target.value, history.location.state);
                        setDeskSelected(menuItem.to);
                      }}
                    >
                      {menuItem.label}
                    </NavLink>
                  )}
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  ));

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
