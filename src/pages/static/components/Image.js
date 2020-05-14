import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ResizeImage } from '../../../utils/sputils';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    float: props.desktopStyle.float,
    [theme.breakpoints.down('xs')]: {
      float: props.mobileStyle.float
    }
  }),
  captionImageMobile: {
    width: '100%'
  },
  container: props => ({
    width: props.desktopStyle.width ? props.desktopStyle.width + 'px' : 320,
    [theme.breakpoints.down('xs')]: {
      width: props.mobileStyle.width ? props.mobileStyle.width + 'px' : 164,
    }
  }),
   caption: props => {
     if (props.caption) {
       return {
       color: props.caption.desktopStyle.fontColor,
       fontWeight: props.caption.desktopStyle.fontWeight,
       fontSize: props.caption.desktopStyle.fontSize,
       lineHeight: props.caption.desktopStyle.lineHeight,
       fontFamily: props.caption.desktopStyle.fontFamily,
       textTransform: props.caption.desktopStyle.textTransform
      }}
     },
     mobileCaption: props => {
      if (props.caption) {
        return {
        color: props.caption.mobileStyle.fontColor,
        fontWeight: props.caption.mobileStyle.fontWeight,
        fontSize: props.caption.mobileStyle.fontSize,
        lineHeight: props.caption.mobileStyle.lineHeight,
        fontFamily: props.caption.mobileStyle.fontFamily,
        textTransform: props.caption.mobileStyle.textTransform
       }}
      }
}));

const Image = ({ data, template, type, caption }) => {
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('xs'));
  const float = data.desktopStyle.float || data.mobileStyle.float;

  return (
    <div>
      {!sm ? (
        caption ? (
          <div className={`${template}-${type}-caption-${float} ${classes.container}`}>
            <img src={`${data.desktopImg}${ResizeImage(template, data)}`} />
            <div className={classes.caption}>{caption.value}</div>
          </div>
        ) : (
          <img
            src={`${data.desktopImg}${ResizeImage(template, data)}`}
            className={`${classes.root} ${template}-${type}-${float}`}
          />
        )
      ) : caption ? (
        <div className={`${template}-${type}-caption-${float} ${classes.caption}`}>
          <img src={`${data.mobileImg}${ResizeImage(template, data)}`} className={classes.captionImageMobile} />
          <div className={classes.mobileCaption}>{caption.value}</div>
        </div>
      ) : (
        <img
          src={`${data.mobileImg}${ResizeImage(template, data)}`}
          className={`${classes.root} ${template}-${type}-${float}`}
        />
      )}
    </div>
  );
};

export default Image;
