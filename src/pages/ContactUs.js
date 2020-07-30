import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import LoadingSpinner from '../components/LoadingSpinner';
import { requestPage } from '../modules/static/actions';
import { generateComponents } from './static/transformComponents';
import ScrollToTop from '../components/common/ScrollToTop';
import HeadTags from '../components/common/HeadTags';

const StyledBackground = withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.5)',
    padding: '90px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      backgroundColor: '#FFF'
    }
  }
}))(Box);

const StyledContainer = withStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '30px 0px',
      height: 'auto',
      width: 'auto'
    }
  }
}))(Container);

const ContactUs = ({ location }) => {
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
    if (page && page.template) {
      setPageLoaded(true);
      window.analytics.page('Contact');
    }
  }, [page]);
  let FinalPage = null;
  if (pageLoaded) {
    FinalPage = () => generateComponents(page, xs);
  }

  if (FinalPage) {
    return (
      <div className="ContactUs">
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        <ScrollToTop>
          <StyledBackground>
            <StyledContainer>
              <FinalPage />
            </StyledContainer>
          </StyledBackground>
        </ScrollToTop>
      </div>
    );
  }
  return <LoadingSpinner loadingMessage="...loading" page="contact" />;
};

ContactUs.propTypes = { location: PropTypes.object.isRequired };

export default ContactUs;
