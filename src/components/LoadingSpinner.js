import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const LoadingSpinner = ({ location, loadingMessage, page }) => {
  const classes = useStyles();
  let size = 0;
  if (page === 'pdp' || page === 'home') size = 45;
  if (page === 'gallery') size = 10;
  if (page === 'journal') size = 100;

  return (
    <Container>
      <Box py={size} className={classes.center}>
        <Typography> {loadingMessage}</Typography>
        <CircularProgress className={classes.progress} />
      </Box>
    </Container>
  );
};

export default withRouter(LoadingSpinner);
