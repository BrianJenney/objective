import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import ScrollToTop from '../components/common/ScrollToTop';

import './blog/blog-styles.scss';
import { fetchPost } from '../utils/blog';
import FeaturedItem from './blog/FeaturedItem';
import BlogVariantCard from './blog/BlogVariantCard';
import LoadingSpinner from '../components/LoadingSpinner';

const dateFormat = require('dateformat');

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=1002&fm=jpg&q=50';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
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
  const { variants } = useSelector(state => state.catalog);
  const [post, setPost] = useState({});
  const fetchData = async () => {
    const postData = await fetchPost(post_slug);
    setPost(postData);
  };
  useEffect(() => {
    fetchData();
    window.analytics.page('Journal Post');
    return () => {
      setPost({});
    };
  }, [post_slug]);

  if (Object.keys(post).length === 0) {
    return (
      <ScrollToTop>
        <LoadingSpinner loadingMessage="Loading ..." page="journal" />;
      </ScrollToTop>
    );
  }
  const renderRelatedProducts = products => {
    if (variants && products.length > 0) {
      return products.map(product => {
        const productVariant = variants.filter(
          variant => variant.slug === product.fields.Slug
        );

        return (
          <BlogVariantCard
            product={product}
            variant={productVariant[0]}
            key={product.fields.Slug}
          />
        );
      });
    }
    return <></>;
  };

  const renderRelatedPosts = posts => {
    if (posts.length > 0) {
      return posts.map((item, key) => (
        <FeaturedItem post={item} key={item.sys.id} />
      ));
    }
    return <></>;
  };

  const renderTags = tags => {
    if (tags.length > 0) {
      return tags.map(tag => (
        <Link
          to={`/journal/tag/${tag.fields.slug}`}
          key={`tag-key-${tag.fields.slug}`}
          children={tag.fields.tag}
        ></Link>
      ));
    }

    return <></>;
  };

  const renderPost = post => {
    if (!post.fields || !post.fields.title) {
      return <div>Loading...</div>;
    }

    let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

    if (post.fields.featuredImage && post.fields.featuredImage.fields) {
      imageUrl = `${post.fields.featuredImage.fields.file.url}?w=1336&fm=jpg&q=50`;
    }

    let category = 'General';
    let slug = null;

    if (
      post.fields.categories &&
      post.fields.categories.length > 0 &&
      post.fields.categories[0].fields
    ) {
      category = post.fields.categories[0].fields.title;
      slug = post.fields.categories[0].fields.slug;
    }

    return (
      <ScrollToTop>
        <div className="journal-gallery post">
          <Box className="content" py={8}>
            <Container>
              <Box className="center">
                <div className="flex">
                  <span className="categoryName">
                    <Link to={`/journal/category/${slug}`}>{category}</Link>
                  </span>
                  |
                  <span className="minRead">
                    {post.fields.minuteRead} Min Read
                  </span>
                </div>
                <h1>{post.fields.title}</h1>
                <img src={imageUrl} />
              </Box>
              <Grid container>
                <Grid item xs={12} md={2} className="left">
                  <p className="date">
                    {dateFormat(post.sys.updatedAt, 'mmmm d, yyyy')}
                  </p>
                  <div className="mobile-flex">
                    <div className="tagholder">
                      {post.fields.tags && post.fields.tags.length > 0 ? (
                        <div className="tags">
                          {renderTags(post.fields.tags)}
                        </div>
                      ) : (
                          <></>
                        )}
                    </div>
                    <div className="icon-holder">
                      <p className="share">SHARE</p>
                      <div className="social">
                        <a
                          href="https://www.instagram.com/objective_wellness"
                          target="_blank"
                          rel="noopener"
                        >
                          <img
                            src="https://cdn1.stopagingnow.com/objective/svg/instagram_black.svg"
                            alt="instagram"
                          />
                        </a>
                        <a
                          href="https://www.facebook.com/Objective_Wellness-114299813287253/"
                          target="_blank"
                          rel="noopener"
                        >
                          <img
                            src="https://cdn1.stopagingnow.com/objective/svg/fb_black.svg"
                            alt="facebook"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={10} className="border-left">
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

          {post.fields.relatedProducts &&
            post.fields.relatedProducts.length > 0 ? (
              <Box className="shop">
                <Container>
                  <h1 className="title" align="center">
                    SHOP THIS POST
                </h1>
                  <div className="border"></div>
                  <Grid container spacing={3} justify="center">
                    {renderRelatedProducts(post.fields.relatedProducts)}
                  </Grid>
                </Container>
              </Box>
            ) : (
              <></>
            )}

          {post.fields.relatedPosts && post.fields.relatedPosts.length > 0 ? (
            <Box className="content related" py={8}>
              <Container>
                <Divider />
                <h1>Related Posts</h1>
                <Grid container spacing={4} className="calloutSmall">
                  {renderRelatedPosts(post.fields.relatedPosts)}
                </Grid>
              </Container>
            </Box>
          ) : (
              <></>
            )}
        </div>
      </ScrollToTop>
    );
  };

  return renderPost(post);
};

export default BlogPost;
