import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { fonts } from '../../components/Theme/fonts';
import Link from '@material-ui/core/Link';

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
      width: "100%",
    }
  }
}))(Container);

export const StyledTitle = withStyles(theme => ({
  root: {
    fontFamily: 'CanelaText',
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
      fontFamily: 'CanelaText',
      fontSize: '24px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#000000',
      marginBottom: 44,
    }
  }
}))(Typography);

export const StyledSubheaders = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '18px',
      fontWeight: 600,
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
      marginBottom: 24,
    }
  }
}))(Typography);

export const StyledQuestions = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '18px',
      fontWeight: 600,
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
    }
  }
}))(Typography);

export const StyledAnswerContainer = withStyles(theme => ({
  root: {
    display: 'flex'
  }
}))(Box);

export const StyledA = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '18px',
      fontWeight: 600,
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
    }
  }
}))(Typography);

export const StyledAnswers = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProMedium-Regular',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    marginLeft: 8,
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProMedium-Regular',
      fontSize: '18px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
      marginLeft: 8,
    }
  }
}))(Typography);

export const QAContainer = withStyles(theme => ({
  root: {
    marginBottom: 40,
  }
}))(Grid);

export const StyledText = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProMedium-Regular',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal,',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProMedium-Regular',
      fontSize: '18px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000',
    }
  }
}))(Typography);

export const MoreInfoLink = withStyles(theme => ({
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
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProMedium-Regular',
      fontSize: '18px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal,',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textDecoration: 'none',
      color: '#00c3ef',
    }
  }
}))(Link);
