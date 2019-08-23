import React from 'react';
import {TextField, Button} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import utils from './utils/utils';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: 'p22-underground, Helvetica, sans-serif',
  },
}));

const StyledTextField = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#ffffff',
    fontSize: '24px',
    backgroundColor: 'transparent',
  },
}))(TextField)

const EmailAddressInput = () => {
  const classes = useStyles();

  const [email, setEmail] = React.useState({ email: '' });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleClick = e => {
    if (utils.validateEmailAddress(email)) {
      alert("We'd collect " + email + ' here.');
    } else {
      alert('Please enter avalid email address');
    }
  };

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <StyledTextField
      autoComplete="email"
      className={classes.textField}
      id="outlined-email-input"
      InputProps={{
        endAdornment: (
          <Button
            className={classes.button}
            disabled={email.length === undefined || email.length === 0}
            onClick={handleClick}
          ></Button>
        )
      }}
      margin="none"
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
