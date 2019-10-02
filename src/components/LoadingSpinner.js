import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing(2),
  }
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();

  return (
    <Container>
      <Box py={10} className={classes.center}>
        <Typography> {props.loadingMessage}</Typography>
        <CircularProgress className={classes.progress} />
      </Box>
    </Container>
  );
}