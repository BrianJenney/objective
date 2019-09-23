import React, { Component } from 'react';

import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';
import { OBJECTIVE_HOMEPAGE } from '../constants/contentfulEntries';

import Container from '@material-ui/core/Container';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

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

  renderContent() {
    if (!this.state.content)
      return <></>;

    let { welcomeText, introText } = this.state.content;

    return (
      <Container>
        <h1>{ welcomeText }</h1>
        <p>{ introText }</p>
      </Container>
    );
  }

  render() {
    return this.renderContent();
  }
};
