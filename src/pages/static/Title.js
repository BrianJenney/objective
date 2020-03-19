import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

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

const Title = ({ data }) => {
  const title = data.filter(item => item.type === 'title')[0];
  const style = title;
  const classes = useStyles(style);

  return (
    <Box>
      <Typography className={classes.root}>{title.value}</Typography>
    </Box>
  );
};

export default Title;
