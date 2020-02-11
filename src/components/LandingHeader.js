import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unSetCartMergeNotification } from '../modules/cart/actions';
import Logo from './common/Icons/Logo/Logo';
import { useMediaQuery, Container, Grid, Box, Link, SvgIcon } from '@material-ui/core';

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const LandingHeader = () => {
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const handleClick = () => {
    dispatch(unSetCartMergeNotification());
  };

  return (
    <div className="landing-header">
      <Container>
        <div className="link-holder">
          <NavLink to="/" onClick={handleClick}>
            <Logo />
          </NavLink>
          <NavLink to="/" onClick={executeScroll}>
            GABA: THE CALMING <br />
            NEUROTRANSMITTER
          </NavLink>
          <NavLink to="/" onClick={executeScroll}>
            SAFFRON: THE SPICE WITH
            <br /> A 100% SUCCESS RATE
          </NavLink>
          <NavLink to="/" onClick={executeScroll}>
            7 SIGNS YOU’RE
            <br /> NOT SLEEPING WELL
          </NavLink>
          <NavLink to="/" onClick={executeScroll}>
            BETTER SLEEP—Guaranteed
            <br /> try it risk-free
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default LandingHeader;
