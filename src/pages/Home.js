import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';


import './home/home-style.scss';
import { HomeVariantCard } from './home/';
import ScrollToTop from '../components/common/ScrollToTop';
import LoadingSpinner from '../components/LoadingSpinner';

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

const homePageTracked = false;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    contentfulClient
      .getEntry(OBJECTIVE_HOMEPAGE)
      .then(entry => {
        const content = entry.fields;
        // console.log('content', content)
        this.setState({
          ...this.state,
          content: {
            ...content
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    if (!homePageTracked) {
      window.analytics.page('Home');
    }
  }

  renderHeroSlider() {
    if (!this.state.content.heroSlider) return <></>;

    let images = this.state.content.heroSlider;
    let params = '?w=2000&fm=jpg&q=50';

    if (window.screen.width < 768) {
      images = this.state.content.heroSliderMobile;
      params = '?w=450&fm=jpg&q=50';
    }

    return images.map(image => (
      <li key={image.sys.id}>
        <img src={image.fields.file.url + params} style={{ width: '100%' }} />
      </li>
    ));
  }

  renderSections() {
    if (!this.state.content.homepageSection) return <></>;

    return this.state.content.homepageSection.map(section => (
      <div
        className={`sectionNum${this.state.content.homepageSection.indexOf(
          section
        )}`}
        key={section.sys.id}
        style={{
          backgroundImage: `url("${section.fields.mainContent.content[4].data.target.fields.file.url.replace(
            '//images.ctfassets.net/mj9bpefl6wof/',
            'https://nutranext.imgix.net/'
          )
            }?q=50&auto=compress,format")`
        }}
      >
        <Container className="section-container">
          <Box className="section-holder">
            <div className="section">
              {documentToReactComponents(
                section.fields.mainContent,
                contentfulOptions
              )}
            </div>
          </Box>
        </Container>
      </div>
    ));
  }

  renderBestsellers() {
    if (!this.props.products) {
      return null;
    }

    const bestsellers = [
      '5d8bb76ff5005515a437d4c8',
      '5ceebfdca686a03bccfa67c0',
      '5d8bb840f5005515a437d4cb'
    ];

    const bps = this.props.products
      .filter(product => bestsellers.includes(product.id))
      .map(product => product);

    return (
      <>
        {bps.map(variant => (
          <HomeVariantCard variant={variant} key={variant.id} />
        ))}
      </>
    );
  }

  renderFamily() {
    if (!this.props.products) {
      return null;
    }

    const family = [
      '5d8ba4f6f5005515a437d4be',
      '5ce6d310585756469c36e250',
      '5d8ba8a1f5005515a437d4c2'
    ];

    const fps = this.props.products
      .filter(product => family.includes(product.id))
      .map(product => product);

    return (
      <>
        {fps.map(variant => (
          <HomeVariantCard variant={variant} key={variant.id} />
        ))}
      </>
    );
  }

  /*
   *
   * @description - Track Segment Banner Clicked event
   * @return void
   *
   */

  segmentTrackBannerClicked() {
    window.analytics.track('Banner Clicked', this.segmentProperties);
  }

  navigateToTop = url => {
    this.props.history.push(url);
    window.scrollTo(0, 0);
  };

  renderContent() {
    if (!this.state.content)
      return (
        <ScrollToTop>
          <LoadingSpinner loadingMessage="Loading ..." page="home" />;
        </ScrollToTop>
      );

    const { welcomeHeader, welcomeText } = this.state.content;

    return (
      <ScrollToTop>
        <div className="home-style">
          <Link
            to="/gallery"
            segmentProperties={{
              cta: 'Shop All',
              destination: '/gallery',
              site_location: 'home',
              text: 'Targeted Health Solutions for You and Yours'
            }}
            onClick={this.segmentTrackBannerClicked}
          >
            <ul>{this.renderHeroSlider()}</ul>
          </Link>
          <Container>
            <Box py={10} className="welcome">
              <h1>{welcomeHeader}</h1>
              <p>{welcomeText}</p>
            </Box>
          </Container>
          <div className="home-bestsellers beige-bg">
            <Container>
              <Box py={10}>
                <h1>Our Bestsellers</h1>
                <Grid container spacing={3} className="best-container">
                  {this.renderBestsellers()}
                </Grid>
                <Box style={{ paddingTop: 90 }}>
                  <Link
                    to="/gallery"
                    className="shopAllLink"
                    onClick={this.navigateToTop.bind(this, '/gallery')}
                  >
                    Shop All
                  </Link>
                </Box>
              </Box>
            </Container>
          </div>
          <>{this.renderSections()}</>
          <div className="his-hers-theirs beige-bg">
            <Container>
              <Box py={10}>
                <h1>HIS, HERS & THEIRS</h1>
                <p>Solutions for the whole family</p>
                <Grid container spacing={3} className="solutions-container">
                  {this.renderFamily()}
                </Grid>
                <Box style={{ paddingTop: 90 }}>
                  <Link
                    to="/gallery"
                    className="shopAllLink"
                    onClick={this.navigateToTop.bind(this, '/gallery')}
                  >
                    Shop All
                  </Link>
                </Box>
              </Box>
            </Container>
          </div>
        </div>
      </ScrollToTop>
    );
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = state => ({
  products: state.catalog.variants
});

export default withRouter(connect(mapStateToProps)(Home));
