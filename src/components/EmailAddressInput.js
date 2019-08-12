import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import utils from './utils/utils';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    background: '#fcf8f4',
    color: '#fcf8f4',
    marginTop: theme.spacing(2)
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200
  }
}));

const EmailAddressInput = () => {
  const classes = useStyles();

  const [email, setEmail] = React.useState({email:''});

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleClick = (e) => {
    if (utils.validateEmailAddress(email)) {
      alert('We\'d collect ' + email + ' here.');
    } else {
      alert('Please enter avalid email address');
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEnter = (e) => {
    if(e.keyCode===13) {
      handleClick();
    }
  };

  return (
    <TextField
      autoComplete="email"
      className={classes.textField}
      id="outlined-email-input"
      InputProps={{
        endAdornment: 
        <Button
          className={classes.button}
          disabled={email.length===undefined || email.length===0}
          onClick={handleClick}
        >
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>
          </SvgIcon>
        </Button>
      }}
      margin="normal"
      name="email"
      onChange={handleChange}
      onKeyUp={handleEnter}
      placeholder="Your Email"
      type="email"
      variant="outlined"
    />
  );
};

export default EmailAddressInput;