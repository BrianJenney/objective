import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import utils from '../components/utils/utils';
import store from '../store';
import { requestLoginAttempt } from '../modules/account/actions';

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

export default function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  console.log(props);

  const handleChange = e => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleClick = () => {
    if (utils.validateEmailAddress(email)) {
      store.dispatch(requestLoginAttempt(email, password));
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div>
      {typeof store.getState().account._id === 'undefined' ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.submit}
                  color="primary"
                  fullWidth
                  onClick={handleClick}
                  variant="contained"
                >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div>
                  Don't have an account?
                  <Link component={RouterLink} to="/checkout">
                    Sign Up
                  </Link>
                  !
                </div>
              </Grid>
            </form>
          </div>
        </Container>
      ) : (
        <Redirect to='/gallery' />
      )}
    </div>
  );
}
