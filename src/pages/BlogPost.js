import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import ScrollToTop from '../components/common/ScrollToTop';
import { StyledContainer } from '../assets/styles/StyledComponents';

import './blog/blog-styles.scss';
import { fetchPost } from '../utils/blog';
import FeaturedItem from './blog/FeaturedItem';
import BlogVariantCard from './blog/BlogVariantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import HeadTags from '../components/common/HeadTags';
import NotFound from './notfound/NotFound';
import StaticPage from './static/StaticPage';
const dateFormat = require('dateformat');

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=1002&fm=jpg&q=50';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
      }

      return (
        <img src={node.data.target.fields.file.url + params} alt={node.data.target.fields.title} />
      );
    }
  }
};

const BlogPost = ({ computedMatch }) => {
  const { slug } = computedMatch.params;
  const { variants } = useSelector(state => state.catalog);
  const [post, setPost] = useState({});
  const [useStaticPage, setUseStaticPage] = useState(false);
  const [isValidPost, setIsValidPost] = useState(null);
  const seoMap = useSelector(state => state.storefront.seoMap);
  let title;
  let description;
  let indexThisPage;
  const checkIsValidPost = async () => {
    const seoData = seoMap[slug];
    if (seoData && seoData.description.includes('Objective Journal')) {
      setIsValidPost(true);
      ({ title, description, indexThisPage } = seoData);
    } else {
      setIsValidPost(false);
    }
  };

  const fetchData = async () => {
    const postData = await fetchPost(slug);
    setPost(postData);
    // Check postData for embedded static page
    const postBody = postData.fields.body.content;
    if (
      postBody[0].nodeType === 'embedded-entry-block' &&
      postBody[0].data.target.sys.contentType.sys.id === 'spMainPage'
    ) {
      setUseStaticPage(true);
    }
  };

  useEffect(() => {
    checkIsValidPost().then(() => {
      if (isValidPost) {
        fetchData();
        window.analytics.page('Journal Post');
      } else {
        window.analytics.page('404 Error');
      }
    });
  }, [isValidPost, slug]);

  if (useStaticPage) {
    return <StaticPage />;
  }

  if (!isValidPost) {
    return <NotFound />;
  }

  if (Object.keys(post).length === 0) {
    return (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        <ScrollToTop>
          <LoadingSpinner loadingMessage="Loading ..." page="journal" />;
        </ScrollToTop>
      </>
    );
  }
  const renderRelatedProducts = products => {
    if (variants && products.length > 0) {
      return products.map(product => {
        const productVariant = variants.filter(variant => variant.slug === product.fields.Slug);

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
      return posts.map(item => <FeaturedItem post={item} key={item.sys.id} />);
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

  const renderPost = () => {
    if (!post.fields || !post.fields.title) {
      return <div>Loading...</div>;
    }

    let imageUrl = 'http://cdn1.stopagingnow.com/objective/fakeimg.png';

    if (post.fields.featuredImage && post.fields.featuredImage.fields) {
      imageUrl = `${post.fields.featuredImage.fields.file.url}?w=1336&fm=jpg&q=90`;
    }

    let category = 'General';
    let categorySlug = null;

    if (
      post.fields.categories &&
      post.fields.categories.length > 0 &&
      post.fields.categories[0].fields
    ) {
      category = post.fields.categories[0].fields.title;
      categorySlug = post.fields.categories[0].fields.slug;
    }

    return (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        <ScrollToTop>
          <div className="journal-gallery post">
            <Box className="content" py={8}>
              <StyledContainer>
                <Box className="center">
                  <Grid container direction="column" justify="center" alignItems="center">
                    <div className="flex">
                      <span className="categoryName">
                        <Link to={`/journal/category/${categorySlug}`}>{category}</Link>
                      </span>
                      <span className="minRead">| {post.fields.minuteRead} Min Read</span>
                    </div>
                    <Grid item xs={12} sm={8} md={6}>
                      <h1>{post.fields.title}</h1>
                    </Grid>
                  </Grid>
                  <img src={imageUrl} alt={post.fields.featuredImage.fields.title} />
                </Box>
                <Grid container xs={12} md={10}>
                  <Grid item xs={12} md={2} className="left">
                    <p className="date">{dateFormat(post.sys.updatedAt, 'mmmm d, yyyy')}</p>
                    <div className="mobile-flex">
                      <div className="tagholder">
                        {post.fields.tags && post.fields.tags.length > 0 ? (
                          <div className="tags">{renderTags(post.fields.tags)}</div>
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
                    {documentToReactComponents(post.fields.body, contentfulOptions)}
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
              </StyledContainer>
            </Box>

            {post.fields.relatedProducts && post.fields.relatedProducts.length > 0 ? (
              <Box className="shop">
                <StyledContainer>
                  <h1 className="title" align="center">
                    SHOP THIS POST
                  </h1>
                  <div className="border"></div>
                  <Grid container spacing={3} justify="center">
                    {renderRelatedProducts(post.fields.relatedProducts)}
                  </Grid>
                </StyledContainer>
              </Box>
            ) : (
              <></>
            )}

            {post.fields.relatedPosts && post.fields.relatedPosts.length > 0 ? (
              <Box className="content related" py={8}>
                <StyledContainer>
                  <Divider />
                  <h1>Related Posts</h1>
                  <Grid container spacing={4} className="calloutSmall">
                    {renderRelatedPosts(post.fields.relatedPosts)}
                  </Grid>
                </StyledContainer>
              </Box>
            ) : (
              <></>
            )}
          </div>
        </ScrollToTop>
      </>
    );
  };

  return renderPost();
};

export default BlogPost;
