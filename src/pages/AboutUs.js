import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from '../components/common';
import ScrollToTop from '../components/common/ScrollToTop';
import './about/about-styles.scss';
import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_ABOUTUS } from '../constants/contentfulEntries';
import { receivedLoginFailure } from '../modules/account/actions';

// Contentful
const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
  host: process.env.REACT_APP_CONTENTFUL_HOSTNAME
});

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=825&fm=jpg&q=50';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
      }

      return (
        <img
          src={node.data.target.fields.file.url + params}
          alt={node.data.target.fields.title}
        />
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

const AboutUs = () => {
  const { log } = console;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [contents, setContents] = useState();
  // Fetch data from Contentful
  const fetchData = async () => {
    const results = [];
    const response = await contentfulClient.getEntries({
      content_type: 'aboutUs'
    });
    const entries = response.items.forEach(entry => {
      if (entry.fields) {
        results.push(entry.fields);
      }
    });
    setContents(...results);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <img src={image.fields.file.url + params} className="hero" />
      </li>
    ));
  };
  log('response-testing', contents);
  // const segmentTrackBannerClicked = () => {
  //   window.analytics.track('Banner Clicked', segmentProperties);
  // };
  const renderWelcomeText = () => {
    if (!contents.welcomeText) return <></>;
    return contents.welcomeText.content.map(text => (
      <p>{text.content[0].value}</p>
    ));
  };

  const renderAdditionalText = () => {
    if (!contents.additionalText) return <></>;
    const allContents = contents.additionalText.content;
    const allTexts = allContents.filter(
      ({ nodeType }) => nodeType !== 'embedded-asset-block'
    );
    return allTexts.map(eachText => (
      <div>{documentToReactComponents(eachText, contentfulOptions)}</div>
    ));
  };

  const renderApproachBlock = () => {
    if (!contents.approachBlock) return <></>;
    const { content } = contents.approachBlock;
    const title = content[0].content[0].value;
    const subTitle = content[1].content[0].value;
    const allBlocks = content
      .slice(2, 5)
      .map(block => block.data.target.fields.mainContent.content);
    log('allblocks-testing', allBlocks);
    return (
      <>
        <h1>
          {title}
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

  return contents ? (
    <ScrollToTop>
      <div className="aboutus">
        {renderHeroSlider()}
        <Box py={8} className="mobile-padding">
          <Container className="section1">
            <div className="title">
              <h1>{contents.welcomeHeader}</h1>
              <img
                src="http://cdn1.stopagingnow.com/objective/aboutus/slash-desktop.png"
                alt=""
                className="slash"
              />
            </div>
            {renderWelcomeText()}
          </Container>
        </Box>
        <Box className="section2 mobile-padding" py={8}>
          {mobile ? (
            <>
              <img
                src={
                  contents.additionalText.content[6].data.target.fields.file.url
                }
                className="mobile-img"
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
                <Container>
                  <Box>
                    <div className="text">{renderAdditionalText()}</div>
                  </Box>
                  <Link to="/gallery" className="buttonlink mobile-only">
                    Shop Better Health
                </Link>
                </Container>
              </div>
            )}
        </Box>
        <Box py={8} className="mobile-padding">
          <Container className="section3">
            <div className="border">
              {renderApproachBlock()}
              <Link to="/gallery" className="buttonlink">
                Shop Better Health
              </Link>
            </div>
          </Container>
        </Box>
        <Box py={8} className="section4 mobile-padding">
          <h3>A Little More You Should Know...</h3>
          <h1>
            The objective take on <br />
            labeling & manufacturing
          </h1>
          <div className="hundred xs-hidden">
            <div className="left fifty">
              <Container className="container-left">
                <p className="tagline">What you see is what you get</p>
                <p>
                  The ingredients, amounts and forms you find in the supplement
                  facts section of our labels are what you’ll find
                  inside—verified, validated and guaranteed. And we
                  intentionally designed our labels to make it easy for you to
                  see what’s inside and what it will do for you—whether you’re
                  scrutinizing the supplement facts or glancing at the front of
                  the package.
                </p>
              </Container>
              <img src="https://cdn1.stopagingnow.com/objective/aboutus/ingredients-desktop.png" />
            </div>
            <div className="right fifty">
              <img src="https://cdn1.stopagingnow.com/objective/aboutus/bottle-desktop.png" />
              <Container className="container-right">
                <p className="tagline">We play it safe and by the rules</p>
                <p>
                  All of our supplements are manufactured in the United States.
                  We gather the raw ingredients from across the globe, bring
                  them here, quarantine them, identify them, test them for
                  purity and potency. Then we test and validate the finished
                  products all over again.
                </p>
                <p>
                  We work with a handful of manufacturers who meticulously
                  adhere to the Food and Drug Administration’s (FDA) Current
                  Good Manufacturing Procedures (cGMP). These facilities are
                  regularly inspected and certified by the FDA. Frankly, any
                  supplement you take should be able to say this. If they
                  don’t—run, don’t walk.
                </p>
              </Container>
            </div>
          </div>
          <div className="mobile-only">
            <img src="https://cdn1.stopagingnow.com/objective/aboutus/bottle-mobile.png" />
            <p className="tagline">What you see is what you get</p>
            <p>
              The ingredients, amounts and forms you find in the supplement
              facts section of our labels are what you’ll find inside—verified,
              validated and guaranteed. And we intentionally designed our labels
              to make it easy for you to see what’s inside and what it will do
              for you—whether you’re scrutinizing the supplement facts or
              glancing at the front of the package.
            </p>
            <img src="https://cdn1.stopagingnow.com/objective/aboutus/ingredients-mobile.png" />
            <p className="tagline">We play it safe and by the rules</p>
            <p>
              All of our supplements are manufactured in the United States. We
              gather the raw ingredients from across the globe, bring them here,
              quarantine them, identify them, test them for purity and potency.
              Then we test and validate the finished products all over again.
            </p>
            <p>
              We work with a handful of manufacturers who meticulously adhere to
              the Food and Drug Administration’s (FDA) Current Good
              Manufacturing Procedures (cGMP). These facilities are regularly
              inspected and certified by the FDA. Frankly, any supplement you
              take should be able to say this. If they don’t—run, don’t walk.
            </p>
          </div>
          <Link to="/gallery" className="buttonlink">
            Shop Better Health
          </Link>
        </Box>
        <Box py={8} className="section5 mobile-padding">
          <Container>
            <h3>Press & Media Inquires?</h3>
            <h1>
              <a href="mailto:press@objectivewellness.com">
                press@objectivewellness.com
              </a>
            </h1>
          </Container>
        </Box>
      </div>
    </ScrollToTop>
  ) : (
      <></>
    );
};

export default AboutUs;
