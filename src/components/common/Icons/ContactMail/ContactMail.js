import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as ContactMail } from '../../../../assets/static/contact-us-mail-email.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '105px',
    height: '57px',
    marginBottom: 36,
    [theme.breakpoints.down('xs')]: {
      width: '68px',
      height: '37px',
      marginBottom: 19
    }
  }
}));

const ContactMailIcon = () => {
  const classes = useStyles()
  return (
    <div>
      <ContactMail className={classes.root} />
    </div>
  )
};

export default ContactMailIcon;
