import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '../components/common';
import './blog/blog-styles.scss';

const BlogPost = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <div className="journal-gallery post">
      <Box className="content" py={8}>
        <Container>
          <Box className="center">
            <div className="flex">
              <span className="categoryName">Category</span>|
              <span className="minRead">X Min Read</span>
            </div>
            <h1>
              Top 7 Herbs to Reduce Hot
              <br />
              Flashes: Pros & Cons
            </h1>
            <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
          </Box>
          <Grid container>
            <Grid item xs={12} md={3}>
              hello
            </Grid>
            <Grid item xs={12} md={9}>
              <h3>1. Lorem Ipsum Dolor Sit</h3>
              <p>
                Sit When you turn the corner of your mid-twenties, something
                starts to happen deep within your skin. And it all begins with
                collagen.
              </p>
              <p>
                Collagen is the “glue” that holds your body together. Found in
                skin, hair, bones, joints, muscles, tendons, blood vessels and
                vital organs, it’s the most abundant protein naturally produced
                in the human body and a critical component of connective tissue.
              </p>
              <p>
                In your skin, collagen forms a sponge-like matrix that absorbs
                substances like super-hydrating hyaluronic acid and the protein
                elastin, which together keep skin smooth, firm and resilient.
              </p>
              <h3>2. Lorem Ipsum Dolor</h3>
              <p>
                Sit Your collagen matrix is never static. In fact, it’s
                constantly undergoing a process of breaking down and rebuilding
                in order to keep the matrix strong and robust. In your younger
                years, this breakdown/rebuild cycle is perfectly balanced.
              </p>
              <p>
                But as you age, the production of new collagen starts to slow
                down and the breakdown of old collagen continues at the same
                pace. The result? A decline in collagen levels and a weakening
                of your skin matrix, along with the dreaded signs of skin aging,
                including thinner, weaker skin…a dull, dry complexion… loss of
                firmness…as well as fine lines and wrinkles.
              </p>
              <p>
                Those “laugh lines” or “worry creases” that won’t go away?
                They’re no joke. And they start with a loss of collagen.
              </p>
              <img src="http://cdn1.stopagingnow.com/objective/fakeimg.png" />
              <p>
                Those “laugh lines” or “worry creases” that won’t go away?
                They’re no joke. And they start with a loss of collagen.
              </p>
              <Divider className="gray" />
              <h2>
                And that’s a one-two punch
                <br />
                against aging that your skin will
                <br />
                love at any age.
              </h2>
              <Divider className="gray" />
              <p>
                Verisol® is an advanced peptide complex featuring both of these
                skin-supporting collagen types. Within 8 weeks, Verisol®
                peptides were shown to increase procollagen--collagen building
                blocks-- 65%. Plus, it stimulates your body’s own natural
                collagen production. And that’s a one-two punch against aging
                that your skin will love at any age.
              </p>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="content related" py={8}>
        <Container>
          <Divider />
          <h1>Related Posts</h1>
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
        </Container>
      </Box>
    </div>
  );
};

export default BlogPost;
