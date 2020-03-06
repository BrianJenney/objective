import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import ScrollToTop from '../components/common/ScrollToTop';

import './blog/blog-styles.scss';
import { fetchPostsByCategory } from '../utils/blog';
import FeaturedPost from './blog/FeaturedPost';
import FeaturedItem from './blog/FeaturedItem';
import PostItem from './blog/PostItem';
import LoadingSpinner from '../components/LoadingSpinner';
import HeadTags from '../components/common/HeadTags';

const BlogCategory = ({ computedMatch, location }) => {
  const { category_slug } = computedMatch.params;

  const [blogTitle, setBlogTitle] = useState('General');
  const [featuredMain, setFeaturedMain] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description } = seoMap[category_slug];
  const isSleep = matchPath(location.pathname, { path: '/journal/category/sleep' });
  console.log('isSleep', isSleep);

  useEffect(() => {
    async function fetchData() {
      const results = await fetchPostsByCategory(category_slug);

      setBlogTitle(results.title);
      setPosts(results.posts);
    }
    fetchData();
    window.analytics.page('Journal Category');
  }, []);

  if (posts.length === 0) {
    return (
      <>
        <HeadTags title={title} description={description} />
        <ScrollToTop>
          <LoadingSpinner loadingMessage="Loading posts..." page="journal" />
        </ScrollToTop>
      </>
    );
  }
  const renderFeaturedMain = post => <FeaturedPost post={post} />;

  const renderFeaturedPosts = posts => {
    if (posts.length > 0) {
      return posts.map((item, key) => (
        <FeaturedItem post={item} key={item.sys.id} />
      ));
    }
    return <></>;
  };
  const renderPosts = posts =>
    posts.map((item, key) => <PostItem post={item} key={item.sys.id} />);

  return (
    posts.length && (
      <>
        <HeadTags title={title} description={description} />
        <ScrollToTop>
          {isSleep ? (
            <div className="journal-gallery">
              <Box className="header" py={8}>
                <Container className="container">
                  <h1>Sleep</h1>
                  {/* <p>Lifestyle tips, recipes, deep dives into study results and more...to make good health easy </p> */}
                </Container>
              </Box>
              <Box className="content" py={8}>
                <Container>
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
                </Container>
              </Box>
            </div>
          ) : (
            <div className="journal-gallery">
              <Box className="header" py={8}>
                <Container className="container">
                  <h1>{blogTitle}</h1>
                </Container>
              </Box>
              <Box className="content" py={8}>
                <Container>
                  <div className="list">{renderPosts(posts)}</div>
                </Container>
              </Box>
            </div>
          )}
          
        </ScrollToTop>
      </>
    )
  );
};

export default BlogCategory;
