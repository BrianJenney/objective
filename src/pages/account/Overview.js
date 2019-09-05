import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};

const AccountOverview = props => {
  const { currentUser } = props;

  return (
    <Container>
      <Grid item xs={12}>
        <Paper style={pStyle}>
          <Typography variant="h3" gutterBottom>
            Name {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {currentUser.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Password: XXXXXXXX
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
};

export default AccountOverview;
