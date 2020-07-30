import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: '18px',
    fontFamily: theme.typography.bodyFontFamily,
    lineHeight: '1.2',
    color: theme.palette.brand.camoGreen,
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  }
}));

const Address = ({ address, email = null, phone = null }) => {
  const classes = useStyles();
  const Phone = ({ phone }) =>
    phone ? (
      <Typography className={classes.text}>
        ({phone.substr(0, 3)}) {phone.substr(3, 3)}-{phone.substr(6)}
      </Typography>
    ) : null;
  if (!address) return null;
  return (
    <>
      <Typography className={classes.text}>
        {address.firstName} {address.lastName}
      </Typography>
      <Typography className={classes.text}>
        {address.address1} {address.address2 || null}
      </Typography>
      <Typography className={classes.text}>
        {address.city}, {address.state} {address.zipcode}
      </Typography>
      <Phone phone={phone} />
      {email && <Typography className={classes.text}>{email}</Typography>}
    </>
  );
};

export default Address;
