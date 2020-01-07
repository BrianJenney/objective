import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
        fullWidth
      />
    </Box>
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="body2" style={{ fontSize: '11px' }}>
        By placing this order I agree to the
      </Typography>
    </Box>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ width: '100%', margin: '0px auto', maxWidth: '430px' }}
    >
      <Box
        component={NavLink}
        to="/terms"
        underline="always"
        fontSize={11}
        mx={1}
        style={{ width: 'auto', marginRight: '3px', fontSize: '11px' }}
      >
        Terms &amp; Conditions
      </Box>
      <Typography variant="body2" style={{ fontSize: '11px' }}>
        &nbsp;and
      </Typography>
      <Box mx={1}>
        <a style={{ fontSize: '11px', color: '#000000' }}
          href="https://www.thecloroxcompany.com/privacy/"
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
