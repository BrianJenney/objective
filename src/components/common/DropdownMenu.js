import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import MenuLink from './MenuLink';
import { NavLink } from '.';
import signInImage from '../../assets/images/account_avatar.svg';
import ShoppingCart from '../../pages/cart/ShoppingCart';

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    backgroundColor: '#fff7e8',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff7e8'
  },
  drawerHeader: {
    marginTop: '26px',
    justifyContent: 'flex-start'
  },
  divider: {
    backgroundColor: '#eec0b1'
  },
  styledMenu: {
    fontSize: '24px',
    fontFamily: 'proxima-nova, sans-serif, Helvetica, sans',
    colorPrimary: '#553226'
  },
  styledSubMenu: {
    fontSize: '20px',
    fontFamily: 'proxima-nova, sans-serif, Helvetica, sans',
    colorPrimary: '#a06958',
    textDecoration: 'underline',
    margin: '0 10px'
  }
}));

const DropdownMenu = ({ toggleLabel, dropdownTitle, panelId, menuItems, ...rest }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const cartTextStyle = {
    fontFamily: 'proxima-nova',
    color: 'rgb(160, 105, 88)',
    marginLeft: '10px',
    fontSize: '20px',
    textTransform: 'capitalize'
  };

  return (
    <>
      <Box {...rest}>
        <CssBaseline />
        <AppBar
          color="inherit"
          position="fixed"
          aria-label="Menu"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        />
        <Toolbar background="transparent">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenu}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Drawer
          className={classes.drawer}
          anchor="left"
          open={open}
          onClose={handleClose}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <List id={panelId} anchorEl={anchorEl}>
            {menuItems.map(({ key, link, ...itemRestProps }) => (
              <>
                <NavLink to={link}>
                  <ListItem key={key} justify="center" button onClick={handleClose}>
                    <Typography className={classes.styledMenu}>
                      <MenuLink {...itemRestProps} />
                    </Typography>
                  </ListItem>
                </NavLink>
                <Divider variant="middle" classes={{ root: classes.divider }} />
              </>
            ))}
          </List>
          <List id={panelId} anchorEl={anchorEl}>
            <>
              <NavLink to="/">
                <ListItem key="bag" justify="center">
                  <Typography style={{ display: 'inline-flex' }} className={classes.styledSubMenu}>
                    <ShoppingCart textStyle={cartTextStyle} showCartCount={false} text="bag" />
                  </Typography>
                </ListItem>
              </NavLink>
              <NavLink to="/login">
                <ListItem>
                  <img src={signInImage} alt="sign in" />
                  <Typography className={classes.styledSubMenu}>
                    <MenuLink children="Sign In" style={{ color: '#a06958' }} />
                  </Typography>
                </ListItem>
              </NavLink>
            </>
          </List>
        </Drawer>
      </Box>
    </>
  );
};

DropdownMenu.propTypes = {
  toggleLabel: PropTypes.node.isRequired,
  dropdownTitle: PropTypes.string,
  panelId: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.object)
};

DropdownMenu.defaultProps = {
  panelId: 'default-dropdown',
  menuItems: []
};

export default DropdownMenu;
