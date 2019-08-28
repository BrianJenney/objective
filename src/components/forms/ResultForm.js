import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import { Button } from '../common';

const ResultForm = ({ onSubmit }) => (
  <Paper>
    <Typography component="h1" variant="h4" align="center">
      Things
    </Typography>
    <Button type="button" onClick={onSubmit} children="OK" />
  </Paper>
);

ResultForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ResultForm;
