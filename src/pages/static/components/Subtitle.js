import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform,
    [theme.breakpoints.down('sm')]: {
      color: props.mobileStyle.fontColor,
      fontWeight: props.mobileStyle.fontWeight,
      fontSize: props.mobileStyle.fontSize,
      lineHeight: props.mobileStyle.lineHeight,
      fontFamily: props.mobileStyle.fontFamily,
      textTransform: props.mobileStyle.textTransform
    }
  })
}));

const Subtitle = ({ data, template, type }) => {
  const classes = useStyles(data);

  return (
    <Box className={template}>
      <div className={`${classes.root} ${template}-${type}`}>{data.value}</div>
    </Box>
  );
};

export default Subtitle;
