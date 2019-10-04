import React from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import withDialog from '../../hoc/withDialog';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '36px',
    fontFamily: 'Canela Text',
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
  bigAvatar: {
    width: 111,
    height: 129,
    margin: '14px 0'
  },
  name: {
    color: '#003732',
    fontSize: '30px',
    fontFamily: 'Canela Text',
    paddingBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
      paddingBottom: '16px'
    }
  },
  test: {
    border: 'red 2px solid',
    [theme.breakpoints.down('xs')]: {

    }
  }
}));

const ConfirmEmail = ({ product_img, product_name }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container xs={12} direction="row" justify="center" align="center">
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Perfect, email confirmed!
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography className={classes.subTitle}>
            Thanks for reaching out! We’ll get in touch with you when we have
            this available again.
          </Typography>
          <CardMedia image={product_img} className={classes.bigAvatar} />
          <Typography className={classes.name}>{product_name}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const EmailConfirmedDialog = withDialog(ConfirmEmail);

const EmailConfirmedPage = props => (
  <EmailConfirmedDialog onExited={props.history.goBack} {...props} />
);

export default withRouter(EmailConfirmedPage);
