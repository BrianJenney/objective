import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Button } from '../components/common';
import ScrollToTop from '../components/common/ScrollToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import './blog/blog-styles.scss';
import { fetchPostsByTag } from '../utils/blog';
import PostItem from './blog/PostItem';
import HeadTags from '../components/common/HeadTags';
import NotFound from './notfound/NotFound';

const BlogTag = ({ computedMatch }) => {
  const { tag_slug } = computedMatch.params;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const seoMap = useSelector(state => state.storefront.seoMap);
  const validTag = seoMap[tag_slug];
  let title;
  let description;
  let indexThisPage;
  if (validTag) {
    ({ title, description, indexThisPage } = validTag);
  }

  const [tag, setTag] = useState('General');
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const results = await fetchPostsByTag(tag_slug);

    setTag(results.tag);
    setPosts(results.posts);
  };

  useEffect(() => {
    if (validTag) {
      fetchData();
      window.analytics.page('Journal Tag');
      return () => {
        setPosts([]);
      };
    }
    window.analytics.page('404 Error');
  }, []);

  if (!validTag) {
    return <NotFound />;
  }

  if (posts.length === 0) {
    return (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        <ScrollToTop>
          <LoadingSpinner loadingMessage="Loading ..." page="journal" />;
        </ScrollToTop>
      </>
    );
  }

  const renderPosts = posts => posts.map((item, key) => <PostItem post={item} key={item.sys.id} />);

  return (
    <>
      <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
      <ScrollToTop>
        <div className="journal-gallery">
          <Box className="header" py={8}>
            <Container className="container">
              <h1>{tag}</h1>
            </Container>
          </Box>
          <Box className="content" py={8}>
            <Container>
              <div className="list">{renderPosts(posts)}</div>
            </Container>
          </Box>
        </div>
      </ScrollToTop>
    </>
  );
};

export default BlogTag;
