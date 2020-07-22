import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { NavLink } from '../../components/common';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '-4px'
  }
});

// Not found 404 Page
const NotFound = () => {
  const theme = useTheme();
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Helmet>
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      <NavLink to="/">
        {mobile ? (
          <img
            src="https://images.ctfassets.net/mj9bpefl6wof/19ChPMduwPcvkvecLiOiXf/ebdd41cd42ed97e2249b92eb88a1d58d/404-mobile.png?w=450&fm=jpg&q=50"
            alt=""
            className={classes.root}
          />
        ) : (
          <img
            src="https://images.ctfassets.net/mj9bpefl6wof/3bJxwTFP6IpI9tkT5xiLZL/d3b2981571f8a26ac372f836b696f555/404_-_desktop.png?w=2000&q=50&fm=jpg"
            alt=""
            className={classes.root}
          />
        )}
      </NavLink>
    </>
  );
};

export default NotFound;
