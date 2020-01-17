import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Arrow } from '../../../../assets/static/arrow.svg';

const useStyles = makeStyles(theme => ({
  root: {
    height: '17px',
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
