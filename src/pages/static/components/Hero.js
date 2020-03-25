import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.scss';

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
  //const hero = data.filter(item => item.type === 'hero')[0];
  //const style = hero;
  const classes = useStyles(data);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {template ? (
        <Box className={template}>
          {!sm ? (
            <img src={data.desktopImg} className={`${classes.root} ${type}`}></img>
          ) : (
            <img src={data.mobileImg} className={`${classes.root} ${type}`}></img>
          )}
        </Box>
      ) : (
        <Box>{!sm ? <img src={data.desktopImg} className={classes.root}></img> : <img src={data.mobileImg}></img>}</Box>
      )}
    </>
  );
};

export default Hero;
