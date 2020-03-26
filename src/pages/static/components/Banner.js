import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';

import './template-styles.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    textAlign: props.desktopStyle.align,
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform
  })
}));

const Banner = ({ data, template, type, borderPlacement }) => {
  const classes = useStyles(data);
  const border = data.desktopStyle.border;
  const borderColor = data.desktopStyle.borderColor;

  return (
    <>
      {template ? (
        border ? (
          <div className={template}>
            <Grid className={type}>
              <Box className={borderPlacement} style={{ borderColor: `${borderColor}` }}>
                <Typography className={`${classes.root} ${type}-text`}>{data.value}</Typography>
              </Box>
            </Grid>
          </div>
        ) : (
          <div className={template}>
            <Grid className={type}>
              <Box>
                <Typography className={classes.root}>{data.value}</Typography>
              </Box>
            </Grid>
          </div>
        )
      ) : border ? (
        <Box>
          <Typography className={classes.root}>{data.value}</Typography>
        </Box>
      ) : (
        <Box>
          <Typography className={classes.root}>{data.value}</Typography>
        </Box>
      )}
    </>
  );
};

export default Banner;
