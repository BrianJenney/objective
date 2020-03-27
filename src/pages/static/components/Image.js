import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.scss';

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
  //const image = data.value.components.filter(item => item.type === 'image')[0];
  //const style = image;
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const float = data.desktopStyle.float && data.mobileStyle.float;

  return (
    <>
      {template ? (
        <div className={template}>
          {!sm ? (
            <img src={data.desktopImg} className={`${classes.root} ${type}-${float}`}></img>
          ) : (
            <img src={data.mobileImg} className={`${classes.root} ${type}-${float}`}></img>
          )}
        </div>
      ) : (
        <div>
          {!sm ? (
            <img src={data.desktopImg} className={classes.root}></img>
          ) : (
            <img src={data.mobileImg} className={classes.root}></img>
          )}
        </div>
      )}
    </>
  );
};

export default Image;