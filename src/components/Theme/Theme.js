import { createMuiTheme } from '@material-ui/core/styles';
import { colorPalette } from './color-palette';

const { ...color } = colorPalette;

const nxtTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1400,
      xl: 1920
    }
  },
  palette: {
    type: 'light',
    primary: {
      forestGreen: color.FOREST_GREEN,
      seaFoam: color.SEA_FOAM,
      sienna: color.SIENNA,
      palePink: color.PALE_PINK,
      navy: color.NAVY,
      lightBlue: color.LIGHT_BLUE,
      plum: color.PLUM,
      lavender: color.LAVENDER,
      black: color.BLACK,
      offWhite: color.OFF_WHITE
    },
    secondary: {
      lemon: color.LEMON,
      orange: color.ORANGE,
      vanilla: color.VANILLA
    },
    error: {
      main: colors.red,
      dark: colors.red,
      contrastText: colors.white
import { fonts, backupFontStack, sizes } from './fonts';

const nxtTheme = createMuiTheme({
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
    h1: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.h1,
      fontWeight: 800,
      lineHeight: '3.125rem'
    },
    h2: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.h2,
      fontWeight: 800,
      lineHeight: '1.875rem'
    },
    h3: {
      // Title T1
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.title,
      fontWeight: 800,
      lineHeight: '1.4375rem'
    },
    h4: {
      // subhead S1
      fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
      fontSize: sizes.subhead,
      fontWeight: 400,
      lineHeight: '1.4375rem'
    },
    subtitle1: {
      // subhead S1
      fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
      fontSize: sizes.subhead,
      fontWeight: 400,
      lineHeight: '1.4375rem'
    },
    caption: {
      fontFamily: `${fonts.caption}, ${backupFontStack.sans}`,
      fontSize: sizes.caption,
      fontWeight: 400,
      lineHeight: '0.9375rem'
    },
    button: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: colors.white
    },
    body1: {
      fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
      fontSize: sizes.body,
      fontWeight: 400,
      lineHeight: '1.4375rem'
    }
  },
  overrides: {},
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export default nxtTheme
