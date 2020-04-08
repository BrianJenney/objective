import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    float: props.desktopStyle.float,
    [theme.breakpoints.down('xs')]: {
      float: props.mobileStyle.float,
      width: props.mobileStyle.width
    }
  }),
  captionImage: {
    maxWidth: 230
  },
  captionImageMobile: {
    width: '100%',
    marginBottom: 5
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
            <img src={data.desktopImg} className={`${classes.captionImage} ${template}-${type}-caption`} />
            <div className={classes.caption}>{caption.value}</div>
          </div>
        ) : (
          <img
            src={data.desktopImg}
            className={`${classes.root} ${template}-${type} ${template}-${type}-${float}`}
          ></img>
        )
      ) : caption ? (
        <div className={`${template}-${type}-caption-${float}`}>
          <img src={data.mobileImg} className={classes.captionImageMobile} />
          <div className={classes.caption}>{caption.value}</div>
        </div>
      ) : (
        <img src={data.mobileImg} className={`${classes.root} ${template}-${type} ${template}-${type}-${float}`}></img>
      )}
    </div>
  );
};

export default Image;
