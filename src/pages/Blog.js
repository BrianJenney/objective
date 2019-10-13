import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import { Button } from '../components/common';
import ScrollToTop from '../components/common/ScrollToTop';

import './blog/blog-styles.scss';
import { fetchBlogHome } from '../utils/blog';
import PostItem from './blog/PostItem';
import FeaturedPost from './blog/FeaturedPost';
import FeaturedItem from './blog/FeaturedItem';

const Blog = () => {
  const [featuredMain, setFeaturedMain] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let results = await fetchBlogHome();

      if (results.featured.length > 0) {
        setFeaturedMain(results.featured.shift());
        setFeaturedPosts(results.featured);
      }
  
      setPosts(results.posts);
    }
    fetchData();
  }, []);

  const renderFeaturedMain = post => {
    return FeaturedPost(post);
  };

  const renderFeaturedPosts = posts => {
    if (posts.length > 0) {
      return posts.map((item, key) => {
        return <FeaturedItem post={item} key={ item.sys.id } />;
      });
    } else {
      return <></>;
    }
  };

  const renderPosts = posts => {
    return posts.map((item, key) => {
      return <PostItem post={item} key={ item.sys.id } />;
    });
  };

  return (
    <ScrollToTop>
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
            { renderFeaturedMain(featuredMain) }
            {featuredPosts.length > 0
            ?
            <Grid container spacing={4} className="calloutSmall">
              { renderFeaturedPosts(featuredPosts) }
            </Grid>
            :
            <></>
            }
            <Divider />
            <h1>All Posts</h1>
            <div className="list">
              { renderPosts(posts) }
              <div className="load">
                <Button variant="contained" color="primary">
                  Load More
                </Button>
              </div>
            </div>
          </Container>
        </Box>
      </div>
    </ScrollToTop>
  );
};

export default Blog;