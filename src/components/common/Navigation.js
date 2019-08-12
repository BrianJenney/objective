import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fab } from '@material-ui/core';
import { ArrowForward, ArrowBack } from '@material-ui/icons';

const ArrowButton = ({ icon, ...rest }) => (
  <Box {...rest}>
    <Fab variant="round">{icon}</Fab>
  </Box>
);

ArrowButton.propTypes = {
  icon: PropTypes.node.isRequired
};

export const ArrowLeft = props => (
  <ArrowButton icon={<ArrowBack />} left={20} {...props} />
);

export const ArrowRight = props => (
  <ArrowButton icon={<ArrowForward />} right={20} {...props} />
);
