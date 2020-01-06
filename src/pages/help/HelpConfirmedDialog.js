import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import withDialog from '../../hoc/withDialog';
import { Button } from '../../components/common';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '36px',
    fontFamily: 'Canela Text Web',
    lineHeight: 'normal',
    paddingBottom: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
      paddingBottom: '8px',
      paddingTop: '20px'
    }
  },
  subTitle: {
    fontSize: '20px',
    fontFamily: 'FreightTextProBook',
    lineHeight: '1.5',

    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      lineHeight: '1.43'
    }
  },
}));

const ConfirmHelp = ({ history, closeDialog }) => {
  const ContinueShopping = useCallback(() => {
     closeDialog();
     history.replace('/gallery');
  },[history, closeDialog]);

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container xs={12} direction="row" justify="center" align="center">
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Thank you!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.subTitle}>
            We will get back to you as soon as possible!
          </Typography>
        </Grid>
        <Grid item xs={12}><br/></Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            children="Continue shopping"
            className="create-account-btn"
            onClick={ContinueShopping}
          />
        </Grid>
        <Grid item xs={12}><br/><br/></Grid>
      </Grid>
    </Container>
  );
};

const HelpConfirmedDialog = withDialog(ConfirmHelp);

export default withRouter(HelpConfirmedDialog);
