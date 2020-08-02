import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import HttpsOutlined from '@material-ui/icons/HttpsOutlined';
import { Button, NavLink } from '../common';
import Checkbox from '@material-ui/core/Checkbox';

const CheckoutReviewForm = ({ onSubmit, xsBreakpoint, accountJwt, payload, activeStep }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const handleChange = (event, payload) => {
    if (payload && payload.accountInfo) {
      payload.accountInfo.newsletter = event.target.checked;
      setCheckboxChecked(event.target.checked);
    }
  };

  useEffect(() => {
    if (
      checkboxChecked &&
      !accountJwt &&
      activeStep === 2 &&
      payload.hasOwnProperty('shippingAddress') &&
      payload.shippingAddress.hasOwnProperty('email') &&
      payload.shippingAddress.hasOwnProperty('firstName') &&
      payload.shippingAddress.hasOwnProperty('lastName')
    ) {
      window.analytics.track('Email Capture Completed', {
        email: payload.shippingAddress.email,
        site_location: 'checkout'
      });

      window.analytics.identify({
        first_name: payload.shippingAddress.firstName,
        last_name: payload.shippingAddress.lastName,
        email: payload.shippingAddress.email
      });
    }
  }, [activeStep]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      className="step-4-wrapper"
      style={xsBreakpoint ? { overflow: 'hidden', marginTop: '18px' } : {}}
    >
      {!xsBreakpoint ? (
        <Box
          component={Typography}
          my={3}
          variant="h5"
          children="Please take a moment to review your order."
          style={{ fontSize: '25px' }}
        />
      ) : (
        ''
      )}

      <Box
        display={!accountJwt ? 'flex' : 'none'}
        alignItems="center"
        style={{ marginBottom: '12px' }}
      >
        <Checkbox
          id="useAddressSeedToggle"
          size="small"
          color="default"
          checked={checkboxChecked}
          onChange={e => handleChange(e, payload)}
        />
        <Typography
          variant="body2"
          children={'Keep me updated with exclusive offers and new product launches'}
          style={{ color: '#231f20', fontSize: '16px' }}
        />
      </Box>

      <Box width={384} mb={2} className="button-holder-mobile">
        <Button
          type="button"
          onClick={onSubmit}
          children="Place order"
          size="large"
          startIcon={xsBreakpoint ? null : <HttpsOutlined style={{ 'padding-bottom': '5px' }} />}
          style={{ height: '55px', padding: '0px' }}
          fullWidth
        />
      </Box>

      <Box
        display="block"
        alignItems="center"
        justifyContent="center"
        style={{ textAlign: 'center', margin: '0px auto', maxWidth: '430px' }}
      >
        <Box style={{ float: xsBreakpoint ? 'inherit' : 'left', display: 'block' }} display="flex">
          <Typography variant="body2" style={{ fontSize: '11px' }}>
            By placing this order I agree to the
          </Typography>
        </Box>
        <Box
          component={NavLink}
          to="/terms"
          underline="always"
          fontSize={11}
          style={{
            width: 'auto',
            marginLeft: '3px',
            fontSize: '11px',
            float: 'left'
          }}
        >
          Terms &amp; Conditions
        </Box>
        <Typography variant="body2" style={{ fontSize: '11px', float: 'left' }}>
          &nbsp;and
        </Typography>
        <Box
          style={{
            marginBottom: '3px',
            marginLeft: '3px',
            float: 'left',
            display: 'block',
            position: 'relative',
            bottom: '3px'
          }}
        >
          <a style={{ fontSize: '11px', color: '#000000' }} href="/privacypolicy" target="_blank">
            Privacy Policy
          </a>
        </Box>
      </Box>
    </Box>
  );
};

CheckoutReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CheckoutReviewForm;
