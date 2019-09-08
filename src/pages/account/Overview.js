import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const pStyle = {
  padding: 15
};

const useStyles = makeStyles(theme => ({
  space: {
    padding: '15px'
  }
}));

const AccountOverview = props => {
  const { currentUser } = props;
  const classes = useStyles();
  return (
    <Container style={pStyle}>
      <Grid item xs={12}>
        <Paper>
        <Typography className={classes.space} variant="h1" gutterBottom>
            Welcome, {currentUser.firstName} {currentUser.lastName}!
          </Typography>
          <Typography className={classes.space} variant="h3" gutterBottom>
            NAME {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography className={classes.space} variant="h3" gutterBottom>
            EMAIL {currentUser.email}
          </Typography>
          <Typography className={classes.space} variant="h3" gutterBottom>
            PASSWORD ******
          </Typography>
          <Typography className={classes.space} variant="h3" gutterBottom>
            SAVED PAYMENT METHOD 
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
};

export default AccountOverview;
