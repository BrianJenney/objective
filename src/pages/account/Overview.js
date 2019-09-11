import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { fonts } from '../../components/Theme/fonts.js';

const pStyle = {
  padding: 20
};

const change = {
  fontFamily: fonts.smallHeader,
  fontSize:12,
  padding: 9,
  color: 'black'
}

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: fonts.header,
    fontSize: 48
  },
  info: {
    fontFamily: fonts.smallHeader,
    padding: 20,
    fontSize: '18px'
  },
  subTexts: {
    fontFamily: fonts.body,
    fontSize: '21px',
    padding: 10
  },
  inline: {
    display: 'flex'
  }
}));

const AccountOverview = props => {
  const { currentUser } = props;
  const classes = useStyles();

  return (
    <Container style={pStyle}>
      <Grid item xs={12}>
        <Paper align="left">
          <Typography className={classes.title} variant="h1" gutterBottom>
            Welcome, {currentUser.firstName} {currentUser.lastName}!
          </Typography>

          <div className={classes.inline}>
            <Typography className={classes.info} variant="h3" gutterBottom>
              NAME
            </Typography>
            <span className={classes.subTexts}>
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
          <div className={classes.inline}>
            <Typography className={classes.info} variant="h3" gutterBottom>
              EMAIL
            </Typography>
            <span className={classes.subTexts}>{currentUser.email}</span>
          </div>
          <div className={classes.inline}>
          <Typography className={classes.info} variant="h3" gutterBottom>
            PASSWORD
          </Typography>
          <span className={classes.subTexts}>******</span>
          <a href='' style={change}>CHANGE</a>

          </div>
          <div className={classes.inline}>
          <Typography className={classes.info} variant="h3" gutterBottom>
            SAVED PAYMENT METHOD
          </Typography>

          </div>
        </Paper>
      </Grid>
    </Container>
  );
};

export default AccountOverview;
