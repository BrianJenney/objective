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
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.headerFontFamily,
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '25px'
    }
  },
  subTitle: {
    fontSize: '16px',
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.darkSubTextGray,
    lineHeight: '24px',
    alignText: 'center',
    paddingBottom: theme.spacing(6)
  },
}));

const localStorageClient = require('store');
localStorageClient.remove('token');

const ResetSuccess = ({ history, location }) => {
  const classes = useStyles();

  const handleClick = () => {
    history.replace('/login');
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          {location.state ? 'Your password has been set' : 'Your password has been reset'}
        </Typography>
        <Typography className={classes.subTitle}>
          Click below to return to the account login page
        </Typography>
        <Button fullWidth onClick={handleClick} padding="0 53px 20px 53px">
          Login to your account
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

const ResetSuccessPassword = withDialog(ResetSuccess);
const ResetSuccessPage = props => <ResetSuccessPassword noClosingDialog {...props} />;
export default ResetSuccessPage;
