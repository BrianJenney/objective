import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ResizeImage } from '../../../utils/sputils';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    float: props.desktopStyle.float,
    [theme.breakpoints.down('xs')]: {
      float: props.mobileStyle.float,
      width: props.mobileStyle.width
    }
  }),
  captionImageMobile: {
    width: '100%',
    marginBottom: 10
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
          <div className={`${template}-${type}-caption-${float}`}>
            <img src={`${data.desktopImg}${ResizeImage(template, data)}`} />
            <div className={classes.caption}>{caption.value}</div>
          </div>
        ) : (
          <img
            src={`${data.desktopImg}${ResizeImage(template, data)}`}
            className={`${classes.root} ${template}-${type}-${float}`}
          ></img>
        )
      ) : caption ? (
        <div className={`${template}-${type}-caption-${float}`}>
          <img src={data.mobileImg} className={classes.captionImageMobile} />
          <div className={classes.caption}>{caption.value}</div>
        </div>
      ) : (
        <img src={data.mobileImg} className={`${classes.root} ${template}-${type}-${float}`}></img>
      )}
    </div>
  );
};

export default Image;
