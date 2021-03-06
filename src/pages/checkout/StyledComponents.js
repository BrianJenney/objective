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
const { microText, miniText, smallText2 } = sizes;
const { semiTight } = lineHeight;

const $thin1pxRuler_gray = `solid 1px ${MEDIUM_GRAY}`;
const $thin2pxRuler_gray = `solid 2px ${MEDIUM_GRAY}`;

export const StyledCheckoutSteps = withStyles(theme => ({
  root: {
    fontSize: '1.125rem',
    fontFamily: $brandSans
  }
}))(Typography);

export const StyledLogoContainer = withStyles(theme => ({
  root: {
    borderBottom: '1px solid #000000',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      borderBottom: 'none',
      width: 0
    }
  }
}))(Box);

export const StyledLogo = withStyles(theme => ({
  root: {
    fontSize: '1.5rem',
    fontFamily: $brandSerif,
    paddingBottom: '15px',
    [theme.breakpoints.up('sm')]: {
      fontSize: 0,
      fontFamily: 'none',
      paddingBottom: 0
    }
  }
}))(Grid);

export const StyledSmallCaps = withStyles(theme => ({
  root: {
    fontSize: smallText2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: $brandSans
  }
}))(Typography);

export const StyledArrowIcon = withStyles(theme => ({
  root: {
    top: 7,
    right: 5,
    color: '#000000',
    position: 'relative'
  }
}))(SvgIcon);

export const StyledFinePrint = withStyles(theme => ({
  root: {
    fontSize: microText,
    color: LIGHT_GRAY,
    fontFamily: $brandSans
  }
}))(Typography);

export const StyledCartCount = withStyles(theme => ({
  root: {
    fontSize: miniText,
    fontFamily: $brandSans,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginLeft: '8px'
  }
}))(Typography);

export const StyledDrawerGrid = withStyles(theme => ({
  root: {
    padding: '26px 0',
    borderTop: $thin1pxRuler_gray,
    flexWrap: 'nowrap'
  }
}))(Grid);

export const StyledGridEmptyCart = withStyles(theme => ({
  root: {
    margin: '0 0 30px 0',
    borderTop: $thin1pxRuler_gray,
    paddingTop: '29px'
  }
}))(Grid);

export const StyledHeaderWrapper = withStyles(theme => ({
  root: {
    paddingBottom: '34px'
  }
}))(Grid);

export const StyledPromoCode = withStyles(theme => ({
  root: {
    margin: '-6px 0 0 -14px',
    fontFamily: $brandSans,
    textTransform: 'uppercase',
    color: BLACK,
    transform: 'translate(14px, 16px) scale(1) !important'
  },
  label: {
    fontFamily: `${$brandSans} !important`,
    textTransform: 'uppercase'
  }
}))(TextField);

export const StyledTotalWrapper = withStyles(theme => ({
  root: {
    marginBottom: 0,
    marginTop: '20px',
    borderTop: $thin2pxRuler_gray,
    paddingTop: '29px'
  }
}))(Grid);

export const StyledCheckoutButton = withStyles(theme => ({
  root: {
    width: '85%',
    maxWidth: 351,
    height: '80px',
    marginTop: '15px',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxWidth: 351,
      height: '80px',
      marginTop: '15px'
    }
  }
}))(Button);

export const StyledCardActions = withStyles(theme => ({
  root: {
    border: '1px solid #9e9e9e',
    width: '86px',
    height: '30px',
    padding: '0 !important',
    marginTop: '-10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}))(CardActions);

export const StyledCounterButton = withStyles(theme => ({
  root: {
    padding: '0 !important',
    width: '18px',
    minWidth: '18px',
    padding: '4px',
    lineHeight: '1px'
  }
}))(Button);

export const StyledProductLink = withStyles(theme => ({
  root: {
    fontSize: smallText2,
    fontFamily: $brandSerif,
    fontWeight: 'normal',
    color: BLACK,
    lineHeight: semiTight
  }
}))(Typography);

export const StyledCardContent = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 0,
    marginBottom: 0
  }
}))(CardContent);

export const StyledCartCloseIcon = withStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: 365,
      top: 35
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: 30,
      top: 41
    }
  }
}))(Box);

export const StyledShoppingBag = withStyles(theme => ({
  root: {
    position: 'absolute',
    top: 36,
    right: 35
  }
}))(Box);

export const StyledBadge = withStyles(theme => ({
  badge: {
    top: '30%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
}))(Badge);
