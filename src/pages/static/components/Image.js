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
  })
}));

const Image = ({ data, template, type }) => {
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const float = data.desktopStyle.float || data.mobileStyle.float;

  return (
    <div>
      {!sm ? (
        <img src={data.desktopImg} className={`${classes.root} ${template}-${type}-${float}`}></img>
      ) : (
        <img src={data.mobileImg} className={`${classes.root} ${template}-${type}-${float}`}></img>
      )}
    </div>
  );
};

export default Image;
