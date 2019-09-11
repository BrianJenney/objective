import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Button } from '../common';
import { CheckoutReviewSummary } from '../summaries';

const CheckoutReviewForm = ({ summary, onBack, onSubmit }) => (
  <Box>
    <CheckoutReviewSummary summary={summary} />
    <Box display="flex" alignItems="center">
      <Button type="button" onClick={onBack} children="Back" mr={2} />
      <Button type="button" onClick={onSubmit} children="Place order" />
    </Box>
  </Box>
);

CheckoutReviewForm.propTypes = {
  summary: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CheckoutReviewForm;
