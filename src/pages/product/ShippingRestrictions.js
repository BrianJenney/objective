import React, { useState, useContext, useCallback, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { NavLink } from '../../components/common';
import './overrides.css';
import './PDP-style.css';

export const ShippingRestrictionMobile = props => {
  console.log('PROPS', props);
  return (
    <Grid container xs={12} style={{ justifyContent: 'center' }}>
      <Grid item className="pdp-restriction-mobile">
        <NavLink underline="always">Shipping Restrictions Apply</NavLink>
      </Grid>
      <Grid item className="pdp-info-mobile">
        <InfoOutlined style={{ fontSize: '16px' }}></InfoOutlined>
      </Grid>
    </Grid>
  );
};

export const ShippingRestriction = ({ onClick }) => (
  <Grid container>
    <Grid item className="pdp-restriction">
      <NavLink onClick={onClick} underline="always">
        Shipping Restrictions Apply
      </NavLink>
    </Grid>
    <Grid item className="pdp-info-icon">
      <InfoOutlined style={{ fontSize: '18px' }}></InfoOutlined>
    </Grid>
  </Grid>
);
