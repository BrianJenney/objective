import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import ScrollToTop from '../components/common/ScrollToTop';

import './blog/blog-styles.scss';
import { fetchPostsByCategory } from '../utils/blog';
import PostItem from './blog/PostItem';

const BlogCategory = ({ computedMatch }) => {
  window.analytics.page('Journal Category');
  const { category_slug } = computedMatch.params;

  const [title, setTitle] = useState('General');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const results = await fetchPostsByCategory(category_slug);

      setTitle(results.title);
      setPosts(results.posts);
    }
    fetchData();
  }, []);

  const renderPosts = posts =>
    posts.map((item, key) => <PostItem post={item} key={item.sys.id} />);

  return (
    <ScrollToTop>
      <div className="journal-gallery">
        <Box className="header" py={8}>
          <Container className="container">
            <h1>{title}</h1>
          </Container>
        </Box>
        <Box className="content" py={8}>
          <Container>
            <div className="list">{renderPosts(posts)}</div>
          </Container>
        </Box>
      </div>
    </ScrollToTop>
  );
};

export default BlogCategory;
