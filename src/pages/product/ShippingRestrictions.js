import React from 'react';
import Grid from '@material-ui/core/Grid';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { NavLink } from '../../components/common';
import './PDP-style.scss';

export const ShippingRestrictionMobile = ({ onClick }) => (
  <Grid container xs={12} style={{ justifyContent: 'center' }}>
    <Grid item className="pdp-restriction-mobile">
      <NavLink onClick={onClick} underline="always">
        Shipping Restrictions Apply
      </NavLink>
    </Grid>
    <Grid item className="pdp-info-mobile">
      <InfoOutlined style={{ fontSize: '16px' }}></InfoOutlined>
    </Grid>
  </Grid>
);

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
