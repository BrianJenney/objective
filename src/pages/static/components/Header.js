import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../../components/common/Icons/Logo/Logo';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 90,
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      height: 40,
      paddingRight: 20
    },
    '& .cls-1': {
      fill: '#fff'
    },
    [theme.breakpoints.down('sm')]: {
      height: 55,
      '& svg': {
        height: 35,
        paddingRight: 0
      }
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 15
    }
  },
  link: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    fontFamily: props.desktopStyle.fontFamily,
    lineHeight: props.desktopStyle.lineHeight,
    textTransform: props.desktopStyle.textTransform,
    width: props.desktopStyle.width
  })
}));

const Header = ({ data, template, type }) => {
  const classes = useStyles(data);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid className={classes.root}>
      {!sm ? (
        <Container>
          <Grid className={classes.container}>
            <NavLink to="/">
              <Logo />
            </NavLink>
            {data.value.map(val => {
              return (
                <a href={val.scroll} className={`${classes.link} ${template}-${type}`}>
                  {val.label}
                </a>
              );
            })}
          </Grid>
        </Container>
      ) : (
        <Grid className={classes.container}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </Grid>
      )}
    </Grid>
  );
};

export default Header;
