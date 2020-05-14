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
  container: props => {
    let styles = {
      width: props.desktopStyle.width ? props.desktopStyle.width + 'px' : 320,
      textAlign: props.caption ? props.caption.desktopStyle.float : 'left',
      [theme.breakpoints.down('xs')]: {
        width: props.mobileStyle.width ? props.mobileStyle.width + 'px' : 164,
        textAlign: props.caption ? props.caption.desktopStyle.float : 'left'
      }
    };
    return styles;
  },
  caption: props => {
    let styles = {};
    if (props.caption) {
      styles = {
        color: props.caption.desktopStyle.fontColor,
        fontWeight: props.caption.desktopStyle.fontWeight,
        fontSize: props.caption.desktopStyle.fontSize,
        lineHeight: props.caption.desktopStyle.lineHeight,
        fontFamily: props.caption.desktopStyle.fontFamily,
        textTransform: props.caption.desktopStyle.textTransform,
        wordWrap: props.caption.desktopStyle.wordWrap === false ? 'initial' : 'initial'
      };
    }
    return styles;
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
          caption.desktopStyle.url ? (
            <div className={`${template}-${type}-caption-${float} ${classes.container}`}>
              <img src={`${data.desktopImg}${ResizeImage(template, data)}`} />
              <a className={classes.caption} href={caption.desktopStyle.url}>{caption.value}</a>
            </div>
          ) : (
            <div className={`${template}-${type}-caption-${float} ${classes.container}`}>
              <img src={`${data.desktopImg}${ResizeImage(template, data)}`} />
              <div className={classes.caption}>{caption.value}</div>
            </div>
          )
        ) : (
          <img
            src={`${data.desktopImg}${ResizeImage(template, data)}`}
            className={`${classes.root} ${template}-${type}-${float}`}
          />
        )
      ) : caption ? (
        <div className={`${template}-${type}-caption-${float} ${classes.container}`}>
          <img src={`${data.mobileImg}${ResizeImage(template, data)}`} className={classes.captionImageMobile} />
          <div className={classes.caption}>{caption.value}</div>
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
