import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import './template-styles.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.desktopStyle.backgroundColor,
    '&:hover': {
      backgroundColor: props.desktopStyle.backgroundColor
    },
    display: props.desktopStyle.display,
    float: props.desktopStyle.float,
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform,
    width: props.desktopStyle.width,
    height: props.desktopStyle.height,
    letterSpacing: 1.33,
    [theme.breakpoints.down('sm')]: {
      display: props.mobileStyle.display,
      width: props.mobileStyle.width
    }
  })
}));

const SPButton = ({ data, template, type }) => {
  const classes = useStyles(data);

  return (
    <>
      {template ? (
        <div className={template}>
          <Button className={`${classes.root}`}>{data.value}</Button>
        </div>
      ) : (
        <div>
          <Button className={classes.root}>{data.value}</Button>
        </div>
      )}
    </>
  );
};

export default SPButton;
