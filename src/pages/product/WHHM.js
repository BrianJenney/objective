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
  title: {
    paddingBottom: 30,
    fontWeight: '500',
    fontSize: 20,
  },
}));

export default function WHHM() {
  const classes = Styles();
  const border = {
    border: 1,
    borderColor: '#003833',
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} align='center'>
        LOREM IPSUM COMPLIANCE
      </Typography>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <PDPCard title="Morning, Day or Night" bottomColor="#003833" textColor="white" cardType="imgcard3" icon="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_potted-plant_snake-zeylanica-6_grant_blush-7_1500x.progressive.jpg?v=1564590364" />
          </Box>
          <Typography
            align='center'
            className={classes.text}>
            WHEN
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='Mix with 8oz of liquid' cardType='imgcard3' icon='https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_potted-plant_calathea-pinstripe_grant_mustard-4_1500x.progressive.jpg?v=1565258513' /></Paper>
          </Box>
          <Typography align='center'
            className={classes.text}>
            HOW
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='1-2 scoops' cardType='imgcard3' icon='https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_potted-plant_fiddle-leaf-fig-6_hyde_black-7_1500x.progressive.jpg?v=1564653394' /></Paper>
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