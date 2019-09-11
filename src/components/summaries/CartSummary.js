import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {
  StyledCardContent,
  StyledDrawerGrid,
  StyledFinePrint, StyledProductLink,
  StyledSmallCaps,
  StyledTotalWrapper
} from "../../pages/cart/StyledComponents";

import {colorPalette} from '../Theme/color-palette';

const { MEDIUM_GRAY } = colorPalette;

const CartSummary = ({ cart }) => {
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5" align="center">
          Order Summary ({cart.items.length} items)
        </Typography>
      </Grid>
      { cart.items.map((item, index) => (
        <>
          <StyledDrawerGrid container xs={12} direction="row">
            <Grid
              item
              xs={4}
              style={{ 'min-width': '126px', 'margin-right': '18px' }}
            >
              <Card>
                <CardMedia
                  style={{ height: 126, width: 126 }}
                  image={item.variant_img}
                  title={item.variant_name}
                />
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Card
                style={{
                  display: 'flex',
                  'flex-direction': 'column',
                  height: '126px',
                  'justify-content': 'space-between'
                }}
              >
                <StyledProductLink align="left">
                  {item.variant_name}
                </StyledProductLink>
                <StyledProductLink align="left">
                  QTY: {item.quantity}
                </StyledProductLink>
                <StyledCardContent style={{ 'padding-bottom': '0' }}>
                  <StyledSmallCaps>
                    {(item.quantity * item.unit_price).toFixed(2)}
                  </StyledSmallCaps>
                </StyledCardContent>
              </Card>
            </Grid>
          </StyledDrawerGrid>
        </>
      ))}
      <Grid item xs={12} container>
        <StyledTotalWrapper
          container
          direction="row"
          xs={12}
          justify="left-start"
        >
          <Grid item xs={9}  style={{ 'text-align': 'left' }}>
            <StyledSmallCaps style={{ 'font-size': '14px' }}>
              Subtotal Total:
            </StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '18px' }}>
              {`$${cart.subtotal.toFixed(2)}`}
            </StyledSmallCaps>
          </Grid>
        </StyledTotalWrapper>
        <Grid
          container
          direction="row"
          xs={12}
          justify="left-start"
          style={{ margin: '20px 0' }}
        >
          <Grid item xs={9} style={{ 'text-align': 'left' }}>
            <StyledSmallCaps style={{ 'font-size': '14px' }}>
              Shipping
            </StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '18px' }}>
              $XXX.xx
            </StyledSmallCaps>
          </Grid>
          <StyledFinePrint component="p">
            Ground 3-5 Business Days
          </StyledFinePrint>
        </Grid>
        <Grid
          container
          direction="row"
          xs={12}
          justify="left-start"
          style={{ margin: '20px 0' }}
        >
          <Grid item xs={9}  style={{ 'text-align': 'left' }}>
            <StyledSmallCaps style={{ 'font-size': '14px' }}>
              Savings
            </StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '18px' }}>
              $XXX.xx
            </StyledSmallCaps>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          xs={12}
          justify="left-start"
          style={{ margin: '20px 0' }}
        >
          <Grid item xs={9}  style={{ 'text-align': 'left' }}>
            <StyledSmallCaps style={{ 'font-size': '14px' }}>
              Tax
            </StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '18px' }}>
              $XXX.xx
            </StyledSmallCaps>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          xs={12}
          justify="left-start"
          style={{ margin: '20px 0' }}
        >
          <Grid item xs={9} style={{ 'text-align': 'left' }}>
            <StyledSmallCaps style={{ 'font-size': '14px' }}>
              Enter Promo Code
            </StyledSmallCaps>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          xs={12}
          justify="left-start"
          style={{
            'margin-bottom': '0',
            'border-top': `solid 2px ${MEDIUM_GRAY}`,
            'padding-top': '29px',
            'margin-top': '50px'
          }}
        >
          <Grid item xs={9}  style={{ 'text-align': 'left' }}>
            <StyledSmallCaps>Total</StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '22px' }}>
              {`$${cart.total.toFixed(2)}`}
            </StyledSmallCaps>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
};

CartSummary.propTypes = {
  cart: PropTypes.object
};

export default CartSummary;


