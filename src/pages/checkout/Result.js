import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';
import { Button } from '../../components/common';

const Result = ({ onSubmit }) => (
  <Paper>
    <Typography component="h1" variant="h4" align="center">
      Things
    </Typography>
    <Button type="button" onClick={onSubmit} children="OK" />
  </Paper>
);

Result.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Result;
