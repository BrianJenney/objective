import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.fontColor,
    fontWeight: props.fontWeight,
    fontSize: props.fontSize,
    lineHeight: props.lineHeight,
    fontFamily: props.fontFamily,
    textTransform: props.textTransform
  })
}));

const BoxTitle = ({ data }) => {
  const boxTitle = data.value.components.filter(item => item.type === 'boxTitle')[0];
  const style = boxTitle.style;
  const classes = useStyles(style);

  return (
    <div>
      <Typography className={classes.root}>{boxTitle.value}</Typography>
    </div>
  );
};

export default BoxTitle;
