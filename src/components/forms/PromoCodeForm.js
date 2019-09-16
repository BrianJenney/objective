import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button } from '../common';

import { redeemPromoCode } from '../../apis/Voucherify';
import { StyledSmallCaps, StyledFinePrint } from '../../pages/cart/StyledComponents';
import { InputField } from '../form-fields';

import { requestPatchCart } from "../../modules/cart/actions";

const schema = object().shape({
  promoCode: string().required('Promo Code is required')
});

const INITIAL_VALUES = {
  promoCode: ''
};

const PromoCodeForm = () => {
  const cart = useSelector(state => state.cart);

  const onSubmit = async e => {
    let response = await redeemPromoCode(e.promoCode);
    console.log(cart);
    console.log(response);
  };

  const renderForm = () => (
    <Form>
      <Grid container direction="row" xs={12} justify="space-between">
        <Grid item xs={12}>
          <StyledSmallCaps style={{ 'font-size': '14px' }}>
            Promo Code
          </StyledSmallCaps>
        </Grid>
        <Grid container xs={12} style={{ 'align-items': 'flex-start' }}>
          <Grid item xs={8}>
            <Field
              name="promoCode"
              component={InputField}
            />
          </Grid>
          <Grid item xs={4} style={{ 'text-align': 'right' }}>
            <Button type="submit" children="Apply" />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );

  const renderDiscount = () => {
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
            $XXX.xx
          </StyledSmallCaps>
        </Grid>
        <StyledFinePrint component="p">
          Promo Code
        </StyledFinePrint>
      </Grid>
    );
  };

  if (cart.voucher) {
    return renderDiscount();
  } else {
    return (
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={schema}
        render={renderForm}
      />
    );
  }
};

export default PromoCodeForm;