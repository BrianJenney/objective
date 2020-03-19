import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Container, Grid } from '@material-ui/core';
import '../../landingpages/fast-asleep.scss';

import mockData from '../sample_data';
import Header from '../LandingPage/Header.js';
import Title from '../Title.js';
import Subtitle from '../Subtitle.js';
import Hero from '../Hero.js';
import Paragraph from '../Paragraph';
import LPBox from '../LandingPage/LPBox.js';

const Template1 = ({ match }) => {
  const mockComponents = mockData.sampleContentful.components;
  // const { landingSlug } = match.params;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid>
      <Header data={mockComponents} />
      <Container>
        <Grid xs={12} md={8} container>
          <Title data={mockComponents} />
          <Subtitle data={mockComponents} />
        </Grid>
        <Grid>
          <Hero data={mockComponents} />
        </Grid>
        <Grid className="oneColumn">
          <Paragraph data={mockComponents[4]} />
          <LPBox data={mockComponents[4]} />
        </Grid>
        {/* <Grid className="oneColumn">
          <Title/>
          <Paragraph data={mockComponents[6]} />
          <LPBox data={mockComponents[6]} />
        </Grid> */}
      </Container>
    </Grid>
  );
};

export default withRouter(Template1);
