import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { withDialog } from '../../hoc';
import { AdapterLink, Button } from '../../components/common';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '36px',
    color: '#231f20',
    fontFamily: 'Canela Text',
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  subTitle: {
    fontSize: '18px',
    fontFamily: 'FreightTextProBook',
    paddingBottom: theme.spacing(3)
  }
}));

const ResetSuccess = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Your password has been reset
        </Typography>
        <Typography className={classes.subTitle}>
          Click below to return to the account login page
        </Typography>
        <Button fullWidth component={AdapterLink} to="/">
          Login to your account
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

const ResetSuccessPassword = withDialog(ResetSuccess);
const ResetSuccessPage = props => (
  <ResetSuccessPassword noClosingDialog {...props} />
);
export default ResetSuccessPage;
