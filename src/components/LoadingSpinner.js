import React from 'react';
import { withRouter, matchPath } from 'react-router-dom';
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
    margin: theme.spacing(2),
  }
}));

const LoadingSpinner = ({ location, loadingMessage }) => {
  const classes = useStyles();
  let size = 0;
  const isPdpPage = matchPath(location.pathname, { path: '/products/:product_slug' });
  const isGalleryPage = matchPath(location.pathname, { path: '/gallery' });
  if (isPdpPage) size = 45;
  if (isGalleryPage) size = 10;

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
