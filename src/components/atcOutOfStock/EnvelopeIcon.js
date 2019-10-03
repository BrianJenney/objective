import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Envelope } from '../../assets/static/envelope_black.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '43px',
    height: '18px',
    paddingRight: '12px'
  }
}));

const EnvelopeIcon = () => {
  const classes = useStyles();
  return <Envelope className={classes.root} />;
};

export default EnvelopeIcon;
