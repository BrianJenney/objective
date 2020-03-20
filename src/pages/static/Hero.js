import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: props => ({
    display: props.desktopStyle.display,
    width: props.desktopStyle.width,
    [theme.breakpoints.down('sm')]: {
      display: props.mobileStyle.display,
      width: props.mobileStyle.width
    }
  })
}));

const Hero = ({ data }) => {
  const hero = data.filter(item => item.type === 'hero')[0];
  const style = hero;
  const classes = useStyles(style);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>{!sm ? <img src={hero.desktopImg} className={classes.root}></img> : <img src={hero.mobileImg}></img>}</Box>
  );
};

export default Hero;
