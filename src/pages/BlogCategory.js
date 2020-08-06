import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import ScrollToTop from '../components/common/ScrollToTop';
import { StyledContainer } from '../assets/styles/StyledComponents';

import './blog/blog-styles.scss';
import { fetchPostsByCategory } from '../utils/blog';
import FeaturedPost from './blog/FeaturedPost';
import FeaturedItem from './blog/FeaturedItem';
import PostItem from './blog/PostItem';
import LoadingSpinner from '../components/LoadingSpinner';
import HeadTags from '../components/common/HeadTags';
import NotFound from './notfound/NotFound';

const BlogCategory = ({ computedMatch, location }) => {
  const { categorySlug } = computedMatch.params;

  const [blogTitle, setBlogTitle] = useState('General');
  const [featuredMain, setFeaturedMain] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const seoMap = useSelector(state => state.storefront.seoMap);
  const validCategory = seoMap[categorySlug];
  let title;
  let description;
  let indexThisPage;
  const isSleep = matchPath(location.pathname, { path: '/journal/category/sleep' });

  if (validCategory) {
    ({ title, description, indexThisPage } = validCategory);
  }

  const fetchData = async () => {
    const results = await fetchPostsByCategory(categorySlug);

    if (isSleep) {
      const featuredPostHolder = [];
      results.posts.forEach(post => {
        if (post.fields.featuredCategories && post.fields.featuredCategories[0].includes('Sleep')) {
          const featuredPosition = post.fields.featuredCategories[0].slice(-1);
          if (featuredPosition === '1') {
            setFeaturedMain(post);
          } else {
            featuredPostHolder.push(post);
          }
        }
      });
      setFeaturedPosts(featuredPostHolder);
    }
    setBlogTitle(results.title);
    setPosts(results.posts);
  };

  useEffect(() => {
    if (validCategory) {
      fetchData();
      window.analytics.page('Journal Category');
    } else {
      window.analytics.page('404 Error');
    }
  }, [categorySlug]);

  if (!validCategory) {
    return <NotFound />;
  }

  if (posts.length === 0) {
    return (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        <ScrollToTop>
          <LoadingSpinner loadingMessage="Loading posts..." page="journal" />
        </ScrollToTop>
      </>
    );
  }
  const renderFeaturedMain = post => <FeaturedPost post={post} />;

  const renderFeaturedPosts = featuredPostsForRender => {
    if (featuredPostsForRender.length > 0) {
      return featuredPostsForRender.map(item => <FeaturedItem post={item} key={item.sys.id} />);
    }
    return <></>;
  };

  const renderPosts = postsForRender =>
    postsForRender.map(item => <PostItem post={item} key={item.sys.id} />);

  return (
    posts.length && (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        <ScrollToTop>
          {isSleep ? (
            <div className="journal-gallery">
              <Box className="header" py={8}>
                <StyledContainer className="container">
                  <h1>Sleep</h1>
                  <p>Sleep Well, Live Well</p>
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
                  <div className="list">{renderPosts(posts.reverse())}</div>
                </StyledContainer>
              </Box>
            </div>
          ) : (
            <div className="journal-gallery">
              <Box className="header" py={8}>
                <StyledContainer className="container">
                  <h1>{blogTitle}</h1>
                </StyledContainer>
              </Box>
              <Box className="content" py={8}>
                <StyledContainer>
                  <div className="list">{renderPosts(posts)}</div>
                </StyledContainer>
              </Box>
            </div>
          )}
        </ScrollToTop>
      </>
    )
  );
};

BlogCategory.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default BlogCategory;
