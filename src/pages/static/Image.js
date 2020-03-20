import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: props => ({
    float: props.desktopStyle.float,
    [theme.breakpoints.down('sm')]: {
      float: props.mobileStyle.float,
      width: props.mobileStyle.width
    }
  })
}));

const Image = ({ data }) => {
  const image = data.value.components.filter(item => item.type === 'image')[0];
  const style = image;
  const classes = useStyles(style);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {!sm ? (
        <img src={image.desktopImg} className={classes.root}></img>
      ) : (
        <img src={image.mobileImg} className={data.root}></img>
      )}
    </div>
  );
};

export default Image;
