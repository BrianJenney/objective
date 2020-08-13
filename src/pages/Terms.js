import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LoadingSpinner from '../components/LoadingSpinner';
import { requestPage } from '../modules/static/actions';

import { generateComponents } from './static/transformComponents';
import ScrollToTop from '../components/common/ScrollToTop';
import HeadTags from '../components/common/HeadTags';

export const StyledBackground = withStyles(theme => ({
  root: {
    backgroundColor: '#fdfbf9',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      backgroundColor: '#fdfbf9'
    }
  }
}))(Box);

export const StyledContainer = withStyles(theme => ({
  root: {
    paddingTop: 70,
    paddingBottom: 40,
    width: 1195,
    [theme.breakpoints.down('xs')]: {
      padding: '38px 0 40px',
      backgroundColor: '#fdfbf9',
      width: '100%'
    }
  }
}))(Container);

const Terms = ({ location }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const slug = location.pathname.substring(1);
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description, indexThisPage } = seoMap[slug];
  const page = useSelector(state => state.page);

  useEffect(() => {
    if (!pageLoaded) dispatch(requestPage(slug));
  }, []);

  useEffect(() => {
    if (page.template && page.template === 'Terms') {
      setPageLoaded(true);
      window.analytics.page('Terms');
    }
  }, [page]);
  let FinalPage = null;
  if (pageLoaded) {
    FinalPage = () => generateComponents(page, xs);
  }

  if (FinalPage) {
    return (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
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

Terms.propTypes = { location: { pathname: PropTypes.string } };

export default Terms;
