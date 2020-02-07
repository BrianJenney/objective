import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import ScrollToTop from '../components/common/ScrollToTop';

import './blog/blog-styles.scss';
import { fetchPostsByCategory } from '../utils/blog';
import PostItem from './blog/PostItem';
import LoadingSpinner from '../components/LoadingSpinner';
import HeadTags from '../components/common/HeadTags';

const BlogCategory = ({ computedMatch }) => {
  const { category_slug } = computedMatch.params;

  const [blogTitle, setBlogTitle] = useState('General');
  const [posts, setPosts] = useState([]);

  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description } = seoMap[category_slug];

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
  const renderPosts = posts =>
    posts.map((item, key) => <PostItem post={item} key={item.sys.id} />);

  return (
    posts.length && (
      <>
        <HeadTags title={title} description={description} />
        <ScrollToTop>
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
        </ScrollToTop>
      </>
    )
  );
};

export default BlogCategory;
