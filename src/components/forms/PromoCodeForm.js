import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Voucherify from 'voucherify.js';

import Grid from '@material-ui/core/Grid';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';

import { Button } from '../common';
// import { validatePromoCode } from '../../apis/Voucherify';
import { addCoupon } from '../../modules/cart/functions';
import { StyledPromoCode } from '../../pages/cart/StyledComponents';
import { InputField } from '../form-fields';
import './forms-styles.scss';
const schema = object().shape({
  promoCode: string()
});

const INITIAL_VALUES = {
  promoCode: ''
};

const PromoCodeForm = () => {
  const cart = useSelector(state => state.cart);
  const [promoCodeErr, setPromoCodeErr] = useState(null);
  const onSubmit = useCallback(
    async ( e, form ) => {
      Voucherify.validate(e.promoCode, function callback (response) { 
        window.analytics.track("Coupon Entered", {
          "cart_id": cart._id,
          "coupon_id": e.promoCode,
          "coupon_name": e.promoCode,
          "order_id": cart.accountId ? cart.accountId : ''
        });
        if (response.valid) {
          addCoupon(cart._id, response.code);
        } else {
          setPromoCodeErr(response.reason);
          window.analytics.track("Coupon Denied", {
            "cart_id": cart._id,
            "coupon_id": e.promoCode,
            "coupon_name": e.promoCode,
            "order_id": cart.accountId ? cart.accountId : '',
            "reason": response.reason
          });
        }
        form.setSubmitting(false);
      })
    },
    [promoCodeErr, setPromoCodeErr]
  );

  const renderForm = () => (
    <Form className="promo-code-form">
      <Grid container direction="row" xs={12} justify="space-between">
        <Grid item xs={12}>
          {promoCodeErr ? (
            <StyledPromoCode
              style={{
                'font-size': '12px',
                paddingBottom: '5px',
                color: 'red'
              }}
            >
              Promo Code
            </StyledPromoCode>
          ) : (
            <StyledPromoCode
              style={{ 'font-size': '12px', paddingBottom: '5px' }}
            >
              Promo Code
            </StyledPromoCode>
          )}
        </Grid>
        <Grid
          container
          xs={12}
          style={{ 'align-items': 'flex-start', height: '42px' }}
        >
          <Grid item xs={10}>
            {promoCodeErr ? (
              <Field
                name="promoCode"
                component={InputField}
                className="promo-code-input-error"
              />
            ) : (
              <Field
                name="promoCode"
                component={InputField}
                className="promo-code-input"
              />
            )}

            {promoCodeErr && (
              <StyledPromoCode
                style={{
                  'font-size': '11px',
                  'padding-top': '10px',
                  color: 'red'
                }}
              >
                {promoCodeErr}
              </StyledPromoCode>
            )}
          </Grid>

          <Grid item xs={2} style={{ 'text-align': 'right' }}>
            <Button
              type="submit"
              children="Apply"
              style={{
                color: '#000000',
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                minWidth: '0',
                fontWeight: 'normal',
                border: 'none',
                paddingTop: '10px'
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

export default PromoCodeForm;
