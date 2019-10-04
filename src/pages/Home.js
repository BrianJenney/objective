import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import './home/home-style.scss';
import { HomeVariantCard } from './home/';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=825&fm=jpg&q=90';

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    contentfulClient
      .getEntry(OBJECTIVE_HOMEPAGE)
      .then(entry => {
        let content = entry.fields;

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
  }

  renderHeroSlider() {
    if (!this.state.content.heroSlider) return <></>;

    let images = this.state.content.heroSlider;
    let params = '?w=2000&fm=jpg&q=90';

    if (window.screen.width < 768) {
      images = this.state.content.heroSliderMobile;
      params = '?w=450&fm=jpg&q=90';
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
      <div className="section" key={section.sys.id}>
        {documentToReactComponents(
          section.fields.mainContent,
          contentfulOptions
        )}
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
      '5ceec52ba686a03bccfa67c5'
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

  renderContent() {
    if (!this.state.content) return <></>;

    let { welcomeHeader, welcomeText } = this.state.content;

    return (
      <div className="home-style">
        <Link to="/gallery">
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
            </Box>
          </Container>
        </div>
        <Container className="section-container">
          <Box py={10} className="section-holder">
            {this.renderSections()}
          </Box>
        </Container>
        <div className="his-hers-theirs beige-bg">
          <Container>
            <Box py={10}>
              <h1>HIS, HERS & THEIRS</h1>
              <p>Solutions for the whole family</p>
              <Grid container spacing={3} className="solutions-container">
                {this.renderFamily()}
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = state => ({
  products: state.catalog.variants
});

export default connect(mapStateToProps)(Home);
