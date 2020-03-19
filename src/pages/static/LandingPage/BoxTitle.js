import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform
  })
}));

const BoxTitle = ({ data }) => {
  const boxTitle = data.components.filter(item => item.type === 'boxTitle')[0];
  const style = boxTitle;
  const classes = useStyles(style);

  return (
    <div>
      <Typography className={classes.root}>{boxTitle.value}</Typography>
    </div>
  );
};

export default BoxTitle;
