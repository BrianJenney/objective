import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ResetSuccess = () => {
  const classes = useStyles();
  return (
    <Box className="password-styles">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="paper">
              <h1>Your password has been reset</h1>
              <p>Click below to return to the account login page</p>
              <Link to="/login">
                <Button>Log in to your account</Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ResetSuccess;
