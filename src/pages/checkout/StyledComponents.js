import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import { colorPalette } from '../../components/Theme/color-palette';
import { fonts, sizes, lineHeight } from '../../components/Theme/fonts';

const {
  LIGHT_GRAY,
  MEDIUM_GRAY,
  BLACK,
  WHITE,
  LIGHT_VANILLA,
  FOREST_GREEN
} = colorPalette;
const { $brandSans, $brandSerif } = fonts;
const { microText, miniText, smallText2, productHeavy } = sizes;
const { semiTight } = lineHeight;

const $thin1pxRuler_gray = `solid 1px ${MEDIUM_GRAY}`;
const $thin2pxRuler_gray = `solid 2px ${MEDIUM_GRAY}`;

// container
export const StyledContainerGrid = withStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: LIGHT_VANILLA
  }
}))(Grid);
// main wrapper
export const StyledMainWrapper = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 1215,
    justifyContent: 'space-between',
    paddingTop: '90px'
  }
}))(Grid);

export const StyledSubmitButton = withStyles(theme => ({
  root: {
    fontFamily: $brandSans,
    fontWeight: '900',
    fontSize: '16px',
    color: WHITE,
    backgroundColor: BLACK,
    width: '100%',
    height: '80px'
  }
}))(Button);

export const StyledSectionHeader = withStyles(theme => ({
  root: {
    fontFamily: $brandSerif,
    fontSize: productHeavy,
    color: BLACK
  }
}))(Typography);

// checkout wrapper
export const StyledCheckoutWrapper = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: WHITE
  }
}))(Grid);

// cart wrapper
export const StyledCartWrapper = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 330,
    padding: '24px 20px',
    backgroundColor: WHITE
  }
}))(Grid);

export const StyledCartHeader = withStyles(theme => ({
  root: {
    fontSize: '2rem',
    fontFamily: $brandSerif
  }
}))(Typography);

export const StyledExpansionPanel = withStyles(theme => ({
  root: {
    height: 60,
    padding: '0 20px',
    '&$expanded': {
      margin: '0 !important'
    }
  },
  content: {
    '&$expanded': {
      margin: '0'
    }
  }
}))(ExpansionPanel);

// .MuiExpansionPanelSummary-root.Mui-expanded
export const StyledExpansionPanelSummary = withStyles(theme => ({
  root: {
    padding: '0',
    // backgroundColor: `${FOREST_GREEN} !important`,
    '&$expanded': {
      backgroundColor: 'red'
    }
  },
  '&$expanded': {
    backgroundColor: FOREST_GREEN
  },
  content: {
    padding: '0 20px',
    '&$expanded': {
      backgroundColor: FOREST_GREEN
    }
  }
}))(ExpansionPanelSummary);

export const StyledSmallCaps = withStyles(theme => ({
  root: {
    fontSize: smallText2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: $brandSans
  }
}))(Typography);

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
    width: '100%',
    maxWidth: 351,
    height: '80px',
    marginTop: '15px'
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
