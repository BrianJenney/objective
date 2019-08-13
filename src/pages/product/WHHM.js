import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PDPCard from './PDPCard'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { blue } from '@material-ui/core/colors';

const Styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {

  },
  text: {
    paddingTop: 10,
    fontWeight: '500',
  },
}));

export default function WHHM() {
  const classes = Styles();
  const border = {
    border: 1,
    borderColor: 'red',
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='Morning, Day or Night' cardType='imgcard3' icon='https://www.thesill.com/products/snake-plant-zeylanica-medium-grant?variant=blush' /></Paper>
          </Box>
          <Typography
            align='center'
            className={classes.text}
            fontWeight="fontWeightBold">
            WHEN
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='Mix with 8oz of liquid' cardType='imgcard3' /></Paper>
          </Box>
          <Typography align='center'
            className={classes.text}>
            HOW
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='1-2 scoops' cardType='imgcard3' /></Paper>
          </Box>
          <Typography align='center'
            className={classes.text}>
            HOW MUCH
          </Typography>
        </Grid>
      </Grid>
    </div >
  );
}