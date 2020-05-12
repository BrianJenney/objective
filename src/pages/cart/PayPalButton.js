import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendPaypalCheckoutRequest } from '../../utils/braintree';
import { setCheckoutPaypalPayload } from '../../modules/paypal/actions';
import { withRouter } from 'react-router-dom';

const PayPalButton = ({ cart, buttonSelector, buttonWrapperStyle, history }) => {
  const dispatch = useDispatch();
  const [ppButtonRendered, setPpButtonRendered] = useState(false);
  const getPaypalBraintreeNonce = async () => {
    if (!cart) {
      return null;
    }
    const { total, shippingAddress } = cart;
    if (!cart || total === 0 || document.getElementById(buttonSelector) === null) {
      return null;
    }
    setPpButtonRendered(true);
    const paypalRequest = await sendPaypalCheckoutRequest(
      total,
      shippingAddress,
      {
        label: 'checkout',
        shape: 'rect',
        color: 'gold',
        height: 55,
        size: 'responsive',
        tagline: 'false'
      },
      `#${buttonSelector}`
    );

    dispatch(setCheckoutPaypalPayload(paypalRequest));
    history.push('/checkout/');
  };

  useEffect(() => {
    if (!ppButtonRendered && cart.cartDrawerOpened && cart && cart.total > 0) {
      getPaypalBraintreeNonce();
    }
  }, [cart.cartDrawerOpened]);

  useEffect(() => {
    if (ppButtonRendered && cart && cart.total > 0) {
      let paypalCheckoutButton = document.getElementById(buttonSelector);
      if (paypalCheckoutButton) {
        paypalCheckoutButton.innerHTML = '';
      }
      getPaypalBraintreeNonce();
    }
  }, [cart]);

  return <div id={buttonSelector} style={buttonWrapperStyle}></div>;
};

export default withRouter(PayPalButton);
