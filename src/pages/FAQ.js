import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import LoadingSpinner from '../components/LoadingSpinner';
import { requestPage } from '../modules/static/actions';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { generateComponents } from './faq/faqComponents';
import ScrollToTop from '../components/common/ScrollToTop';
import HeadTags from '../components/common/HeadTags';


import {
  StyledBackground,  
  StyledContainer  
} from './faq/StyledComponents';


const FAQ = ({ location }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const slug = location.pathname.substring(1);
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description } = seoMap[slug];
  const page = useSelector(state => state.page);
  
  useEffect(() => {
    if (!pageLoaded) dispatch(requestPage(slug));
  }, []);
  
  useEffect (() => {
    if (page.hasOwnProperty('template')) {
      setPageLoaded(true);
      window.analytics.page('FAQ');
    }
  }, [page]);
  let FinalPage = null;  
  if (pageLoaded) {
    FinalPage = () =>  generateComponents(page, xs)
  }

  if (FinalPage) {
    return (
      <>
        <HeadTags title={title} description={description} />
          <ScrollToTop>
            <StyledBackground>
              <StyledContainer>
                <FinalPage />
              </StyledContainer>
            </StyledBackground>
          </ScrollToTop>
      </>
    );
  }
  return <LoadingSpinner loadingMessage="...loading" page="lp" />;
};

export default FAQ;
