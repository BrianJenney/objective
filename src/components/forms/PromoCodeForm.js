import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button, AlertPanel } from '../common';
import { redeemPromoCode } from '../../apis/Voucherify';
import { addCoupon } from '../../modules/cart/functions';
import {
  StyledPromoCode,
  StyledPromoCodeInput
} from '../../pages/cart/StyledComponents';
import { InputField } from '../form-fields';
import './forms-styles.scss';
const schema = object().shape({
  promoCode: string().required('Promo Code is required')
});

const INITIAL_VALUES = {
  promoCode: ''
};

const PromoCodeForm = () => {
  const cart = useSelector(state => state.cart);
  const [promoCodeErr, setPromoCodeErr] = useState(null);
  const onSubmit = useCallback(
    async e => {
      let response = await redeemPromoCode(e.promoCode);
      if (response.result == 'SUCCESS') {
        addCoupon(cart, response.voucher);
      } else {
        setPromoCodeErr(response.message);
      }
    },
    [promoCodeErr, setPromoCodeErr, redeemPromoCode]
  );

  const renderForm = () => (
    <>
      <Form className="promo-code-form">
        <Grid container direction="row" xs={12} justify="space-between">
          <Grid item xs={12}>
            <StyledPromoCode
              style={{ 'font-size': '14px', paddingBottom: '10px' }}
            >
              Promo Code
            </StyledPromoCode>
          </Grid>
          <Grid
            container
            xs={12}
            style={{ 'align-items': 'flex-start', height: '42px' }}
          >
            <Grid item xs={10}>
              <Field
                name="promoCode"
                component={InputField}
                className="promo-code-input"
              />
              {promoCodeErr && (
                <StyledPromoCode
                  style={{
                    'font-size': '14px',
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
      {/* {promoCodeErr && (
        <AlertPanel
          my={2}
          p={2}
          type="error"
          bgcolor="#ffcdd2"
          text={promoCodeErr}
          variant="subtitle2"
        />
      )} */}
    </>
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
