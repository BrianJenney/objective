import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { requestPrivacy } from '../../modules/static/actions';
import parse, { domToReact } from 'html-react-parser';
import {
  StyledBackground,
  StyledContainer,
} from './PrivacyPage/StyledComponents';

import './PrivacyPage/style.scss';

const PrivacyPage = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tracked, setTracked] = useState(false);
  const page = useSelector(state => state.page);

  useEffect(() => {
    if (pageLoaded === false) {
      dispatch(requestPrivacy(slug));
      window.scrollTo(0, 0)
    }
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    if (page.hasOwnProperty('html')) {
      // check for components here.
      setPageLoaded(true);
      if (tracked === false) {
        setTracked(true);
        window.analytics.page(`Privacy: ${slug}`);
      }
    }
  }, [page]);

  let FinalPage = null;
  if (pageLoaded) {
    console.log("Builing privacy page");

    // This code replaces the links by react links to avoid page reload
    const options = {
      replace: ({ attribs, children }) => {
        if (!attribs) return;
        if (attribs.class === 'privacyLink') {
          return (
            <Link to={attribs.href} activeClassName="active">{domToReact(children, options)}</Link>
          );
        }
      }
    };

    FinalPage = () =>
      <>
        <StyledBackground>
          <StyledContainer className="privacypolicy-container">
            { parse(page.html, options) }
          </StyledContainer>
        </StyledBackground>
      </>
  }

  if (FinalPage) {
    return <FinalPage />;
  }
  return (
      <>
        <StyledBackground>
          <StyledContainer className="privacypolicy-container">
          </StyledContainer>
        </StyledBackground>
      </>  )
};

export default withRouter(PrivacyPage);
