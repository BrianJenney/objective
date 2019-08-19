import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import store from '../../store';
import { requestCreateAccount } from '../../modules/account/actions';

const CreateAccount = () => {
  const [firstName, setFname] = React.useState(null);
  const [lastName, setLname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPword] = React.useState(null);

  const handleChange = e => {
    switch (e.target.id) {
      case 'firstName':
        setFname(e.target.value);
        break;
      case 'lastName':
        setLname(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClick = e => {
    console.log(e);
    store.dispatch(
      requestCreateAccount({ firstName, lastName, email, password })
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create an Account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={handleChange}
            value={firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={handleChange}
            value={lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            onChange={handleChange}
            value={email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            onChange={handleChange}
            value={password}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            {'Create Account'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateAccount;
