import React, { useState, useEffect } from 'react';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '../components/common';
import './blog/blog-styles.scss';
import { fetchPost } from '../utils/blog';

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
  }, []);

  const renderPost = post => {
    console.log(post);
    if (!post.fields || !post.fields.title) {
      return <div>Loading...</div>;
    }

    return (
      <div className="journal-gallery post">
      <Box className="content" py={8}>
        <Container>
          <Box className="center">
            <div className="flex">
              <span className="categoryName">{ post.fields.categories[0].fields.title}</span>|
              <span className="minRead">{ post.fields.minuteRead } Min Read</span>
            </div>
            <h1>{ post.fields.title }</h1>
            <img src={`${post.fields.featuredImage.fields.file.url}?w=1336&fm=jpg&q=90`} />
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
  }

  return renderPost(post);
};

export default BlogPost;