import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { OBJECTIVE_HOMEPAGE, OBJECTIVE_HERO } from '../constants/contentfulEntries';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';
import HeadTags from '../components/common/HeadTags';
import { contentfulClient } from '../utils/contentful';
import { HomeVariantCard } from './home/';
import ScrollToTop from '../components/common/ScrollToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import ContentfulHero from '../components/ContentfulHero';

import './home/home-style.scss';
import { StyledContainer } from '../assets/styles/StyledComponents';

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=825&fm=jpg&q=80';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=80';
      }

      return (
        <img src={node.data.target.fields.file.url + params} alt={node.data.target.fields.title} />
      );
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
          content: {
            ...content
          }
        });
      })
      .catch(err => {
        throw err;
      });
    contentfulClient
      .getEntries({ content_type: 'homepageBestsellers' })
      .then(entry => {
        const products = entry.items;
        this.setState({
          carousel: {
            ...products
          }
        });
      })
      .catch(err => {
        throw err;
      });
    // contentfulClient
    //   .getEntry(OBJECTIVE_HERO)
    //   .then(entry => {
    //     const content = entry.fields;
    //     this.setState({
    //       contentfulHero: {
    //         ...content
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     throw err;
    //   });
    if (!homePageTracked) {
      window.analytics.page('Home');
    }
  }

  renderHeroSlider() {
    // if (this.state.contentfulHero) return <ContentfulHero content={this.state.contentfulHero} />;
    return <ContentfulHero />;
    // Here we will conditionally render the contentful hero
    // UNCOMMENT BELOW AFTER ADDING TRUE CONTENTFUL SUPPORT
    // if (!this.state.content.heroSlider) return <></>;

    // let images = this.state.content.heroSlider;
    // let params = '?w=2000&fm=jpg&q=80';

    // if (window.screen.width < 768) {
    //   images = this.state.content.heroSliderMobile;
    //   params = '?w=450&fm=jpg&q=80';
    // }

    // const hero = images.map(image => (
    //   <li key={image.sys.id}>
    //     <img
    //       src={image.fields.file.url + params}
    //       style={{ width: '100%' }}
    //       alt={image.fields.title}
    //     />
    //   </li>
    // ));

    // return (
    //   <Link
    //     to="/gallery"
    //     segmentProperties={{
    //       cta: 'Shop All',
    //       destination: '/gallery',
    //       site_location: 'home',
    //       text: 'Targeted Health Solutions for You and Yours'
    //     }}
    //     onClick={this.segmentTrackBannerClicked}
    //   >
    //     <ul>{hero}</ul>
    //   </Link>
    // );
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
        <StyledContainer className="section-container">
          <Grid container className="section-holder">
            <Grid item xs={12} md={6} className="section">
              {documentToReactComponents(section.fields.mainContent, contentfulOptions)}
            </Grid>
          </Grid>
        </StyledContainer>
      </div>
    ));
  }

  renderBestsellers() {
    if (!this.props.products) {
      return null;
    }

    const bestsellers = [];
    const { carousel } = this.state;

    if (carousel) {
      Object.values(carousel).forEach(value => {
        if (value.fields.identifier === 'bestsellers') {
          value.fields.products.forEach(product => {
            bestsellers.push(product.fields.sku);
            if (bestsellers.length >= 5) {
              bestsellers.pop();
            }
          });
        }
      });
    }

    const bpsOrdered = [];
    bestsellers.forEach(sku => {
      bpsOrdered.push(this.props.products.find(product => product.sku.split('-')[0] === sku));
    });

    return (
      <div className="home-bestsellers beige-bg">
        <StyledContainer>
          <Box py={10}>
            {documentToReactComponents(
              this.state.content.bestsellers.content[0],
              contentfulOptions
            )}
            <Grid container spacing={3}>
              {bpsOrdered.map(variant => (
                <HomeVariantCard variant={variant} key={variant.id} />
              ))}
            </Grid>
            <Box style={{ paddingTop: 53, display: 'flex', justifyContent: 'center' }}>
              {documentToReactComponents(
                this.state.content.bestsellers.content[2],
                contentfulOptions
              )}
            </Box>
          </Box>
        </StyledContainer>
      </div>
    );
  }

  renderFamily() {
    if (!this.props.products) {
      return null;
    }

    const family = [];
    const { carousel } = this.state;

    if (carousel) {
      Object.values(carousel).forEach(value => {
        if (value.fields.identifier === 'solutions_whole_family') {
          value.fields.products.forEach(product => {
            family.push(product.fields.sku);
            if (family.length >= 5) {
              family.pop();
            }
          });
        }
      });
    }

    const fpsOrdered = [];
    family.forEach(sku => {
      fpsOrdered.push(this.props.products.find(product => product.sku.split('-')[0] === sku));
    });

    return (
      <div className="his-hers-theirs beige-bg">
        <StyledContainer>
          <Box py={10}>
            {documentToReactComponents(
              this.state.content.solutionForFamily.content[0],
              contentfulOptions
            )}
            <div className="subheader">
              {documentToReactComponents(
                this.state.content.solutionForFamily.content[1],
                contentfulOptions
              )}
            </div>
            <Grid container spacing={3}>
              {fpsOrdered.map(variant => (
                <HomeVariantCard variant={variant} key={variant.id} />
              ))}
            </Grid>
            <Box className="carousel-btn-shopAll">
              {documentToReactComponents(
                this.state.content.solutionForFamily.content[3],
                contentfulOptions
              )}
            </Box>
          </Box>
        </StyledContainer>
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
            {/* <Link
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
            </Link> */}
            {this.renderHeroSlider()}
            <StyledContainer>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="welcome"
              >
                <Grid item xs={12} md={3}>
                  <h1>{welcomeHeader}</h1>
                </Grid>
                <Grid item xs={12} md={6}>
                  <p>{welcomeText}</p>
                </Grid>
              </Grid>
            </StyledContainer>
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

Home.propTypes = {
  products: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  seoMap: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(Home));
