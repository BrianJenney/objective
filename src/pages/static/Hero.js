import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: props => ({
    display: props.display,
    width: props.width,
    [theme.breakpoints.down('sm')]: {
      display: props.display,
      width: props.width
    }
  })
}));

const Hero = ({ data }) => {
  const heroDesktop = data.filter(item => item.type === 'heroDesktop')[0];
  const heroMobile = data.filter(item => item.type === 'heroMobile')[0];
  const desktopStyle = heroDesktop.style;
  const mobileStyle = heroMobile.style;
  const classes = useStyles(desktopStyle, mobileStyle);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>{!sm ? <img src={heroDesktop.value} className={classes.root}></img> : <img src={heroMobile.value}></img>}</Box>
  );
};

export default Hero;
