import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../../components/common/Icons/Logo/Logo';

import { Container, Link } from '@material-ui/core';
import '../../landingpages/fast-asleep.scss';

const Header = ({ data }) => {
  const navlink = data.filter(item => item.type === 'navlink')[0];

  return (
    <div className="landing-header">
      <Container>
        <div className="link-holder">
          <NavLink to="/">
            <Logo />
          </NavLink>
          {navlink.value.map(val => {
            return (
              <Link href={val.link} className="hidden-xs">
                {val.value}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Header;
