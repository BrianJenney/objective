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

import { colorPalette } from '../Theme/color-palette';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(5, 4)
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginTop: '-13px',
    marginBottom: '20px'
  }
}));
const { MEDIUM_GRAY } = colorPalette;

const CartSummary = ({ cart }) => {
  const classes = useStyles();
  return (
    <Box className={classes.paper}>
      <Grid container xs={12} direction="column">
        <Grid container xs={12}>
          <Grid item xs>
            <Typography className={classes.title}>Order Summary </Typography>
          </Grid>

          <Grid item>
            <StyledSmallCaps>({cart.items.length} items) </StyledSmallCaps>
          </Grid>
        </Grid>
        {cart.items.map((item, index) => (
          <>
            <StyledDrawerGrid container xs={12}>
              <Grid
                item
                xs={4}
                style={{ minWidth: '126px', marginRight: '18px' }}
              >
                <Card>
                  <CardMedia
                    style={{ height: 126, width: 126 }}
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
                  <StyledProductLink>{item.variant_name}</StyledProductLink>
                  <StyledProductLink>QTY: {item.quantity}</StyledProductLink>

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
                {`$${cart.subtotal.toFixed(2)}`}
              </StyledSmallCaps>
            </Grid>
          </StyledTotalWrapper>

          <Grid container xs={12} style={{ margin: '15px 0' }}>
            <Grid item xs>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Shipping
              </StyledSmallCaps>
              <StyledFinePrint component="p">
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
                $XXX.xx
              </StyledSmallCaps>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Link component="button" underline="always">
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Enter Promo Code
              </StyledSmallCaps>
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
              <StyledSmallCaps style={{ fontSize: '22px' }}>
                {`$${cart.total.toFixed(2)}`}
              </StyledSmallCaps>
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
