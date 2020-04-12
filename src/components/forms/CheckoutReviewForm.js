import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import HttpsOutlined from '@material-ui/icons/HttpsOutlined';
import { Button, NavLink } from '../common';
const CheckoutReviewForm = ({ onSubmit, xsBreakpoint }) => (
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
        fontFamily="Canela Text Web"
        children="Please take a moment to review your order."
      />
    ) : (
        ''
      )}
    <Box width={532} mb={2} className="button-holder-mobile">
      <Button
        type="button"
        onClick={onSubmit}
        children="Place order"
        size="large"
        startIcon={
          xsBreakpoint ? null : (
            <HttpsOutlined style={{ 'padding-bottom': '5px' }} />
          )
        }
        fullWidth
      />
    </Box>

    <Box
      display="block"
      alignItems="center"
      justifyContent="center"
      style={{ textAlign: 'center', margin: '0px auto', maxWidth: '430px' }}
    >
      <Box
        style={{ float: xsBreakpoint ? 'inherit' : 'left', display: 'block' }}
        display="flex"
      >
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
        target="_blank"
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
        <a
          style={{ fontSize: '11px', color: '#000000' }}
          href="/privacypolicy"
          target="_blank"
        >
          Privacy Policy
        </a>
      </Box>
    </Box>
  </Box>
);

CheckoutReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CheckoutReviewForm;
