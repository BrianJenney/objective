import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';
import {
  StyledDrawerGrid,
  StyledFinePrint,
  StyledProductLink,
  StyledSmallCaps,
  StyledTotalWrapper
} from '../../pages/cart/StyledComponents';

import { calculateCartTotals } from '../../modules/cart/functions';

import { colorPalette } from '../Theme/color-palette';
import { makeStyles } from '@material-ui/core/styles';

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
    fontFamily: 'Canela Text',
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

const CartSummary = ({ cart }) => {
  const classes = useStyles();
  const totalSummary = calculateCartTotals(cart);
  return (
    <Box className={classes.paper}>
      <Grid container xs={12} direction="column">
        <Grid container xs={12}>
          <Grid item xs>
            <Typography className={classes.title}>Order Summary </Typography>
          </Grid>

          <Grid item>
            <StyledSmallCaps style={{ fontSize: '12px' }}>
              ({cart.items.length} items){' '}
            </StyledSmallCaps>
          </Grid>
        </Grid>
        {cart.items.map((item, index) => (
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
                    ${(item.quantity * item.unit_price).toFixed(2)}
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
                Subtotal <span>({cart.items.length} items):</span>
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                {`$${totalSummary.subtotal.toFixed(2)}`}
              </StyledSmallCaps>
            </Grid>
          </StyledTotalWrapper>

          <Grid container xs={12} style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps>Shipping</StyledSmallCaps>
              <StyledFinePrint
                component="p"
                style={{ position: 'relative', top: '6px' }}
              >
                Ground 3-5 Business Days
              </StyledFinePrint>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                $XXX.xx
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Savings
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                $XXX.xx
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid container style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Tax
              </StyledSmallCaps>
            </Grid>
            <Grid item>
              <StyledSmallCaps style={{ fontSize: '18px' }}>
                {`$${
                  totalSummary.calculatedTax
                    ? totalSummary.calculatedTax.toFixed(2)
                    : 'XXX'
                }`}
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Link component="button" underline="always">
              <Typography className={classes.code}>Enter Promo Code</Typography>
            </Link>
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
              <Typography className={classes.total}>
                {`$${totalSummary.total.toFixed(2)}`}
              </Typography>
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
