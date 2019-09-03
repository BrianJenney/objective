import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from '../components/common';
import { InputField } from '../components/form-fields';
import { withAuthToken } from '../hoc';
import store from '../store';
import { requestLoginAttempt } from '../modules/account/actions';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email'),
  password: string().required('Password is required')
});

const INITIAL_VALUES = {
  email: 'kevinch@nutranext.net',
  password: '44444'
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121'
    }
  }
});

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.grey
    }
  },
  layout: {
    width: '60%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },

  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },

  box: {
    width: 'auto',
    display: 'flex',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    borderColor: '#ffcdd2'
  },
  form: {
    width: 'auto', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const Login = props => {
  console.log('props', props);
  const classes = useStyles();
  const account = props.account;
  const authToken = props.authToken;
  // console.log(props.history);
  const handleSubmit = ({ email, password }) => {
    store.dispatch(requestLoginAttempt(email, password));
  };
  console.log('testing', handleSubmit);

  const renderForm = () => (
    <Form className={classes.form} noValidate>
      <Grid item>
        <Field
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="Email Address"
          name="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          component={InputField}
        />

        <Field
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          component={InputField}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        LOG IN
      </Button>

      <Grid>
        <Grid container item xs={12} justify="center">
          <NavLink href="#" variant="body2" underline="always">
            Forgot your email/password?
          </NavLink>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Typography variant="body2">Don't have an account? </Typography>
          <NavLink to="/signup" variant="body2" underline="always">
            Sign up
          </NavLink>
        </Grid>
      </Grid>
    </Form>
  );

  if (authToken || (account && account.account_jwt)) {
    props.history.goBack();
  }

  return (
    <Box component="main" className={classes.layout}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            <Box fontFamily="Roboto">Log in to your account</Box>
          </Typography>
          {/* Display error message when password/email is incorrect */}
          <Box className={classes.box} border={1} bgcolor="#ffcdd2">
            <Typography variant="caption">
              Password or username is not valid. Please check your spelling and
              try again.
            </Typography>
          </Box>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            validationSchema={schema}
            render={renderForm}
          />
        </div>
      </MuiThemeProvider>
    </Box>
  );
};

Login.propTypes = {
  authToken: PropTypes.string,
  account: PropTypes.object
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  null
)(withAuthToken(Login));
