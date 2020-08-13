import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Typography, Box, CssBaseline, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';

const useStyles = makeStyles(theme => ({
  container: {
    width: 588,
    height: 334
  },
  title: {
    fontSize: '34px',
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.headerFontFamily,
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px'
    }
  },
  text: {
    fontSize: '16px',
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.darkSubTextGray,
    lineHeight: '24px',
    alignText: 'center',
    paddingBottom: theme.spacing(6)
  },
}));

const ConfirmPassword = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box component={Paper} pb={8} textAlign="center">
        <Typography className={classes.title}>We sent you an email</Typography>
        <Typography className={classes.text}>
          If your email exists in our system, you will receive a link to reset your password
          shortly.
        </Typography>
      </Box>
    </Container>
  );
};

const ConfirmPasswordDialog = withDialog(ConfirmPassword);

const ConfirmPasswordPage = props => (
  <ConfirmPasswordDialog onExited={props.history.goBack} {...props} />
);

ConfirmPasswordPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ConfirmPasswordPage);
