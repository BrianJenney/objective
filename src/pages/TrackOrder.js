import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { OrderTrackerForm } from '../components/forms';
import {
  requestFindOrdersByAccount,
  requestFindUnauthenticatedOrders,
  receivedGetOrder
} from '../modules/order/actions';
import { requestFetchAccount } from '../modules/account/actions';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.6)'
  },
  main: {
    padding: theme.spacing(10, 5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 0)
    }
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'rgba(252, 248, 244, 0.6)',
      padding: 0
    }
  },
  title: {
    fontSize: '55px',
    fontWeight: 'bold',
    marginTop: '30px',
    fontFamily: 'Canela Text Web',
    fontWeight: 'normal',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      fontSize: 40
    }
  },
  text: {
    fontSize: '20px',
    fontFamily: 'p22-underground, sans-serif',
    lineHeight: '1.2',
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  textFreight: {
    fontSize: 18
  },
  button: {
    margin: theme.spacing(3, 0, 4)
  },
  containingBox: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '20px',
      paddingBottom: '32px'
    },
    paddingTop: '52px',
    paddingBottom: '64px'
  },
  link: {
    color: '#000'
  }
}));

const TrackOrder = ({ history }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 300);
  }, []);
  return (
    <Box bgcolor="rgba(252, 248, 244, 0.5)">
      <Container>
        <CssBaseline />
        <Box className={classes.containingBox}>
          <Grid container spacing={2} justify={'center'}>
            <Grid item xs={xs ? 12 : 6}>
              <OrderTrackerForm
                title={'Track an order'}
                requestFindUnauthenticatedOrders={requestFindUnauthenticatedOrders}
                receivedGetOrder={receivedGetOrder}
                requestFetchAccount={requestFetchAccount}
                dispatch={dispatch}
                history={history}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default withRouter(TrackOrder);
