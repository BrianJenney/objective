import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.css';

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

const Hero = ({ data, template, type }) => {
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {!sm ? (
        <img src={data.desktopImg} className={`${classes.root} ${template}-${type}`}></img>
      ) : (
        <img src={data.mobileImg} className={`${classes.root} ${template}-${type}`}></img>
      )}
    </Box>
  );
};

export default Hero;
