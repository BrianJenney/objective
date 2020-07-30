import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { MenuLink } from '../../components/common';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { StyledArrowIcon } from '../cart/StyledComponents';
import {
  StyledSmallCaps,
  StyledFinePrint,
  StyledProductLink,
  StyledCounterButton,
  StyledCardActions,
  StyledCardContent,
  StyledDrawerGrid,
  StyledProductPrice,
  StyledRemoveLink
} from '../cart/StyledComponents.js';
import { displayMoney } from '../../utils/formatters';

import { requestFindOrdersByAccount } from '../../modules/order/actions';
import {
  formatCurrency,
  formatDateTime,
  getTracking,
  getShippingAndTracking
} from '../../utils/misc';
import ScrollToTop from '../../components/common/ScrollToTop';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: 25,
    marginBottom: 20,
    color: theme.palette.brand.camoGreen
  },
  statusTitle: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 700,
    letterSpacing: '1px',
    fontSize: '14px',
    color: theme.palette.brand.camoGreen
  },
  productTitle: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 700,
    fontSize: '18px',
    color: theme.palette.brand.camoGreen,
    lineHeight: '22.5px',
    marginLeft: '0px'
  },
  price: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 400,
    fontSize: '16px',
    color: theme.palette.brand.accentBrown,
    letterSpacing: '1px',
    marginTop: '-20px'
  },
  info: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 400,
    letterSpacing: '1px',
    fontSize: '14px',
    color: '#231f20',
    marginTop: '-5px'
  },
  link: {
    display: 'block',
    color: theme.palette.brand.accentBrown,
    fontWeight: 400
  },
  topGrid: {
    marginTop: '20px',
    borderTop: `1px solid ${theme.palette.brand.camoGreen}`,
    borderBottom: `1px solid ${theme.palette.brand.camoGreen}`
  },
  otherGrid: {
    borderBottom: `1px solid ${theme.palette.brand.camoGreen}`
  },
  leftBox: {
    float: 'left'
  },
  rightBox: {
    float: 'right'
  }
}));

const AccountOrders = ({ currentUser: { data }, location }) => {
  const dispatch = useDispatch();
  // const { state } = location;
  const order = useSelector(state => state.order.order);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    if (!data.orders) {
      dispatch(requestFindOrdersByAccount(data.account_jwt));
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, data.orders]);

  useEffect(() => {
    window.analytics.page('Account Orders');
  }, []);

  for (const key in data.orders) {
    const { statusStepper } = getShippingAndTracking(data.orders[key]);
    if (statusStepper.status === 'delivered') {
      data.orders[key].status = 'delivered';
    }
    if (order && data.orders[key]._id === order._id) {
      data.orders[key].status = order.status;
    }
    if (data.orders[key].status === 'canceled') {
      data.orders[key].status = 'Order Cancelled';
    }
  }

  const renderOrders = () => {
    if (!data.orders) {
      return null;
    }

    console.log('DATAAAA', data.orders);

    return data.orders.map((d, dataIndex, rowIndex) => {
      return (
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          className={dataIndex === 0 ? classes.topGrid : classes.otherGrid}
        >
          <Box component="div" m={1} className={classes.leftBox}>
            <Typography className={classes.statusTitle}>ORDER ID</Typography>
            <MenuLink
              to={`/orders/${data.orders[dataIndex]._id}`}
              className={classes.link}
              underline="always"
            >
              {data.orders[dataIndex].orderNumber}
            </MenuLink>
            <Typography className={classes.statusTitle}>ORDER DATE</Typography>
            <Typography className={classes.info}>
              {formatDateTime(data.orders[dataIndex].createdAt, false)}
            </Typography>

            <Typography className={classes.statusTitle}>STATUS</Typography>
            <Typography className={classes.info}>
              {data.orders[dataIndex].status.charAt(0).toUpperCase() +
                data.orders[dataIndex].status.slice(1)}
            </Typography>
            {data.orders[dataIndex].shipTracking ? (
              <>
              <Typography className={classes.statusTitle}>TRACKING INFORMATON</Typography>
            <MenuLink
              to={`/transactions/${data.orders[dataIndex]._id}`}
              className={classes.link}
              underline="always"
            >
              {data.orders[dataIndex].shipTracking}
            </MenuLink>
              </>
            ) : null }
            
          </Box>
          <Box component="div" m={1} className={classes.rightBox}>
            {data.orders[dataIndex].items.map(item => {
              return (
                <StyledDrawerGrid
                  container
                  direction="row"
                  key={`cart-${dataIndex}`}
                  className="CartListBox"
                >
                  <Grid
                    item
                    xs={4}
                    style={
                      !xs
                        ? { minWidth: '126px', marginRight: '25px' }
                        : { minWidth: '126px', marginRight: '18px' }
                    }
                  >
                    <Card>
                      <Link to={`/products/${item.slug}`}>
                        <CardMedia
                          style={{ height: 135, width: 130 }}
                          image={item.variant_img}
                          title={item.variant_name}
                        />
                      </Link>
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Card
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 130,
                        justifyContent: 'space-between'
                      }}
                    >
                      <StyledProductLink className={classes.productTitle} align="left">
                        {item.variant_name}
                      </StyledProductLink>
                      <Typography className={classes.price}>
                        {displayMoney(item.quantity * item.unit_price)}
                      </Typography>
                      <MenuLink
                        to={`/orders/${data.orders[dataIndex]._id}`}
                        className={classes.link}
                        underline="always"
                        style={{ marginBottom: '10px' }}
                      >
                        <span>Trace Product</span>
                        <StyledArrowIcon style={{ marginLeft: '10px' }}>
                          <ArrowForwardIcon style={{ color: '#a06958' }} />
                        </StyledArrowIcon>
                      </MenuLink>
                    </Card>
                  </Grid>
                </StyledDrawerGrid>
              );
            })}
          </Box>
        </Grid>
      );
    });
  };

  return (
    <ScrollToTop>
      <Grid container direction="column" spacing={3}>
        {!xs ? <Typography className={classes.title}>Your Orders</Typography> : null}

        <>{renderOrders()}</>
      </Grid>
    </ScrollToTop>
  );
};

export default AccountOrders;
