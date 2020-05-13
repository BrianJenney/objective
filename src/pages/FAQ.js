import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { requestPage } from '../modules/static/actions';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { generateComponents } from './faq/faqComponents';
import ScrollToTop from '../components/common/ScrollToTop';
import HeadTags from '../components/common/HeadTags';

import ContactMail from '../components/common/Icons/ContactMail/ContactMail';
import ContactPhone from '../components/common/Icons/ContactPhone/ContactPhone';
import {
  StyledBackground,
  StyledTitle,
  StyledContainer,
  StyledSubheaders,
  QAContainer,
  StyledQuestions,
  StyledAnswers,
  StyledA,
  StyledAnswerContainer,
  StyledText,
  StyledLink
} from './faq/StyledComponents';



import {
  StyledContainerBackground,
  StyledHeader,
  StyledSubHeader,
  StyledHours,
  StyledParagraph1,
  StyledParagraph2,
  StyledPhoneNumber,
  StyledEmail,
  StyledMoreQuestions
} from './contactUs/StyledComponents';


const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    height: 270,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      height: 'auto'
    }
  },
  phoneGrid: {
    borderRight: '1px solid #979797',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '600px',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      borderRight: 'none',
      borderBottom: '1px solid #979797',
      marginBottom: 33.9
    }
  },
  mailGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '600px',
    paddingTop: 10,
    [theme.breakpoints.down('xs')]: {
      width: 'auto'
    }
  }
}));

const StyledBackgroundContactUs = withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.5)',
    padding: '20px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      backgroundColor: '#FFF'
    }
  }
}))(Box);

const FAQ = ({ location }) => {
  const classes = useStyles();
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
    FinalPage = () =>  generateComponents(page)
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
