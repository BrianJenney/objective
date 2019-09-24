import React, { Component } from 'react';

import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Container from '@material-ui/core/Container';

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
    contentfulClient.getEntry(OBJECTIVE_HOMEPAGE)
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
    if (!this.state.content.heroSlider)
      return <></>;

    return this.state.content.heroSlider.map(image => 
      <li><img src={image.fields.file.url} /></li>
    );
  }

  renderSections() {
    if (!this.state.content.homepageSection)
      return <></>;

    return this.state.content.homepageSection.map(section =>
      <div className="homepage-section">
        {documentToReactComponents(
          section.fields.mainContent,
          contentfulOptions
        )}
      </div>
    );
  }

  renderContent() {
    if (!this.state.content)
      return <></>;

    let { welcomeHeader, welcomeText } = this.state.content;

    return (
      <Container>
        <ul>
          {this.renderHeroSlider()}
        </ul>
        <h1>{ welcomeHeader }</h1>
        <p>{ welcomeText }</p>
        {this.renderSections()}
      </Container>
    );
  }

  render() {
    return this.renderContent();
  }
};
