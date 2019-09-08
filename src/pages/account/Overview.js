import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const pStyle = {
  padding: 15
};

const AccountOverview = props => {
  const { currentUser } = props;

  return (
    <Container style={pStyle}>
      <Grid item xs={12}>
        <Paper>
        <Typography variant="h1" gutterBottom>
            Welcome, {currentUser.firstName} {currentUser.lastName}!
          </Typography>
          <Typography variant="h2" gutterBottom>
            NAME <span>{currentUser.firstName} {currentUser.lastName}</span>
          </Typography>
          <Typography variant="h2" gutterBottom>
            EMAIL <span>{currentUser.email}</span>
          </Typography>
          <Typography variant="h2" gutterBottom>
            PASSWORD <span>******</span>
          </Typography>
          <Typography variant="h2" gutterBottom>
            SAVED PAYMENT METHOD 
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
};

export default AccountOverview;
