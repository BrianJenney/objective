import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as ContactPhone } from '../../../../assets/static/contact-us-phone.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '70px',
    height: '69px',
    marginBottom: 36,
    [theme.breakpoints.down('xs')]: {
      width: '44px',
      height: '44px',
      marginBottom: 14
    }
  }
}));

const ContactPhoneIcon = () => {
  const classes = useStyles()
  return (
    <div>
      <ContactPhone className={classes.root} />
    </div>
  )
};

export default ContactPhoneIcon;
