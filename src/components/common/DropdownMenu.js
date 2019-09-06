import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  List,
  Box
} from '@material-ui/core';
import MenuLink from './MenuLink';
import Close from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { StyledSmallCaps } from '../../pages/cart/StyledComponents';

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
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

  return (
    <Box className={classes.root} {...rest}>
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
            <Close />
          </IconButton>
        </div>
        <Divider />
        <List id={panelId} anchorEl={anchorEl}>
          {menuItems.map(({ key, ...itemRestProps }) => (
            <>
              <ListItem key={key} justify="center" button onClick={handleClose}>
                <StyledSmallCaps component="span">
                  <MenuLink {...itemRestProps} />
                </StyledSmallCaps>

                <ChevronRightIcon />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Drawer>
    </Box>
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
