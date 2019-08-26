import React from 'react';
import Button from './common/Button';
import { makeStyles } from '@material-ui/core/styles';
import store from '../store';
import { logout } from '../modules/account/actions';

const localStorageClient = require('store');

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Logout = () => {
  const classes = useStyles();

  const handleClick = () => {
    store.dispatch(logout());
    localStorageClient.remove('token');
  };

  return (
    <Button variant="outlined" className={classes.link} onClick={handleClick}>
      Logout
    </Button>
  );
};

export default Logout;
