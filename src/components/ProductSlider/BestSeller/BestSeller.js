import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from './StarIcon';

const useStyles = makeStyles({
  root: {
    width: '70px',
    maxWidth: 70,
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'uppercase',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: '20px'
  },
  typography: {
    flexGrow: 1,
    textAlign: 'center'
  }
});

const BestSeller = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <StarIcon />
      <Typography variant="bestSeller" className={classes.typography}>
        Best Seller
      </Typography>
    </div>
  );
};

export default BestSeller;
