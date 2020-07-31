import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles';
import {
  StyledDrawerGrid,
  StyledFinePrint,
  StyledProductLink,
  StyledSmallCaps,
  StyledTotalWrapper
} from '../../pages/cart/StyledComponents';

import { displayMoney } from '../../utils/formatters';

import { colorPalette } from '../Theme/color-palette';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(5, 4),
    [theme.breakpoints.down('xs')]: {
      padding: '30px 15px'
    }
  },
  title: {
    fontSize: '30px',
    fontFamily: 'Canela Text Web',
    marginTop: '-13px',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
      fontFamily: 'freight-text-pro'
    }
  },
  text: {
    fontSize: '16px',
    fontFamily: 'p22-underground'
  },
  code: {
    fontSize: '14px',
    fontFamily: 'p22-underground',
    textTransform: 'uppercase'
  },
  total: {
    fontSize: '18px',
    fontFamily: 'p22-underground',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px'
    }
  }
}));
const { MEDIUM_GRAY } = colorPalette;

const CartSummary = ({ order }) => {
  const classes = useStyles();
  const { items, hideCouponCode } = order;
  let orderShippingMethod = null;

  if (order.shippingMethod) {
    orderShippingMethod = order.shippingMethod;
  } else {
    orderShippingMethod = order.shipping.options[order.shipping.code];
  }
  const promoCode = order.promo ? ` (${order.promo.code})` : '';

  // remove hidden items to ensure numberof items displays correctly
  // then separate visible items into customer added items and pip inserted items
  const visibleItems = items.filter(item => !item.isHidden);
  const promotionalItems = visibleItems.filter(item => item.pipInsertId);
  const regularItems = visibleItems.filter(item => !item.pipInsertId);
  return (
    <Box className={classes.paper}>
      <Grid container xs={12} direction="column">
        <Grid container xs={12}>
          <Grid item xs>
            <Typography className={classes.title}>Order Summary</Typography>
          </Grid>

          <Grid item>
            <StyledSmallCaps style={{ fontSize: '12px' }}>
              ({visibleItems.length} items)
            </StyledSmallCaps>
          </Grid>
        </Grid>
        {regularItems.map(item => (
          <>
            <StyledDrawerGrid container xs={12}>
              <Grid item xs={4} style={{ minWidth: '126px' }}>
                <Card>
                  <CardMedia
                    style={{ height: 100, width: 95 }}
                    image={item.variant_img}
                    title={item.variant_name}
                  />
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '126px',
                    justifyContent: 'space-between'
                  }}
                >
                  <StyledProductLink style={{ fontSize: '18px' }}>
                    {item.variant_name}
                  </StyledProductLink>
                  <Typography
                    className={classes.text}
                    style={{
                      fontFamily: 'p22-underground, sans-serif',
                      fontSize: '16px'
                    }}
                  >
                    QTY: {item.quantity}
                  </Typography>

                  <StyledSmallCaps align="right">
                    {displayMoney(item.quantity * item.unit_price)}
                  </StyledSmallCaps>
                </Card>
              </Grid>
            </StyledDrawerGrid>
          </>
        ))}
        {promotionalItems.map(item => (
          <>
            <StyledDrawerGrid container xs={12}>
              <Grid item xs={4} style={{ minWidth: '126px' }}>
                <Card>
                  <CardMedia
                    style={{ height: 100, width: 95 }}
                    image={item.variant_img}
                    title={item.variant_name}
                  />
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '126px',
                    justifyContent: 'space-between'
                  }}
                >
                  <StyledProductLink style={{ fontSize: '18px' }}>
                    {item.variant_name}
                  </StyledProductLink>
                  <StyledSmallCaps align="right" style={{ color: '#8bbc00' }}>
                    FREE
                  </StyledSmallCaps>
                </Card>
              </Grid>
            </StyledDrawerGrid>
          </>
        ))}
        <Grid xs={12} container>
          <StyledTotalWrapper container xs={12}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Subtotal <span>({visibleItems.length} items):</span>
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                {displayMoney(order.subtotal)}
              </StyledSmallCaps>
            </Grid>
          </StyledTotalWrapper>

          <Grid container xs={12} style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps>Shipping</StyledSmallCaps>
              <StyledFinePrint component="p" style={{ position: 'relative', top: '6px' }}>
                {orderShippingMethod.deliveryEstimate}
              </StyledFinePrint>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                {displayMoney(orderShippingMethod.price, true)}
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Savings{hideCouponCode ? '' : promoCode}
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                {displayMoney(order.discount)}
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid container style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>Tax</StyledSmallCaps>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                {displayMoney(order.tax)}
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            style={{
              borderTop: `solid 2px ${MEDIUM_GRAY}`,
              paddingTop: '30px',
              marginTop: '20px'
            }}
          >
            <Grid item xs>
              <StyledSmallCaps>Total</StyledSmallCaps>
            </Grid>
            <Grid item>
              <Typography className={classes.total}>{displayMoney(order.total)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

CartSummary.propTypes = {
  order: PropTypes.object
};

export default CartSummary;
