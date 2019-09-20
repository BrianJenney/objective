import React from "react";
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: '20px'
  },
}));

const Address = ({ address, email=null, phone=null }) => {
  const classes = useStyles();
  const Phone = ({phone}) => {
    return phone ? <Typography className={classes.text}>
      ({phone.substr(0,3)}){' '}{phone.substr(3,3)}-{phone.substr(6)}
    </Typography> : <br/>;
  };
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
      <Phone phone={phone} />
      { email && <Typography className={classes.text}>{email}</Typography>}
    </>
  );
};

export default Address;
