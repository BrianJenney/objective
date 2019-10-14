import { withStyles } from '@material-ui/core/styles';
import { Typography, Box, Container, Link } from '@material-ui/core';
import { fonts } from '../../components/Theme/fonts';

const { $brandSans } = fonts;

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
    width: 1193,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 38,
      paddingBottom: 40,
      backgroundColor: '#fdfbf9',
      width: '100%'
    }
  }
}))(Container);

export const StyledTitle = withStyles(theme => ({
  root: {
    fontFamily: 'Canela Text Web',
    fontSize: '48px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 62,
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'Canela Text Web',
      fontSize: '24px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#000000',
      marginBottom: 44
    }
  }
}))(Typography);

export const StyledSubheaders = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '35px',
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '18px',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
      marginBottom: 24
    }
  }
}))(Typography);

export const ParagraphContainer = withStyles(theme => ({
  root: {
    borderBottom: '1px solid',
    padding: '40px 0px 30px 0px',
    [theme.breakpoints.down('xs')]: {}
  }
}))(Box);

export const StyledParagraph = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProMedium-Regular',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    margin: '13px 0px',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProMedium-Regular',
      fontSize: '18px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000'
    }
  }
}))(Typography);

export const StyledParagraphHeader = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '22px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '18px',
      fontWeight: 600,
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
      marginBottom: 24
    }
  }
}))(Typography);

export const StyledLink = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProMedium-Regular',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textDecoration: 'none',
    color: '#00c3ef',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProMedium-Regular',
      fontSize: '18px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textDecoration: 'none',
      color: '#00c3ef'
    }
  }
}))(Link);
