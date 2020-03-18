import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import '../../landingpages/fast-asleep.scss';

import mockData from '../sample_data';
import Header from './Header.js';

const Template1 = ({ match }) => {
  const mockComponents = mockData.sampleContentful.components;
  // const { landingSlug } = match.params;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className="fast-asleep-lp">
      <Header data={mockComponents} />
    </div>
  );
};

export default withRouter(Template1);
