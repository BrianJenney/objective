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
  caption: props => ({
    width: props.desktopStyle.width ? props.desktopStyle.width + 'px' : 320,
    [theme.breakpoints.down('xs')]: {
      width: props.mobileStyle.width ? props.mobileStyle.width + 'px' : 164,
    }
  })
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
          <div className={`${template}-${type}-caption-${float} ${classes.caption}`}>
            <img src={`${data.desktopImg}${ResizeImage(template, data)}`} />
            <div>{caption.value}</div>
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
          <div>{caption.value}</div>
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
