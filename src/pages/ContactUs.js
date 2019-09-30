import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ContactMail from '../components/common/Icons/ContactMail/ContactMail';
import ContactPhone from '../components/common/Icons/ContactPhone/ContactPhone';
import Link from '@material-ui/core/Link';
import {
  StyledBackground,
  StyledContainerBackground,
  StyledHeader,
  StyledSubHeader,
  StyledParagraph,
  StyledPhoneNumber,
  StyledEmail
} from './contactUs/StyledComponents';

const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
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
      marginBottom: 33.9,
    }
  },
  mailGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '600px',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    }
  }
}));

const ContactUs = () => {
  const classes = useStyles();
  return (
    <StyledBackground>
      <Container>
        <StyledContainerBackground>
          <Grid>
            <Box textAlign="center">
              <StyledHeader>
                Contact Us
                  </StyledHeader>
            </Box>
            <Box textAlign="center">
              <StyledSubHeader>
                We'd love to hear from you. You can reach us by phone or email.
              </StyledSubHeader>
            </Box>
          </Grid>
          <Box className={classes.box}>
            <Grid className={classes.phoneGrid}>
              <Box textAlign="center">
                <ContactPhone />
              </Box>
              <Box textAlign="center">
                <StyledParagraph>
                  Give us a call for immediate assistance and chat with one of
                  our customer care specialists.
                </StyledParagraph>
                <StyledPhoneNumber>(800) 270-5771</StyledPhoneNumber>
              </Box>
            </Grid>
            <Grid className={classes.mailGrid}>
              <Box textAlign="center">
                <ContactMail />
              </Box>
              <Box textAlign="center">
                <StyledParagraph>
                  Email our customer care department. We'll respond as soon as
                  possible.
                </StyledParagraph>
                <StyledEmail>
                  <Link
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #000',
                      paddingBottom: '1px',
                      textDecoration: 'none'
                    }}
                  >
                    help@objectivewellnes.com
                            </Link>
                </StyledEmail>
              </Box>
            </Grid>
          </Box>
        </StyledContainerBackground>
      </Container>
    </StyledBackground>
  )
};

export default ContactUs;