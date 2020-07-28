import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { fonts } from '../../components/Theme/fonts';
import { SvgIcon } from '@material-ui/core';

const { $brandSans, $brandSerif, body } = fonts;

export const StyledBackground = withStyles(theme => ({
  root: {
    backgroundColor: '#f6f5f1',
    padding: '90px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      backgroundColor: '#FFF'
    }
  }
}))(Box);

export const StyledContainerBackground = withStyles(theme => ({
  root: {
    margin: 'auto',
    width: 884,
    height: 643,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('xs')]: {
      padding: '59px 36px',
      height: 'auto',
      width: 'auto',
    }
  }
}))(Box);

export const StyledHeader = withStyles(theme => ({
  root: {
    fontFamily: $brandSerif,
    fontSize: '48px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.27,
    letterSpacing: 'normal',
    color: '#231f20',
    paddingTop: 50,
    paddingBottom: 14,
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSerif,
      fontSize: '30px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.27,
      letterSpacing: 'normal',
      color: '#231f20',
      paddingBottom: 7,
      paddingTop: 0,
    }
  }
}))(Typography);

export const StyledSubHeader = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProBook',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.38,
    letterSpacing: 'normal',
    color: '#231f20',
    padding: '0px 20px 20px 20px',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProBook',
      fontSize: '16px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.38,
      letterSpacing: 'normal',
      color: '#231f20',
      padding: '0px 20px 41px 20px'
    }
  }
}))(Typography);

export const StyledHours = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontWtyle: 'normal',
    lineHeight: 0.83,
    letterSpacing: 'normal',
    color: '#333333',
    padding: '0px 20px 40px 20px',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProBook',
      fontSize: '16px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.38,
      letterSpacing: 'normal',
      color: '#231f20',
      padding: '0px 20px 41px 20px'
    }
  }
}))(Typography);

export const StyledParagraph1 = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProBook',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.38,
    letterSpacing: 'normal',
    color: '#231f20',
    margin: '0px 60px',
    padding: '0px 40px 16px 40px',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProBook',
      fontSize: '16px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.38,
      letterSpacing: 'normal',
      color: '#231f20',
      margin: 0,
      padding: '0px 20px 19px 20px',
      margin: '0px 20px',
    }
  }
}))(Typography);

export const StyledParagraph2 = withStyles(theme => ({
  root: {
    fontFamily: 'FreightTextProBook',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.38,
    letterSpacing: 'normal',
    color: '#231f20',
    margin: '0px 60px',
    padding: '0px 40px 16px 40px',
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProBook',
      fontSize: '16px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.38,
      letterSpacing: 'normal',
      color: '#231f20',
      margin: 0,
      padding: '0px 20px 19px 20px'
    }
  }
}))(Typography);

export const StyledPhoneNumber = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '22px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#231f20',
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '25px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#231f20',
      paddingBottom: 36,
    }
  }
}))(Typography);

export const StyledMoreQuestions = withStyles(theme => ({
  root: {
    fontFamily: $brandSerif,
    fontSize: '22px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#231f20',
    padding: '50px 0px 0px 0px',
    [theme.breakpoints.down('xs')]: {
    fontFamily: $brandSerif,
      fontSize: '20px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      paddingBottom: 36,
    }
  }
}))(Typography);
export const StyledEmail = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontSize: '20px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#231f20',
    [theme.breakpoints.down('xs')]: {
      fontFamily: $brandSans,
      fontSize: '20px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#231f20',
    }
  }
}))(Typography);




