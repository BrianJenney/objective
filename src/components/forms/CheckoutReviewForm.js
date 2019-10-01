import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, NavLink } from '../common';

const CheckoutReviewForm = ({ onSubmit,xsBreakpoint }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    className="step-4-wrapper"
    style={xsBreakpoint ? {overflow:"hidden"} : {}}
  >
    {!xsBreakpoint ? (<Box
      component={Typography}
      my={3}
      variant="h5"
      fontFamily="Canela Text, serif"
      children="Please take a moment to review your order."
    />) : ''}
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
      <Typography variant="body2" style={{ fontSize: '14px' }}>
        By placing this order I agree to the
      </Typography>
      <Box
        component={NavLink}
        mx={1}
        to="/terms-conditions"
        underline="always"
        fontSize={14}
      >
        Terms &amp; Conditions
      </Box>
      <Typography variant="body2" style={{ fontSize: '14px' }}>
        and
      </Typography>
      <Box
        component={NavLink}
        mx={1}
        to="/privacy-policy"
        underline="always"
        fontSize={14}
      >
        Privacy Policy
      </Box>
    </Box>
  </Box>
);

CheckoutReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CheckoutReviewForm;
