import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { requestPrivacy } from '../../modules/static/actions';
import LoadingSpinner from '../../components/LoadingSpinner';
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
    }
  }, [page]);

  let FinalPage = () =>
      <>
        <StyledBackground>
          <StyledContainer className="privacypolicy-container">
            <LoadingSpinner loadingMessage="Loading ..." page="gallery" />
          </StyledContainer>
        </StyledBackground>
      </>

  if (pageLoaded) {
    FinalPage = () =>
      <>
        <StyledBackground>
          <StyledContainer className="privacypolicy-container">
            { parse(page.html) }
          </StyledContainer>
        </StyledBackground>
      </>
  }

  return <FinalPage />;
};

export default withRouter(PrivacyPage);
