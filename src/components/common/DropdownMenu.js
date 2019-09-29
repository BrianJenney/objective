import React from 'react';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuLink from './MenuLink';
import { fonts, sizes } from '../Theme/fonts';
import { NavLink } from "../common";

const drawerWidth = 300;
const { smallText2 } = sizes;
const { $brandSans } = fonts;
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
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    marginTop: '26px',
    justifyContent: 'flex-start'
  },
  styledMenu: {
    fontSize: smallText2,
    textTransform: 'uppercase',
    fontFamily: $brandSans
  }
}));

const DropdownMenu = ({
  toggleLabel,
  dropdownTitle,
  panelId,
  menuItems,
  side,
  ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    if (
      event.type == 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);


  console.log('itemRestProps', menuItems);


  return (
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
        <Divider />
        <List id={panelId} anchorEl={anchorEl}>
          {menuItems.map(({ key, link, ...itemRestProps }) => (
            <>
              <NavLink to={link}>
                <ListItem key={key} justify="center" button onClick={handleClose}>
                  <Typography className={classes.styledMenu}>
                    <MenuLink {...itemRestProps} />
                  </Typography>
                  <ChevronRightIcon />
                </ListItem>
              </NavLink>
              <Divider />
            </>
          ))}
        </List>
      </Drawer>
    </Box >
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
