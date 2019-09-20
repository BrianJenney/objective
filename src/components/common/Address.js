import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: '20px',
    fontFamily: 'p22-underground',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  }
}));

const Address = ({ address, email }) => {
  const classes = useStyles();
  if (!address) return null;
  return (
    <>
      <Typography className={classes.text}>
        {address.firstName} {address.lastName}
      </Typography>
      <Typography className={classes.text}>{address.line1}</Typography>
      <Typography className={classes.text}>
        {address.city}, {address.state} {address.postalCode}
      </Typography>
      <Typography className={classes.text}>{email}</Typography>
    </>
  );
};

export default Address;
