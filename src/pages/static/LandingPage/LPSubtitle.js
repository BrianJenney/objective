import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktop.fontColor,
    fontWeight: props.desktop.fontWeight,
    fontSize: props.desktop.fontSize,
    lineHeight: props.desktop.lineHeight,
    fontFamily: props.desktop.fontFamily,
    fontFamily: props.desktop.fontFamily,
    textTransform: props.desktop.textTransform,
    letterSpacing: '1.5px',
    margin: '0 0 45px',
    [theme.breakpoints.down('sm')]: {
      color: props.mobile.fontColor,
      fontWeight: props.mobile.fontWeight,
      fontSize: props.mobile.fontSize,
      lineHeight: props.mobile.lineHeight,
      fontFamily: props.mobile.fontFamily,
      textTransform: props.desktop.textTransform
    }
  })
}));

const LPTitle = ({ data }) => {
  const subtitle = data.filter(item => item.type === 'subtitle')[0];
  const style = subtitle.style;
  const classes = useStyles(style);

  return (
    <Box>
      <Typography className={classes.root}>{subtitle.value}</Typography>
    </Box>
  );
};

export default LPTitle;
