import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../hoc/withDialog';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px'
    }
  }
}));

const ConfirmSignupEmail = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={8} textAlign="center">
        <Typography className={classes.title}>Thank you</Typography>
        <Typography variant="body1">
          You have been successfully signed up.
        </Typography>
      </Box>
    </Container>
  );
};

const ConfirmEmailDialog = withDialog(ConfirmSignupEmail);

const ConfirmEmailPage = props => (
  <ConfirmEmailDialog onExited={props.history.goBack} {...props} />
);

export default withRouter(ConfirmEmailPage);
