import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import ContactMail from '../components/common/Icons/ContactMail/ContactMail';
import ContactPhone from '../components/common/Icons/ContactPhone/ContactPhone';
import Link from '@material-ui/core/Link';
import ScrollToTop from '../components/common/ScrollToTop';
import {
  StyledBackground,
  StyledContainerBackground,
  StyledHeader,
  StyledSubHeader,
  StyledParagraph1,
  StyledParagraph2,
  StyledPhoneNumber,
  StyledEmail
} from './contactUs/StyledComponents';

import HelpDialog from './help/HelpDialog';
import HelpConfirmedDialog from './help/HelpConfirmedDialog';

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

const ContactUs = () => {
  const [ openCustomerCareDialog, setOpenCustomerCareDialog ] = useState(false);
  const [ openHelpConfirmedDialog, setOpenHelpConfirmedDialog ] = useState(false);

  const closeCustomerCareDialog = useCallback(() => {
    setOpenCustomerCareDialog(false);
  },[setOpenCustomerCareDialog]);

  const showHelpConfirmedDialog = () => setOpenHelpConfirmedDialog(true);

  const classes = useStyles();
  window.analytics.page('Contact');
  return (
    <ScrollToTop>
      <StyledBackground>
        <Container>
          <StyledContainerBackground>
            <Grid>
              <Box textAlign="center">
                <StyledHeader>Contact us</StyledHeader>
              </Box>
              <Box textAlign="center">
                <StyledSubHeader>
                  We'd love to hear from you. You can reach us by phone or
                  email.
                </StyledSubHeader>
              </Box>
            </Grid>
            <Box className={classes.box}>
              <Grid className={classes.phoneGrid}>
                <Box textAlign="center">
                  <ContactPhone />
                </Box>
                <Box textAlign="center">
                  <StyledParagraph1>
                    Give us a call for immediate assistance and chat with one of
                    our customer care specialists.
                  </StyledParagraph1>
                  <StyledPhoneNumber>
                    <Link
                      href="tel:800-270-5771"
                      style={{ textDecoration: 'none' }}
                    >
                      (800) 270-5771
                    </Link>
                  </StyledPhoneNumber>
                </Box>
              </Grid>
              <Grid className={classes.mailGrid}>
                <Box textAlign="center">
                  <ContactMail />
                </Box>
                <Box textAlign="center">
                  <StyledParagraph2>
                    Email our customer care department. We'll respond as soon as
                    possible.
                  </StyledParagraph2>
                  <StyledEmail>
                    <Link
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #000',
                        paddingBottom: '1.5px',
                        textDecoration: 'none'
                      }}
                      onClick={() => setOpenCustomerCareDialog(true)}
                    >
                      help@objectivewellness.com
                    </Link>
                  </StyledEmail>
                </Box>
                { openCustomerCareDialog && <HelpDialog onExited={closeCustomerCareDialog} showHelpConfirmedDialog={showHelpConfirmedDialog}/>}
                { openHelpConfirmedDialog && <HelpConfirmedDialog onExited={() => setOpenHelpConfirmedDialog(false)} />}
              </Grid>
            </Box>
          </StyledContainerBackground>
        </Container>
      </StyledBackground>
    </ScrollToTop>
  );
};

export default ContactUs;
