import React, { Component } from 'react';

import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import './home/home-style.scss';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <img
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.title}
        />
      );
    }
  }
};

export default class Home extends Component {
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

    return this.state.content.heroSlider.map(image => (
      <li>
        <img src={image.fields.file.url} style={{ width: '100%' }} />
      </li>
    ));
  }

  renderSections() {
    if (!this.state.content.homepageSection) return <></>;

    return this.state.content.homepageSection.map(section => (
      <div className="section">
        {documentToReactComponents(
          section.fields.mainContent,
          contentfulOptions
        )}
      </div>
    ));
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
              <p>TILES HERE!</p>
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
              <p>Solutions for the whole family!</p>
              <p>TILES HERE!</p>
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
