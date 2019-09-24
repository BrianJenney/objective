import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ACCOUNT_MENU_KEYS, ACCOUNT_MENU_ITEMS } from '../../constants/menu';
import { NavLink, MenuLink } from '../common';
import { withLogout } from '../../hoc';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';

const StyledMenuItem = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground',
    fontSize: 16,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))(MenuItem);

const AccountMenu = ({ logout}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const [selected,setSelected] = useState(window.location.pathname);

 
  const NTextField = withRouter(({history}) =>(
    
    <TextField 
    style={{ fontFamily: 'P22-underground', fontSize: '18px' , marginTop: '50px'}}
    variant="outlined"
    fullWidth
    select
    value = {selected}
    onChange = {(e) => {history.push(e.target.value,history.location.state); setSelected(e.target.value)}}
    >
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
           <MenuItem key={menuItem.key} value={menuItem.to}>
           {menuItem.label}
         </MenuItem>
        ))}
    </TextField>
  )


  );
  
  return xs ? (
   
 <NTextField/>  

  ) : (
    
    <Box width={1} className="account-menu-box">

    
      <List component="nav" className="account-left-side">
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
          <ListItem key={menuItem.key}>
            <ListItemText
              primary={
                <div className="account-side-menu">
                  {menuItem.key === ACCOUNT_MENU_KEYS.LOGOUT ? (
                    <MenuLink onClick={logout}>{menuItem.label}</MenuLink>
                  ) : (
                    <NavLink to={menuItem.to}>{menuItem.label}</NavLink>
                  )}
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

AccountMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  router : PropTypes.object
};

export default withLogout(AccountMenu);
