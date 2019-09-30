import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { fonts } from '../../components/Theme/fonts';
import { SvgIcon } from '@material-ui/core';

const { $brandSans, $brandSerif, body } = fonts;

export const StyledBackground = withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.5)',
    padding: '90px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      backgroundColor: '#FFF'
    }
  }
}))(Box);

export const StyledContainerBackground = withStyles(theme => ({
  root: {
    padding: '58px',
    backgroundColor: '#FFF',
    [theme.breakpoints.down('xs')]: {
      padding: '59px 36px'
    }
  }
}))(Box);

export const StyledHeader = withStyles(theme => ({
  root: {
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
    }
  }
}))(Typography);

export const StyledSubHeader = withStyles(theme => ({
  root: {
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

export const StyledParagraph = withStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      fontFamily: 'FreightTextProBook',
      fontSize: '16px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.38,
      letterSpacing: 'normal',
      color: '#231f20',
      padding: '0px 20px 19px 20px'
    }
  }
}))(Typography);

export const StyledPhoneNumber = withStyles(theme => ({
  root: {
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

export const StyledEmail = withStyles(theme => ({
  root: {
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

