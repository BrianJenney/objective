import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Arrow } from '../../../../assets/static/arrow.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '60px',
    height: '18px',
    stroke: 'white',
    fill: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '44px',
      height: '14px'
    }
  }
}));

const ArrowIcon = () => {
  const classes = useStyles();
  return (
    <>
      <Arrow className={classes.root} />
    </>
  );
};

export default ArrowIcon;
