import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PDPCard from './PDPCard'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const Styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 15,
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
            <PDPCard title="Morning, Day or Night" bottomColor="#003833" textColor="white" cardType="imgcard3" label="WHEN" icon="https://cdn0.iconfinder.com/data/icons/tiny-icons-1/100/tiny-16-512.png" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='Mix with 8oz of liquid' bottomColor="#003833" textColor="white" cardType='imgcard3' label="HOW" icon="https://cdn0.iconfinder.com/data/icons/tiny-icons-1/100/tiny-45-512.png" /></Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box {...border}>
            <Paper elevation={0}><PDPCard title='1-2 scoops' bottomColor="#003833" textColor="white" cardType='imgcard3' label="HOW MUCH" icon="https://cdn0.iconfinder.com/data/icons/tiny-icons-1/100/tiny-17-512.png" /></Paper>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
}