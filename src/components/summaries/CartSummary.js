import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    fontSize: '34px',
    fontFamily: theme.typography.headerFontFamily,
    color: theme.palette.brand.camoGreen,
    marginTop: '-13px',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px',
      fontFamily: theme.typography.headerFontFamily,
    }
  },
  text: {
    fontSize: '14px',
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen
  },
  code: {
    fontSize: '14px',
    fontFamily: theme.typography.bodyFontFamily,
    textTransform: 'uppercase'
  },
  total: {
    fontSize: '20px',
    fontFamily: theme.typography.bodyFontFamily,
    textTransform: 'uppercase',
    fontWeight: 700,
    color: theme.palette.brand.camoGreen
  },
  price: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 400,
    fontSize: '16px',
    color: theme.palette.brand.accentBrown,
    letterSpacing: '1px',
    marginLeft: '9px'
  },
}));

const CartSummary = ({ order }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { items, hideCouponCode } = order;
  let shippingMethod = null;

  if (order.shippingMethod) {
    shippingMethod = order.shippingMethod;
  } else {
    shippingMethod = order.shipping.options[order.shipping.code];
  }
  const promoCode = order.promo ? ` (${order.promo.code})` : '';
  return (
    <Box className={classes.paper}>
      <Grid container xs={12} direction="column">
        <Grid container xs={12}>
          <Grid item xs>
            <Typography className={classes.title}>Order Summary</Typography>
          </Grid>

          <Grid item>
            <StyledSmallCaps style={{ fontSize: '14px' }}>({items.length} items) </StyledSmallCaps>
          </Grid>
        </Grid>
        {items.map((item, index) => (
          <>
            <StyledDrawerGrid container xs={12} className="ListBox">
              <Grid item xs={4} style={{ minWidth: '126px' }}>
                <Card>
                  <CardMedia
                    style={{ height: 125, width: 120 }}
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
                    height: '126px'
                  }}
                >
                  <StyledProductLink style={{ fontSize: '18px' }}>
                    {item.variant_name}
                  </StyledProductLink>
                  <Typography className={classes.price} align="left">
                    {displayMoney(item.quantity * item.unit_price)}
                  </Typography>
                </Card>
              </Grid>
            </StyledDrawerGrid>
          </>
        ))}
        <Grid xs={12} container>
          <StyledTotalWrapper container xs={12}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Subtotal <span>({items.length} items):</span>
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <Typography className={classes.text}>
                {displayMoney(order.subtotal)}
              </Typography>
            </Grid>
          </StyledTotalWrapper>

          <Grid container xs={12} style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps>Shipping</StyledSmallCaps>
              <StyledFinePrint component="p" style={{ position: 'relative', top: '6px' }}>
                {shippingMethod.deliveryEstimate}
              </StyledFinePrint>
            </Grid>
            <Grid item>
              <Typography className={classes.text}>
                {displayMoney(shippingMethod.price, true)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Savings{hideCouponCode ? '' : promoCode}
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <Typography className={classes.text}>
                {displayMoney(order.discount)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>Tax</StyledSmallCaps>
            </Grid>
            <Grid item>
              <Typography className={classes.text}>
                {displayMoney(order.tax)}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            style={{
              borderTop: `solid 2px ${theme.palette.brand.camoGreen}`,
              paddingTop: '30px',
              marginTop: '20px'
            }}
          >
            <Grid item xs>
            <Typography className={classes.total}>Total</Typography>
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
  cart: PropTypes.object
};

export default CartSummary;
