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
import withDialog from '../../hoc/withDialog';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  }
}));

const ConfirmPassword = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={8} textAlign="center">
        <Typography className={classes.title}>
          We have sent you an email
        </Typography>
        <Typography variant="body1">
          If you email exists in our system you will receive a link to reset
          your password shortly.
        </Typography>
      </Box>
    </Container>
  );
};

const ConfirmPasswordDialog = withDialog(ConfirmPassword);

const ConfirmPasswordPage = (props) => <ConfirmPasswordDialog onExited={props.history.goBack} {...props} />;

export default withRouter(ConfirmPasswordPage);
