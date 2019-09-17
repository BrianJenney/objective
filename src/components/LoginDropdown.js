import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fonts } from './Theme/fonts';
import { NavLink } from './common';

const { $brandSans } = fonts;

const StyledMenu = withStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(2)
  }
}))(props => (
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

const LoginDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ margin: '0 -5px' }}>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
        style={{ backgroundColor: 'transparent' }}
      >
        <Typography style={{ fontFamily: $brandSans }}>Account</Typography>{' '}
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          to="/login"
          underline="none"
          component={NavLink}
          children="Login"
        ></Button>
        <Box pt={1}>
          <Typography>
            Don&#39;t have an account?&nbsp;
            <NavLink to="/signup" children="Signup!" underline="always" />
          </Typography>
        </Box>
      </StyledMenu>
    </div>
  );
};

export default LoginDropdown;
