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
  }
}));

const Image = ({ data, template, type, caption }) => {
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('xs'));
  const float = data.desktopStyle.float || data.mobileStyle.float;

  // Assigning <img> properties:
  let imgSrc = sm 
    ? data.mobileImg 
    : data.desktopImg;
  imgSrc += ResizeImage(template, data);

  // Desktop + caption has no class assigned to <img>:
  let imgClass = sm && caption 
    ? classes.captionImageMobile 
    : '';

  imgClass = caption 
    ? imgClass 
    : `${classes.root} ${template}-${type}-${float}`;
  // remove - Need to test that we didn't mess up assigned class in case of line 32 ^

  let image = <img src={imgSrc} className={imgClass} />;
  
  // Check if image should be wrapped with <Link />:
  if (data.URL) {
    image = (
      <Link to={data.URL} target="_blank">
        {image}
      </Link>
    )
  };

  // Check if image has a caption and construct:
  if (caption) {
    image = (
      <div className={`${template}-${type}-caption-${float}`}> 
        {image}
        <div className={classes.caption}>{caption.value}</div>
      </div>
    )
  };

  // ... in the end just return the constructed image object.
  return image;

  
  return (
    <div>
      {!sm ? (
        // desktop & caption
        caption ? (
          <div className={`${template}-${type}-caption-${float}`}>
            <img src={`${data.desktopImg}${ResizeImage(template, data)}`} />
            <div className={classes.caption}>{caption.value}</div>
          </div>
        ) : (
          // desktop no caption
          <img
            src={`${data.desktopImg}${ResizeImage(template, data)}`}
            className={`${classes.root} ${template}-${type}-${float}`}
          />
        )
        // mobile caption
      ) : caption ? (
        <div className={`${template}-${type}-caption-${float}`}>
          <img 
          src={`${data.mobileImg}${ResizeImage(template, data)}`} 
          className={classes.captionImageMobile} />
          <div className={classes.caption}>{caption.value}</div>
        </div>
      ) : (
        // mobile no caption
        <img
          src={`${data.mobileImg}${ResizeImage(template, data)}`}
          className={`${classes.root} ${template}-${type}-${float}`}
        />
      )}
    </div>
  );
};

export default Image;
