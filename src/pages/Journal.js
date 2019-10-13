import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Button } from '../components/common';
import './blog/blog-styles.scss';

const Journal = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <div className="journal-gallery">
      <Box className="header" py={8}>
        <Container className="container">
          <h1>The Journal</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            <br />
            elit, sed do eiusmod tempor
          </p>
        </Container>
      </Box>
      <Box className="content" py={8}>
        <Container>
          <Divider />
          <h1>Featured Posts</h1>
          <Grid container spacing={4} className="callout">
            <Grid item xs={12} md={8}>
              <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="flex">
                <span className="categoryName">Category</span>&mdash;
                <span className="minRead">X Min Read</span>
              </div>
              <h2>
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor. Pro id veritus corpora interesset, ex cum quas
                simul.
              </p>
              <Link to="/">Read More</Link>
            </Grid>
          </Grid>
          <Grid container spacing={4} className="calloutSmall">
            <Grid item xs={12} md={4}>
              <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              <div className="flex">
                <span className="categoryName">Category</span>&mdash;
                <span className="minRead">X Min Read</span>
              </div>
              <h2>
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor. Pro id veritus corpora interesset, ex cum quas
                simul.
              </p>
              <Link to="/">Read More</Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              <div className="flex">
                <span className="categoryName">Category</span>&mdash;
                <span className="minRead">X Min Read</span>
              </div>
              <h2>
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor. Pro id veritus corpora interesset, ex cum quas
                simul.
              </p>
              <Link to="/">Read More</Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              <div className="flex">
                <span className="categoryName">Category</span>&mdash;
                <span className="minRead">X Min Read</span>
              </div>
              <h2>
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor. Pro id veritus corpora interesset, ex cum quas
                simul.
              </p>
              <Link to="/">Read More</Link>
            </Grid>
          </Grid>
          <Divider />
          <h1>All Posts</h1>
          <div className="list">
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="flex">
                  <span className="categoryName">Category</span>&mdash;
                  <span className="minRead">X Min Read</span>
                </div>
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor. Pro id veritus corpora interesset, ex cum
                  quas simul.
                </p>
                <Link to="/">Read More</Link>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="flex">
                  <span className="categoryName">Category</span>&mdash;
                  <span className="minRead">X Min Read</span>
                </div>
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor. Pro id veritus corpora interesset, ex cum
                  quas simul.
                </p>
                <Link to="/">Read More</Link>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="flex">
                  <span className="categoryName">Category</span>&mdash;
                  <span className="minRead">X Min Read</span>
                </div>
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor. Pro id veritus corpora interesset, ex cum
                  quas simul.
                </p>
                <Link to="/">Read More</Link>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="flex">
                  <span className="categoryName">Category</span>&mdash;
                  <span className="minRead">X Min Read</span>
                </div>
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor. Pro id veritus corpora interesset, ex cum
                  quas simul.
                </p>
                <Link to="/">Read More</Link>
              </Grid>
            </Grid>
            <div className="load">
              <Button variant="contained" color="primary">
                Load More
              </Button>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
};

export default Journal;
