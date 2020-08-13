import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    padding: theme.spacing(2),
    width: '286px',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.5)'
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

const LoginDropdown = ({ text = 'Account' }) => {
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
        style={{ backgroundColor: 'transparent', textTransform: 'none' }}
      >
        <Typography
          style={{
            fontFamily: 'proxima-nova, sans-serif, Helvetica, sans',
            color: '#553226',
            fontSize: '13px',
            letterSpacing: '1px'
          }}
        >
          {text}
        </Typography>{' '}
      </Button>
      <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          to="/login"
          underline="none"
          component={NavLink}
          onClick={handleClose}
          children="Log in"
          style={{
            fontFamily: $brandSans,
            padding: '14px',
            fontWeight: 900,
            letterSpacing: 1.33,
            fontSize: 16,
            lineHeight: 1.88
          }}
        />
        <Box pt={1}>
          <Typography
            style={{
              fontFamily: $brandSans,
              fontSize: '16px'
            }}
          >
            Don&#39;t have an account?&nbsp;
            <NavLink to="/signup" onClick={handleClose} children="Sign up" underline="always" />
          </Typography>
        </Box>
      </StyledMenu>
    </div>
  );
};

LoginDropdown.propTypes = {
  text: PropTypes.string
};

export default LoginDropdown;
