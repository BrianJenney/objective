import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import './template-styles.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform,
    letterSpacing: '1.5px',
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
  //const subtitle = data.filter(item => item.type === 'subtitle')[0];
  //const style = subtitle;
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

export default Subtitle;
