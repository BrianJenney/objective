import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';

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
