import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../../components/common/Icons/Logo/Logo';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Link } from '@material-ui/core';
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
    textDecoration: 'underline',
    letterSpacing: '1.5px',
    color: props.desktop.fontColor,
    fontWeight: props.desktop.fontWeight,
    fontSize: props.desktop.fontSize,
    fontFamily: props.desktop.fontFamily,
    lineHeight: props.desktop.lineHeight,
    textTransform: props.desktop.textTransform,
    width: props.desktop.width
  })
}));

const Header = ({ data }) => {
  const navlink = data.filter(item => item.type === 'navlink')[0];
  const style = navlink.style;
  const classes = useStyles(style);
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
            {navlink.value.map(val => {
              return (
                <Link href={val.link} className={classes.link}>
                  {val.value}
                </Link>
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
