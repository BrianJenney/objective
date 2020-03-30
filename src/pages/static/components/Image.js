import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    float: props.desktopStyle.float,
    [theme.breakpoints.down('sm')]: {
      float: props.mobileStyle.float,
      width: props.mobileStyle.width
    }
  }),
  captionImage: {
    marginBottom: 10
  }
}));

const Image = ({ data, template, type, caption }) => {
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const float = data.desktopStyle.float || data.mobileStyle.float;
  console.log(caption);
  return (
    <div>
      {!sm ? (
        caption ? (
          <div className={`${template}-${type}-caption-${float}`}>
            <img src={data.desktopImg} className={classes.captionImage} />
            <div className={classes.caption}>{caption.value}</div>
          </div>
        ) : (
          <img src={data.desktopImg} className={`${classes.root} ${template}-${type}-${float}`}></img>
        )
      ) : (
        <img src={data.mobileImg} className={`${classes.root} ${template}-${type}-${float}`}></img>
      )}
    </div>
  );
};

export default Image;
