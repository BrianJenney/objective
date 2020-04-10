import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ScrollToTop from '../components/common/ScrollToTop';
import HeadTags from '../components/common/HeadTags';
import Scrollchor from 'react-scrollchor';
import {
  StyledBackground,
  StyledTitle,
  StyledContainer,
  ParagraphContainer,
  StyledParagraph,
  StyledSubheaders,
  StyledParagraphHeader,
  StyledLink
} from './privacyPolicyAndTerms/StyledComponents';

import './privacyPolicyAndTerms/style.scss';

var parse = require('html-react-parser');

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subtopic: props.computedMatch.params.subtopic,
      htmlRaw: "Loading..."
    };
  }

  componentDidMount = () => {
    let path = this.state.subtopic;
    if (!path) {
      path = '';
    }

    const searchUrl = `https://cors-anywhere.herokuapp.com/https://www.thecloroxcompany.com/privacy/` + path + `?ccl-extract=main`;

    fetch(searchUrl, {headers: {Origin: "https://www.objectivewellness.com"}})
       .then(response => response.text())
       .then(text => {
          const page = text
            .replace('<a href="/brands/">', '<a href="https://www.thecloroxcompany.com/brands/" target=_blank>')
            .replace(/<a href="\/privacy(\/[a-z0-9-]+)\/"/g, '<a href="/privacypolicy$1"')
            .replace('<a href="/privacy/"', '<a href="/privacypolicy"');
          this.setState({htmlRaw: page});
        })
  }

  render() {
    return (
    <>
        <StyledBackground>
          <StyledContainer className="privacypolicy-container">
            { parse(this.state.htmlRaw) }
          </StyledContainer>
        </StyledBackground>
    </>
    )
  }
}

export default PrivacyPolicy;
