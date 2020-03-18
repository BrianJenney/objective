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
    [theme.breakpoints.down('sm')]: {
      color: props.mobile.fontColor,
      fontWeight: props.mobile.fontWeight,
      fontSize: props.mobile.fontSize,
      lineHeight: props.mobile.lineHeight,
      fontFamily: props.mobile.fontFamily
    }
  })
}));

const Title = ({ data }) => {
  const title = data.filter(item => item.type === 'title')[0];
  const style = title.style;
  const classes = useStyles(style);

  return (
    <Box>
      <Typography className={classes.root}>{title.value}</Typography>
    </Box>
  );
};

export default Title;
