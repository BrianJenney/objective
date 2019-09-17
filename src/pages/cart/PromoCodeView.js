import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { removeCoupon } from '../../modules/cart/functions';
import { StyledSmallCaps, StyledFinePrint } from '../../pages/cart/StyledComponents';
import { colorPalette } from '../../components/Theme/color-palette';

const { LIGHT_GRAY } = colorPalette;

const PromoCodeView = () => {
  const cart = useSelector(state => state.cart);

  return (
    <Grid
      container
      direction="row"
      xs={12}
      justify="space-between"
      style={{ margin: '0 0 20px 0' }}
    >
      <Grid item xs={6}>
        <StyledSmallCaps style={{ 'font-size': '14px' }}>
          Discount
        </StyledSmallCaps>
      </Grid>
      <Grid item xs={6} style={{ 'text-align': 'right' }}>
        <StyledSmallCaps style={{ 'font-size': '18px' }}>
          {`$${cart.discount.toFixed(2)}`}
        </StyledSmallCaps>
      </Grid>
      <StyledFinePrint component="p">
        {cart.promo.code}<br />
        <Link
          onClick={e => removeCoupon(cart)}
          style={{
            'text-transform': 'uppercase',
            color: LIGHT_GRAY
          }}
        >
          Remove
        </Link>
      </StyledFinePrint>
    </Grid>
  );
};

export default PromoCodeView;
