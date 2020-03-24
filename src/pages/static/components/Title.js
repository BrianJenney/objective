import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import '../template-styles.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    [theme.breakpoints.down('sm')]: {
      color: props.mobileStyle.fontColor,
      fontWeight: props.mobileStyle.fontWeight,
      fontSize: props.mobileStyle.fontSize,
      lineHeight: props.mobileStyle.lineHeight,
      fontFamily: props.mobileStyle.fontFamily
    }
  })
}));

const Title = ({ data, template, type }) => {
  const classes = useStyles(data);

  return (
    <>
      {template ? (
        <Box className={template}>
          <Typography className={`${classes.root} ${type}`}>{data.value}</Typography>
        </Box>
      ) : (
        <Box>
          <Typography className={classes.root}>{data.value}</Typography>
        </Box>
      )}
    </>
  );
};

export default Title;
