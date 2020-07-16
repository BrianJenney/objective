import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Scrollchor from 'react-scrollchor';
import Logo from '../../../components/common/Icons/Logo/Logo';
import { StyledContainer } from '../../../assets/styles/StyledComponents';

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
    flexWrap: 'nowrap',
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
    textTransform: props.desktopStyle.textTransform
  })
}));

const Header = ({ data, template, type }) => {
  const classes = useStyles(data);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid className={classes.root}>
      {!sm ? (
        <StyledContainer>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.container}
          >
            <Grid item sm="auto">
              <NavLink to="/">
                <Logo />
              </NavLink>
            </Grid>
            {data.value.map(val => (
              <Grid item sm="auto">
                <Scrollchor to={`#${val.scroll}`} className={`${classes.link} ${template}-${type}`}>
                  {val.label}
                </Scrollchor>
              </Grid>
            ))}
          </Grid>
        </StyledContainer>
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

Header.propTypes = {
  data: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Header;
