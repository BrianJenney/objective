import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { withDialog } from '../../hoc';
import HelpForm from './HelpForm';

const useStyles = makeStyles(theme => ({
  title: {
    height: '48px',
    fontSize: '48px',
    color: '#231f20',
    fontFamily: 'Canela Text',
    lineHeight: 'normal',
    margin: theme.spacing(2),
  },
}));

const Help = ({ closeDialog }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={3}>
        <Box textAlign="center">
          <Typography className={classes.title}>Customer Care</Typography>
          <HelpForm closeDialog={closeDialog}/>
        </Box>
      </Box>
    </Container>
  );
};

export default withDialog(Help);
