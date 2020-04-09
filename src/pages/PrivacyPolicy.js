import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ScrollToTop from '../components/common/ScrollToTop';
import HeadTags from '../components/common/HeadTags';
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

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {htmlData: 'loading...', subtopic: props.computedMatch.params.subtopic};  // get response text
  }

  componentDidMount = () => {
    let path = this.state.subtopic;
    if (!path) {
      path = '';
  }

    const searchUrl = `https://cors-anywhere.herokuapp.com/https://www.thecloroxcompany.com/privacy/` + path + `?ccl-extract=main`;
    const regex = /privacy/g;
    console.log(searchUrl);

    fetch(searchUrl, {headers: {Origin: "https://www.objectivewellness.com"}})
       .then(response => response.text())
       .then(text => {
          let page = text
            .replace('<a href="/brands/">', '<a href="https://www.thecloroxcompany.com/brands/" target=_blank>')
            .replace(/<a href="\/privacy(\/[a-z0-9-]+)\/"/g, '<a href="/privacypolicy$1"')
            .replace('<a href="/privacy/"', '<a href="/privacypolicy"')
            .replace('<a href="#', '<a href="'+ window.location.pathname + '#');

          this.setState({ htmlData: page });
        })
  }

  render() {
    const htmlData = this.htmlData;

    return (
    <>
      <ScrollToTop>
        <StyledBackground>
          <StyledContainer className="privacypolicy-container">
            <Grid dangerouslySetInnerHTML={{ __html: this.state.htmlData }}></Grid>
          </StyledContainer>
        </StyledBackground>
      </ScrollToTop>
    </>
    )
  }
}

export default PrivacyPolicy;
