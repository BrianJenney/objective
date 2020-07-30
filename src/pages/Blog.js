import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import ScrollToTop from '../components/common/ScrollToTop';
import { StyledContainer } from '../assets/styles/StyledComponents';

import './blog/blog-styles.scss';
import { fetchBlogHome } from '../utils/blog';
import PostItem from './blog/PostItem';
import FeaturedPost from './blog/FeaturedPost';
import FeaturedItem from './blog/FeaturedItem';
import LoadingSpinner from '../components/LoadingSpinner';
import HeadTags from '../components/common/HeadTags';

const Blog = ({ location }) => {
  const [featuredMain, setFeaturedMain] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description, indexThisPage } = seoMap[location.pathname.substring(1)];

  useEffect(() => {
    async function fetchData() {
      const results = await fetchBlogHome();

      if (results.featured.length > 0) {
        setFeaturedMain(results.featured.shift());
        setFeaturedPosts(results.featured);
      }

      setPosts(results.posts);
    }
    fetchData();
    window.analytics.page('Journal Home');
  }, []);

  const renderFeaturedMain = post => <FeaturedPost post={post} />;

  const renderFeaturedPosts = posts => {
    if (posts.length > 0) {
      return posts.map(item => <FeaturedItem post={item} key={item.sys.id} />);
    }
    return <></>;
  };

  const renderPosts = posts => posts.map(item => <PostItem post={item} key={item.sys.id} />);

  if (Object.keys(featuredMain).length === 0 || featuredPosts.length === 0 || posts.length === 0) {
    return <LoadingSpinner loadingMessage="Loading blog" page="journal" />;
  }
  return (
    <>
      <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
      <ScrollToTop>
        <div className="journal-gallery">
          <Box className="header" py={8}>
            <StyledContainer>
              <Grid container spacing={3} direction="column" justify="center" alignItems="center">
                <Grid item xs={12} sm={8} md={6}>
                  <h1>The Journal</h1>
                  <p>
                    Lifestyle tips, recipes, deep dives into study results and more...to make good
                    health easy
                  </p>
                </Grid>
              </Grid>
            </StyledContainer>
          </Box>
          <Box className="content" py={8}>
            <StyledContainer>
              <Divider />
              <h1>Featured Posts</h1>
              {renderFeaturedMain(featuredMain)}
              {featuredPosts.length && (
                <Grid container spacing={4} className="calloutSmall">
                  {renderFeaturedPosts(featuredPosts)}
                </Grid>
              )}
              <Divider />
              <h1>All Posts</h1>
              <div className="list">{renderPosts(posts)}</div>
            </StyledContainer>
          </Box>
        </div>
      </ScrollToTop>
    </>
  );
};

Blog.propTypes = {
  location: PropTypes.object.isRequired
};

export default Blog;
