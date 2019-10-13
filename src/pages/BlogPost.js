import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Button } from '../components/common';
import ScrollToTop from '../components/common/ScrollToTop';

import './blog/blog-styles.scss';
import { fetchPost } from '../utils/blog';
import FeaturedItem from './blog/FeaturedItem';

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
        let params = '?w=555&fm=jpg&q=90';

        if (window.screen.width < 768) {
          params = '?w=450&fm=jpg&q=90';
        }

        return (
        <img
          src={node.data.target.fields.file.url + params}
          alt={node.data.target.fields.title}
        />
      );
    }
  }
};

const BlogPost = ({ computedMatch }) => {
  const { post_slug } = computedMatch.params;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [post, setPost] = useState({});
  useEffect(() => {
    async function fetchData() {
      let postData = await fetchPost(post_slug);
      setPost(postData);
    }
    fetchData();
  }, [post_slug]);

  const renderRelatedPosts = posts => {
    if (posts.length > 0) {
      return posts.map((item, key) => {
        return <FeaturedItem post={item} key={ item.sys.id } />;
      });
    } else {
      return <></>;
    }
  }

  const renderPost = post => {
    if (!post.fields || !post.fields.title) {
      return <div>Loading...</div>;
    }

    let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

    if (post.fields.featuredImage) {
      imageUrl = `${post.fields.featuredImage.fields.file.url}?w=1336&fm=jpg&q=90`;
    }

    return (
      <ScrollToTop>
        <div className="journal-gallery post">
          <Box className="content" py={8}>
            <Container>
              <Box className="center">
                <div className="flex">
                  <span className="categoryName">{ post.fields.categories[0].fields.title}</span>|
                  <span className="minRead">{ post.fields.minuteRead } Min Read</span>
                </div>
                <h1>{ post.fields.title }</h1>
                <img src={ imageUrl } />
              </Box>
              <Grid container>
                <Grid item xs={12} md={3}>
                  hello
                </Grid>
                <Grid item xs={12} md={9}>
                  {documentToReactComponents(
                    post.fields.body,
                    contentfulOptions
                  )}
                  {/* Quote Block
                  <Divider className="gray" />
                  <h2>
                    And that’s a one-two punch
                    <br />
                    against aging that your skin will
                    <br />
                    love at any age.
                  </h2>
                  <Divider className="gray" />
                  */}
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box className="content related" py={8}>
            <Container>
              <Divider />
              <h1>Related Posts</h1>
              <Grid container spacing={4} className="calloutSmall">
                {post.fields.relatedPosts && post.fields.relatedPosts.length > 0 ? renderRelatedPosts(post.fields.relatedPosts) : <></> }
              </Grid>
            </Container>
          </Box>
        </div>
      </ScrollToTop>
    );
  }

  return renderPost(post);
};

export default BlogPost;