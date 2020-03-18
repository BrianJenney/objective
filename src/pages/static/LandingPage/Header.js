import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../../components/common/Icons/Logo/Logo';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Link } from '@material-ui/core';
import '../../landingpages/fast-asleep.scss';

const useStyles = makeStyles({
  test: props => ({
    color: props.desktop.fontColor
    // fontFamily: 'p22-underground, sans-serif',
    // fontWeight: '600',
    // marginTop: '5px'
  })
});

const Header = ({ data }) => {
  const navlink = data.filter(item => item.type === 'navlink')[0];
  const style = navlink.style;
  const classes = useStyles(style);
  console.log(style.desktop.fontColor);

  return (
    <div className="landing-header">
      <Container>
        <div className="link-holder">
          <NavLink to="/">
            <Logo />
          </NavLink>
          {navlink.value.map(val => {
            return <Link href={val.link}>{val.value}</Link>;
          })}
        </div>
      </Container>
      <Container>
        <div className={classes.test}>TESTESTEST</div>
      </Container>
    </div>
  );
};

export default Header;
