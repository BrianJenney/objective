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
import HeadTags from '../components/common/HeadTags';
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

      return <img src={node.data.target.fields.file.url + params} alt={node.data.target.fields.title} />;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Link to={node.data.uri} className="shopAllLink" onClick={() => window.scrollTo(0, 0)}>
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
    contentfulClient
      .getEntries({ content_type: 'homepageBestsellers' })
      .then(entry => {
        const products = entry.items;
        this.setState({
          ...this.state,
          carousel: {
            ...products
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
    let params = '?w=2000&fm=jpg';

    if (window.screen.width < 768) {
      images = this.state.content.heroSliderMobile;
      params = '?w=450&fm=jpg';
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
        className={`sectionNum${this.state.content.homepageSection.indexOf(section)}`}
        key={section.sys.id}
        style={{
          backgroundImage: `url("${section.fields.mainContent.content[4].data.target.fields.file.url.replace(
            '//images.ctfassets.net/mj9bpefl6wof/',
            'https://nutranext.imgix.net/'
          )}?q=50&auto=compress,format")`
        }}
      >
        <Container className="section-container">
          <Box className="section-holder">
            <div className="section">{documentToReactComponents(section.fields.mainContent, contentfulOptions)}</div>
          </Box>
        </Container>
      </div>
    ));
  }

  renderBestsellers() {
    if (!this.props.products) {
      return null;
    }

    const bestsellers = [];

    if (this.state.carousel) {
      const { carousel } = this.state;
      for (const key in carousel) {
        if (carousel[key].fields.identifier === 'bestsellers') {
          carousel[key].fields.products.map(product => {
            bestsellers.push(product.fields.sku);
            if (bestsellers.length >= 4) {
              bestsellers.pop();
            }
          });
        }
      }
    } else {
      return null;
    }

    const bps = this.props.products.filter(product => bestsellers.includes(product.sku.split('-')[0]));

    return (
      <div className="home-bestsellers beige-bg">
        <Container>
          <Box py={10}>
            {documentToReactComponents(this.state.content.bestsellers.content[0], contentfulOptions)}
            <Grid container spacing={3}>
              {bps.map(variant => (
                <HomeVariantCard variant={variant} key={variant.id} />
              ))}
            </Grid>
            <Box style={{ paddingTop: 90 }}>
              {documentToReactComponents(this.state.content.bestsellers.content[2], contentfulOptions)}
            </Box>
          </Box>
        </Container>
      </div>
    );
  }

  renderFamily() {
    if (!this.props.products) {
      return null;
    }

    const family = [];

    if (this.state.carousel) {
      const { carousel } = this.state;
      for (const key in carousel) {
        if (carousel[key].fields.identifier === 'solutions_whole_family') {
          carousel[key].fields.products.map(product => {
            family.push(product.fields.sku);
            if (family.length >= 4) {
              family.pop();
            }
          });
        }
      }
    } else {
      return null;
    }

    const fps = this.props.products
      .filter(product => family.includes(product.sku.split('-')[0]))
      .map(product => product);

    return (
      <div className="his-hers-theirs beige-bg">
        <Container>
          <Box py={10}>
            {documentToReactComponents(this.state.content.solutionForFamily.content[0], contentfulOptions)}
            {documentToReactComponents(this.state.content.solutionForFamily.content[1], contentfulOptions)}
            <Grid container spacing={3}>
              {fps.map(variant => (
                <HomeVariantCard variant={variant} key={variant.id} />
              ))}
            </Grid>
            <Box style={{ paddingTop: 90 }}>
              {documentToReactComponents(this.state.content.solutionForFamily.content[3], contentfulOptions)}
            </Box>
          </Box>
        </Container>
      </div>
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
    const { title, description } = this.props.seoMap['/'];
    return (
      <>
        <HeadTags title={title} description={description} />
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
            <>{this.renderBestsellers()}</>
            <>{this.renderSections()}</>
            <>{this.renderFamily()}</>
          </div>
        </ScrollToTop>
      </>
    );
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = state => ({
  products: state.catalog.variants,
  seoMap: state.storefront.seoMap
});

export default withRouter(connect(mapStateToProps)(Home));
