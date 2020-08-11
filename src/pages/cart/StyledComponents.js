import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge/Badge';
import { colorPalette } from '../../components/Theme/color-palette';
import { fonts, sizes, lineHeight } from '../../components/Theme/fonts';

const { LIGHT_GRAY, MEDIUM_GRAY, BLACK } = colorPalette;
const { $brandSans, $brandSerif } = fonts;
const { microText, miniText, smallText2, smallText1 } = sizes;
const { semiTight } = lineHeight;

const $thin1pxRuler_gray = `solid 1px ${MEDIUM_GRAY}`;
const $thin2pxRuler_gray = `solid 1px ${MEDIUM_GRAY}`;

export const StyledCartHeader = withStyles(theme => ({
  root: {
    color: theme.palette.brand.camoGreen,
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px',
      fontFamily: $brandSerif,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      paddingTop: '11px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '25px',
      fontFamily: $brandSerif,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      paddingTop: '6px'
    }
  }
}))(Typography);

export const StyledProceedCheckout = withStyles(theme => ({
  root: {
    fontSize: '18px',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontFamily: $brandSans,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#231f20',
    [theme.breakpoints.up('sm')]: {
      cursor: 'pointer'
    }
  }
}))(Typography);

export const StyledSmallCaps = withStyles(theme => ({
  root: {
    fontSize: '14px',
    textTransform: 'uppercase',
    fontWeight: 700,
    fontFamily: theme.typography.bodyFontFamily,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: theme.palette.brand.camoGreen,
    paddingTop: '7px'
  }
}))(Typography);

export const StyledSmallCapsEmptyCart = withStyles(theme => ({
  root: {
    fontSize: '32px',
    fontFamily: 'Canela Text Web',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#231f20'
  }
}))(Typography);

export const StyledBackArrowIcon = withStyles(theme => ({
  root: {
    top: 15,
    right: 5,
    color: '#000000',
    position: 'relative',
    fontSize: '24px'
  }
}))(SvgIcon);

export const StyledArrowIcon = withStyles(theme => ({
  root: {
    top: 7,
    right: 5,
    color: '#000000',
    position: 'relative',
    fontSize: '22px'
  }
}))(SvgIcon);

export const StyledFinePrint = withStyles(theme => ({
  root: {
    fontSize: microText,
    color: '#646464',
    fontFamily: $brandSans,
    fontSize: '11px',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 0,
    letterSpacing: 'normal'
  }
}))(Typography);

export const StyledCartCountHeader = withStyles(theme => ({
  root: {
    fontSize: '14px',
    fontFamily: $brandSans,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: theme.palette.brand.camoGreen,
    marginLeft: '8px'
  }
}))(Typography);

export const StyledCartCount = withStyles(theme => ({
  root: {
    fontSize: '14px',
    fontFamily: $brandSans,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000'
  }
}))(Typography);

export const StyledDrawerGrid = withStyles(theme => ({
  root: {
    flexWrap: 'nowrap',
    marginBottom: '12px',
    borderColor: '#eec0b1'
  }
}))(Grid);

export const StyledGridEmptyCart = withStyles(theme => ({
  root: {
    margin: '0 0 30px 0',
    borderTop: $thin1pxRuler_gray,
    paddingTop: '40px',
    textAlign: 'center',
    paddingRight: '40px',
    paddingLeft: '40px'
  }
}))(Grid);

export const StyledHeaderWrapper = withStyles(theme => ({
  root: {
    paddingBottom: '18px'
  }
}))(Grid);

export const StyledHeaderWrapperEmptyCart = withStyles(theme => ({
  root: {
    paddingBottom: '10px'
  }
}))(Grid);

export const StyledTotalWrapper = withStyles(theme => ({
  root: {
    marginBottom: 0,
    borderTop: $thin1pxRuler_gray,
    paddingTop: '20px'
  }
}))(Grid);

export const StyledCheckoutButton = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 351,
    height: '59.7px',
    marginTop: '15px',
    fontFamily: $brandSans,
    fontWeight: 900,
    letterSpacing: 1.17,
    lineHeight: 2.14,
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxWidth: 351,
      height: '80px',
      marginTop: '15px',
      fontSize: '16px',
      fontWeight: 900,
      fontfontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.88,
      letterSpacing: 1.33
    }
  }
}))(Button);

export const StyledCardActions = withStyles(theme => ({
  root: {
    border: '1px solid #9e9e9e',
    width: '86px',
    height: '30px',
    padding: '7px',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0px',
    justifyContent: 'space-between'
  }
}))(CardActions);

export const StyledCounterButton = withStyles(theme => ({
  root: {
    padding: '0 !important',
    width: '20px',
    minWidth: '20px',
    height: '20px',
    lineHeight: '1px',
    color: '#553226',
    border: '1px solid #553226',
    borderRadius: '50%'
  }
}))(Button);

export const StyledProductLink = withStyles(theme => ({
  root: {
    fontSize: '18px',
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen,
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    paddingRight: '45px',
    paddingBottom: '0',
    marginLeft: '10px',
    marginTop: '7px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
      fontFamily: $brandSans,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.25,
      letterSpacing: 'normal'
    }
  }
}))(Typography);

export const StyledPromoLink = withStyles(theme => ({
  root: {
    fontSize: 14,
    fontFamily: $brandSans,
    fontWeight: 'normal',
    color: theme.palette.brand.accentBrown,
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))(Typography);

export const StyledCardContent = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '26px 0 0 0',
    marginBottom: 0
  }
}))(CardContent);

export const StyledCartCloseIcon = withStyles(theme => ({
  root: {
    width: '55px',
    height: '55px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: 26,
      top: 27,
      cursor: 'pointer',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
      }
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      right: 8,
      top: 15
    }
  }
}))(Box);

export const StyledBadge = withStyles(theme => ({
  badge: {
    top: '30%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`
  }
}))(Badge);

export const StyledProductPrice = withStyles(theme => ({
  root: {
    fontSize: '16px',
    fontFamily: $brandSans,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.82,
    letterSpacing: 'normal',
    marginLeft: '7px',
    color: theme.palette.brand.accentBrown
  }
}))(Typography);

export const StyledProductTotal = withStyles(theme => ({
  root: {
    fontSize: '14px',
    fontFamily: $brandSans,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    letterSpacing: 'normal',
    color: theme.palette.brand.camoGreen,
    textTransform: 'uppercase'
  }
}))(Typography);

export const StyledRemoveLink = withStyles(theme => ({
  root: {
    fontSize: '11px',
    fontFamily: $brandSans,
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.17,
    letterSpacing: '0.92px',
    paddingRight: '45px',
    paddingBottom: '15px',
    textTransform: 'uppercase',
    maxWidth: '55px'
  }
}))(Typography);

export const StyledEstimatedTotal = withStyles(theme => ({
  root: {
    fontSize: '20px',
    textTransform: 'uppercase',
    fontWeight: 700,
    fontFamily: $brandSans,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: theme.palette.brand.camoGreen,
    paddingTop: '9px'
  }
}))(Typography);

export const StyledPromoCode = withStyles(theme => ({
  root: {
    fontSize: '14px',
    fontFamily: $brandSans,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: theme.palette.brand.accentBrown
  }
}))(Typography);
