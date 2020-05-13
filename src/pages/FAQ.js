import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import LoadingSpinner from '../../components/LoadingSpinner';
import { requestPage } from '../modules/static/actions';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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
  window.analytics.page('FAQ');
  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description } = seoMap[location.pathname.substring(1)];
  const page = useSelector(state => state.page);
  useEffect(() => {
    if (pageLoaded === false) dispatch(requestPage(slug));
  }, []);
  
  console.log('testing----',page)
  return (
    <>
    <div>HELLO </div>
    </>
    // <>
    //   <HeadTags title={title} description={description} />
    //   <ScrollToTop>
    //     <StyledBackground>
    //       <StyledContainer>
    //         <Box>
    //           <Grid>
    //             <Box textAlign="center">
    //               <StyledTitle>Frequently Asked Questions HELLO</StyledTitle>
    //             </Box>
    //           </Grid>
    //           <Grid>
    //             <Box>
    //               <StyledSubheaders>ORDERS & SHIPPING</StyledSubheaders>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: How do I track my order?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     You will receive an email with tracking information
    //                     within 24-48 hours of placing your order. You can also
    //                     easily track orders by logging into your account.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: When can I expect my order?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     Please allow 1 business day for order processing. Once
    //                     your order ships, it should arrive in 3 business days.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: Can I cancel or change my order once it is processed?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     Once your order has processed it cannot be canceled or
    //                     changed.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: When will my credit card be charged?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     Your credit card will be charged once your order has
    //                     shipped.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: Where can I find a list of my past orders?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     You can access a list of your previous orders by logging
    //                     into your account and selecting Your Orders.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer style={{ marginBottom: 55 }}>
    //                 <StyledQuestions>
    //                   Q: Do you ship internationally?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     We aren’t shipping internationally yet, but stay tuned!
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //             </Box>
    //           </Grid>
    //           <Grid>
    //             <Box>
    //               <StyledSubheaders>RETURN POLICY</StyledSubheaders>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: What is your return policy?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     It’s simple. If you’re not 100% satisfied with your
    //                     purchase, contact Customer Care at{' '}
    //                     <StyledLink href="tel:800-270-5771">
    //                       800-270-5771
    //                     </StyledLink>{' '}
    //                     within 90 days of your order ship date. No need to
    //                     return the product(s). Shipping and handling fees are
    //                     not refundable. Orders that are past the 90 days are not
    //                     eligible for a refund. We reserve the right to deny a
    //                     refund and/or issue a credit in place of a refund if we
    //                     determine that our policy is being abused.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer style={{ marginBottom: 55 }}>
    //                 <StyledQuestions>
    //                   Q: How long does it take to process a refund?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     2-3 business days. Refunds are made back to the original
    //                     form of payment. Shipping and Handling fees are
    //                     nonrefundable.
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //             </Box>
    //           </Grid>
    //           <Grid>
    //             <Box>
    //               <StyledSubheaders>GENERAL QUESTIONS</StyledSubheaders>
    //               <QAContainer>
    //                 <StyledQuestions>
    //                   Q: Can I take supplements with my prescription medication?
    //                 </StyledQuestions>
    //                 <StyledAnswerContainer>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     You should always seek the advice and guidance of a
    //                     qualified health care professional before making any
    //                     change to your daily health care regimen. If you are
    //                     taking medication(s), we strongly encourage   you to
    //                     consult with your physician prior to taking any
    //                     supplements. Your physician will be able to indicate
    //                     whether a vitamin supplement is safe to take with your
    //                     prescription medication(s).
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //               <QAContainer>
    //                 <StyledQuestions>Q: What is Prop 65?</StyledQuestions>
    //                 <StyledAnswerContainer style={{ marginBottom: 30 }}>
    //                   <StyledA>A:</StyledA>
    //                   <StyledAnswers>
    //                     Proposition 65 requires businesses to notify
    //                     Californians about the levels of chemicals in the
    //                     products they purchase for their homes or workplaces, or
    //                     that are released into the environment. By providing
    //                     this information, Proposition 65 enables Californians to
    //                     make informed decisions about protecting themselves from
    //                     exposure to these chemicals.


    //                     <Box style={{ marginTop: 20 }}>
    //                     The Office of Environmental Health Hazard Assessment
    //                     (OEHHA) administers the Proposition 65 program. OEHHA,
    //                     which is part of the California Environmental Protection
    //                     Agency (Cal/EPA), also evaluates all currently available
    //                     scientific information on substances considered for
    //                     placement on the Proposition 65 list.
    //                     </Box>


    //                     <Box style={{ marginTop: 20 }}>
    //                     For more information visit:{' '}
    //                     <StyledLink href="https://oehha.ca.gov/proposition-65/general-info/proposition-65-plain-language">
    //                       https://oehha.ca.gov/proposition-65/general-info/proposition-65-plain-language
    //                     </StyledLink>
    //                     </Box>
    //                   </StyledAnswers>
    //                 </StyledAnswerContainer>
    //               </QAContainer>
    //             </Box>
    //           </Grid>
    //         </Box>
    //       </StyledContainer>
    //     </StyledBackground>


    //     <StyledBackgroundContactUs>
    //       <Container>
    //         <StyledContainerBackground>
    //           <Grid>
    //             <Box textAlign="center">
    //               <StyledHeader>Still Have Questions?</StyledHeader>
    //             </Box>
    //             <Box textAlign="center">
    //               <StyledSubHeader>
    //                 We'd love to hear from you. You can reach us by phone or email.
    //               </StyledSubHeader>
    //             </Box>
    //             <Box textAlign="center">
    //               <StyledHours>
    //                <strong>Mon-Fri</strong> 8am-8pm EST/ 5am-5pm PST
    //               </StyledHours>
    //             </Box>
    //           </Grid>
    //           <Box className={classes.box}>
    //             <Grid className={classes.phoneGrid}>
    //               <Box textAlign="center">
    //                 <ContactPhone />
    //               </Box>
    //               <Box textAlign="center">
    //                 <StyledParagraph1>
    //                   Give us a call for immediate assistance and chat with one
    //                   of our customer care specialists.
    //                 </StyledParagraph1>
    //                 <StyledPhoneNumber>
    //                   <Link
    //                     href="tel:800-270-5771"
    //                     style={{ textDecoration: 'none' }}
    //                   >
    //                     (800) 270-5771
    //                   </Link>
    //                 </StyledPhoneNumber>
    //               </Box>
    //             </Grid>
    //             <Grid className={classes.mailGrid}>
    //               <Box textAlign="center">
    //                 <ContactMail />
    //               </Box>
    //               <Box textAlign="center">
    //                 <StyledParagraph2>
    //                   Email our customer care department. We'll respond as soon
    //                   as possible.
    //                 </StyledParagraph2>
    //                 <StyledEmail>
    //                   <Link
    //                     style={{
    //                       cursor: 'pointer',
    //                       borderBottom: '1px solid #000',
    //                       paddingBottom: '1.5px',
    //                       textDecoration: 'none'
    //                     }}
    //                     href="mailto:help@objectivewellness.com"
    //                   >
    //                     help@objectivewellness.com
    //                   </Link>
    //                 </StyledEmail>
    //               </Box>
    //             </Grid>
    //           </Box>
    //         </StyledContainerBackground>
    //       </Container>
    //     </StyledBackgroundContactUs>


    //   </ScrollToTop>
    // </>
  );
};

export default FAQ;
