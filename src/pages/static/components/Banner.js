import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    textAlign: props.desktopStyle.align,
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform
  })
}));

const Banner = ({ data, template, type, borderPlacement }) => {
  const classes = useStyles(data);
  const border = data.desktopStyle.border;
  const borderColor = data.desktopStyle.borderColor;

  return border ? (
    <Box className={`${template}-${type}-${borderPlacement}`} style={{ borderColor: `${borderColor}` }}>
      <Typography className={`${classes.root} ${template}-${type}`}>{data.value}</Typography>
    </Box>
  ) : (
    <Box>
      <Typography className={classes.root}>{data.value}</Typography>
    </Box>
  );
};

export default Banner;
