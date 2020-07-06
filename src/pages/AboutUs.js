import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import ScrollToTop from '../components/common/ScrollToTop';
import { contentfulClient } from '../utils/contentful';
import HeadTags from '../components/common/HeadTags';
import { StyledContainer } from '../assets/styles/StyledComponents';

import './about/about-styles.scss';

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=825&fm=jpg&q=50';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
      }

      return (
        <img src={node.data.target.fields.file.url + params} alt={node.data.target.fields.title} />
      );
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Link to={node.data.uri} onClick={() => window.scrollTo(0, 0)}>
        {children}
      </Link>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => <p dir="ltr">{children}</p>
  }
};

const AboutUs = ({ location }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [contents, setContents] = useState();
  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description } = seoMap[location.pathname.substring(1)];

  const fetchData = async () => {
    const results = [];
    const response = await contentfulClient.getEntries({
      content_type: 'aboutUs'
    });
    response.items.forEach(entry => {
      if (entry.fields) {
        results.push(entry.fields);
      }
    });
    setContents(...results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Google Optimize
  const optimize = async () => {
    await window.dataLayer.push({ event: 'optimize.activate' });
  };
  useEffect(() => {
    if (window.dataLayer) {
      optimize();
    }
  }, [contents]);

  const renderHeroSlider = () => {
    if (!contents.heroSlider) return <></>;

    let images = contents.heroSlider;
    let params = '?w=2000&fm=jpg&q=50';
    if (window.screen.width < 768) {
      images = contents.heroSliderMobile;
      params = '?w=450&fm=jpg&q=50';
    }

    return images.map(image => (
      <li key={image.sys.id} style={{ listStyleType: 'none' }}>
        <img src={image.fields.file.url + params} className="hero" alt={image.fields.title} />
      </li>
    ));
  };

  const renderWelcomeText = () => {
    if (!contents.welcomeText) return <></>;
    return contents.welcomeText.content.map(text => <p>{text.content[0].value}</p>);
  };

  const renderAdditionalText = () => {
    if (!contents.additionalText) return <></>;
    const allContents = contents.additionalText.content;
    const allTexts = allContents.filter(({ nodeType }) => nodeType !== 'embedded-asset-block');
    return allTexts.map(eachText => (
      <div>{documentToReactComponents(eachText, contentfulOptions)}</div>
    ));
  };

  const renderApproachBlock = () => {
    if (!contents.approachBlock) return <></>;
    const { content } = contents.approachBlock;
    const approachBlockTitle = content[0].content[0].value;
    const subTitle = content[1].content[0].value;
    const allBlocks = content
      .slice(2, 5)
      .map(block => block.data.target.fields.mainContent.content);
    return (
      <>
        <h1>
          {approachBlockTitle}
          <br />
          {subTitle}
        </h1>
        <Grid container spacing={10}>
          {allBlocks.map(block => (
            <Grid item xs={12} md={4}>
              <img
                src={block[0].data.target.fields.file.url}
                key={block[0].data.target.sys.id}
                alt=""
                className="svg"
              />
              <h2>{block[1].content[0].value}</h2>
              <p>{block[2].content[0].value}</p>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderSections = () => {
    if (!contents.aboutUsContent) return <></>;
    const { content } = contents.aboutUsContent;
    const sectionsTitle = content[0].content[0].value;
    const subTitle1 = content[1].content[0].value;
    const subTitle2 = content[2].content[0].value;
    const sections = content
      .slice(3, 5)
      .map(section => section.data.target.fields.mainContent.content);
    const allTexts = sections.map(each =>
      each.filter(({ nodeType }) => nodeType !== 'embedded-asset-block')
    );
    const allImgs = sections.map(each =>
      each.filter(({ nodeType }) => nodeType === 'embedded-asset-block')
    );

    return (
      <>
        <StyledContainer>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={8} lg={5}>
              <h3>{sectionsTitle}</h3>
            </Grid>
            <Grid item xs={11} lg={6}>
              <h1>
                {subTitle1} <br />
                {subTitle2}
              </h1>
            </Grid>
          </Grid>
        </StyledContainer>
        {mobile ? (
          <div className="mobile-only">
            <img
              src={allImgs[1][1].data.target.fields.file.url}
              alt={allImgs[1][1].data.target.fields.title}
            />
            {allTexts[0].map((text, key) => (
              <p className={`textNum${key}`}>{text.content[0].value}</p>
            ))}
            <img
              src={allImgs[0][1].data.target.fields.file.url}
              alt={allImgs[0][1].data.target.fields.title}
            />
            {allTexts[1].map((text, key) => (
              <p className={`textNum${key}`}>{text.content[0].value}</p>
            ))}
          </div>
        ) : (
          <div className="section4">
            <div className="hundred">
              <div className="image-container right">
                <img
                  src={allImgs[1][0].data.target.fields.file.url}
                  alt={allImgs[1][0].data.target.fields.title}
                />
              </div>
            </div>
            <StyledContainer className="container-left">
              <Grid container item xs={12} lg={6} className="text">
                {allTexts[0].map((text, key) => (
                  <p className={`textNum${key}`}>{text.content[0].value}</p>
                ))}
              </Grid>
            </StyledContainer>
            <div className="hundred">
              <div className="image-container left">
                <img
                  src={allImgs[0][0].data.target.fields.file.url}
                  alt={allImgs[0][0].data.target.fields.title}
                />
              </div>
            </div>
            <StyledContainer className="container-right">
              <Grid container item xs={12} lg={5} className="text">
                {allTexts[1].map((text, key) => (
                  <p className={`textNum${key}`}>{text.content[0].value}</p>
                ))}
              </Grid>
            </StyledContainer>
          </div>
        )}
      </>
    );
  };

  return contents ? (
    <>
      <HeadTags title={title} description={description} />
      <ScrollToTop>
        <div className="aboutus">
          {renderHeroSlider()}
          <Box py={8} className="mobile-padding">
            <StyledContainer className="section1">
              <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={10} lg={8}>
                  <div className="title">
                    <h1>{contents.welcomeHeader}</h1>
                    <img
                      src="http://cdn1.stopagingnow.com/objective/aboutus/slash-desktop.png"
                      alt=""
                      className="slash"
                    />
                  </div>
                  {renderWelcomeText()}
                </Grid>
              </Grid>
            </StyledContainer>
          </Box>
          <Box className="section2 mobile-padding" py={8}>
            {mobile ? (
              <>
                <img
                  src={contents.additionalText.content[6].data.target.fields.file.url}
                  className="mobile-img"
                  alt={contents.additionalText.content[6].data.target.fields.title}
                ></img>
                <Container>
                  <Box>
                    <div className="text">{renderAdditionalText()}</div>
                  </Box>
                  <Link to="/gallery" className="buttonlink mobile-only">
                    Shop Better Health
                  </Link>
                </Container>
              </>
            ) : (
              <div
                style={{
                  backgroundImage: `url("${contents.additionalText.content[4].data.target.fields.file.url.replace(
                    '//images.ctfassets.net/mj9bpefl6wof/',
                    'https://nutranext.imgix.net/'
                  )}?q=50&auto=compress,format")`
                }}
                className="desktop-img"
              >
                <StyledContainer>
                  <Box>
                    <div className="text">{renderAdditionalText()}</div>
                  </Box>
                  <Link to="/gallery" className="buttonlink mobile-only">
                    Shop Better Health
                  </Link>
                </StyledContainer>
              </div>
            )}
          </Box>
          <Box py={8} className="mobile-padding">
            <StyledContainer className="section3">
              <div className="border">
                {renderApproachBlock()}
                <Link to="/gallery" className="buttonlink">
                  Shop Better Health
                </Link>
              </div>
            </StyledContainer>
          </Box>
          <Box py={8} className="section4 mobile-padding">
            {renderSections()}
          </Box>
          <Link to="/gallery" className="buttonlink">
            Shop Better Health
          </Link>
          <Box py={8} className="section5 mobile-padding">
            <Container>
              <h3>Press & Media Inquires?</h3>
              <h1>
                <a href="mailto:press@objectivewellness.com">press@objectivewellness.com</a>
              </h1>
            </Container>
          </Box>
        </div>
      </ScrollToTop>
    </>
  ) : (
    <></>
  );
};

AboutUs.propTypes = {
  location: PropTypes.object.isRequired
};

export default AboutUs;
