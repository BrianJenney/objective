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

const ErrorFeedback = props => {
  const classes = useStyles();
  console.log('error feedback props', props);
  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography className={classes.subTitle}>{props.err}</Typography>
        <Button fullWidth component={AdapterLink} to="/account/profile">
          OK
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

const SuccessFeedback = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Your profile has been updated.
        </Typography>
        <Typography className={classes.subTitle}>
          Click below to return to your account.
        </Typography>
        <Button fullWidth component={AdapterLink} to="/account/overview">
          OK
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

const UpdateFeedback = props => {
  const error = props.err;
  console.log('update feedback error', props.error);

  if (error) {
    return <ErrorFeedback err={props.err} />;
  }
  return <SuccessFeedback />;
};

const ProfileUpdateFeedback = withDialog(UpdateFeedback);
const ProfileUpdateFeedbackPage = props => (
  <ProfileUpdateFeedback noClosingDialog {...props} />
);
export default ProfileUpdateFeedbackPage;
