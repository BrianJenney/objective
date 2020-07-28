import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import { OrderTrackerForm } from '../components/forms';
import { requestFindUnauthenticatedOrders, receivedGetOrder } from '../modules/order/actions';
import { requestFetchAccount, receivedFetchAccountSuccess } from '../modules/account/actions';

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
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 300);
  }, []);
  return (
    <Box bgcolor="#f6f5f1">
      <Container>
        <CssBaseline />
        <Box className={classes.containingBox}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={6} md={4}>
              <OrderTrackerForm
                title="Track an order"
                requestFindUnauthenticatedOrders={requestFindUnauthenticatedOrders}
                receivedGetOrder={receivedGetOrder}
                requestFetchAccount={requestFetchAccount}
                receivedFetchAccountSuccess={receivedFetchAccountSuccess}
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

TrackOrder.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(TrackOrder);
