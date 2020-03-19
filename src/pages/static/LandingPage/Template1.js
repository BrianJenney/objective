import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import mockData from '../sample_data';
import Header from '../LandingPage/Header.js';
import Title from '../Title.js';
import Subtitle from '../Subtitle.js';
import Hero from '../Hero.js';
import Paragraph from '../Paragraph';
import LPBox from '../LandingPage/LPBox.js';
import Image from '../Image.js';

const useStyles = makeStyles(theme => ({
  title: {
    margin: '55px 0 15px',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 0 5px'
    }
  },
  subtitle: {
    margin: '0 0 45px;',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 10px'
    }
  },
  margin: {
    margin: '0 auto'
  },
  image: {
    marginBottom: 45,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 25
    }
  }
}));

const Template1 = ({ match }) => {
  const mockComponents = mockData.sampleContentful.components;
  // const { landingSlug } = match.params;
  const classes = useStyles();

  return (
    <div>
      <Header data={mockComponents} />
      <Container>
        <Grid item xs={12} md={8} className={classes.margin}>
          <Grid className={classes.title}>
            <Title data={mockComponents} />
          </Grid>
          <Grid className={classes.subtitle}>
            <Subtitle data={mockComponents} />
          </Grid>
        </Grid>
        <Grid item md={10} className={`${classes.margin} ${classes.image}`}>
          <Hero data={mockComponents} />
        </Grid>
        {/* <Grid item xs={8} className={classes.margin}>
          <Paragraph data={mockComponents[4]} />
          <LPBox data={mockComponents[4]} />
        </Grid> */}
        <Grid item xs={12} md={8} className={classes.margin}>
          <Title data={mockComponents[5].value.components} />
          <Image data={mockComponents[5]} />
          <Paragraph data={mockComponents[5]} />
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(Template1);
