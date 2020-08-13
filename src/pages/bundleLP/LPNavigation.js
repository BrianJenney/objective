import React from 'react';
import Scrollchor from 'react-scrollchor';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    height: 60,
    width: '276px',
    margin: '30px 100px',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 60,
      margin: '20px auto',
      width: 'fit-content',
      padding: '0 30px'
    }
  },

  link: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    fontFamily: props.desktopStyle.fontFamily,
    lineHeight: props.desktopStyle.lineHeight,
    textTransform: props.desktopStyle.textTransform,
    width: props.desktopStyle.width,
    textDecoration: 'none'
  })
}));

const LPNavigation = ({ data }) => {
  const classes = useStyles(data);
  return (
    <Grid className={classes.root}>
      <Container>
        <Grid>
          {data.value.map(val => (
            <Scrollchor
              className={classes.link}
              to={`#${val.scroll}`}
              animate={{ offset: -20, duration: 600 }}
            >
              {val.label}
            </Scrollchor>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

LPNavigation.propTypes = {
  data: PropTypes.object
};

export default LPNavigation;
