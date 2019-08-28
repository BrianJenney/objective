import { createMuiTheme } from '@material-ui/core/styles';
import { colorPalette } from './color-palette';
import { fonts, sizes, backupFontStack } from './fonts';

const { ...color } = colorPalette;

const nxtTheme = createMuiTheme({
  shadows: ['none'],
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
      main: color.BLACK
    },
    secondary: {
      main: color.VANILLA
    },
    brand: {
      forestGreen: color.FOREST_GREEN,
      seaFoam: color.SEA_FOAM,
      sienna: color.SIENNA,
      palePink: color.PALE_PINK,
      navy: color.NAVY,
      lightBlue: color.LIGHT_BLUE,
      plum: color.PLUM,
      lavender: color.LAVENDER,
      offWhite: color.OFF_WHITE,
      lemon: color.LEMON,
      orange: color.ORANGE,
      vanilla: color.VANILLA,
      lightVanilla: color.LIGHT_VANILLA
    },
    error: {
      main: color.RED,
      dark: color.RED,
      contrastText: color.WHITE
    },
    text: {
      primary: color.BLACK,
      secondary: color.PLUM,
      disabled: color.GRAY,
      hint: color.ORANGE,
      reversed: color.WHITE
    },
    background: {
      paper: color.WHITE,
      default: color.WHITE
    }
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontSans: fonts.$brandSans,
    fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
    body2: {
      fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
      fontSize: sizes.productDetail,
      fontWeight: 400,
      lineHeight: '2.3rem'
    },
    h1: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      fontSize: sizes.h1,
      fontWeight: 400,
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
    h5: {
      fontFamily: `${fonts.variant}, ${backupFontStack.sans}`,
      fontSize: sizes.variant,
      fontWeight: 400,
      lineHeight: '1.875rem'
    },
    h6: {
      fontFamily: `${fonts.variant}, ${backupFontStack.sans}`,
      fontSize: sizes.productDetailSubTitle,
      fontWeight: 400,
      lineHeight: '2.75rem'
    },
    subtitle1: {
      // subhead S1
      fontFamily: `${fonts.subhead}, ${backupFontStack.sans}`,
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
    productBook: {
      fontFamily: `${fonts.captionBook.header}, ${backupFontStack.sans}`,
      fontSize: sizes.productBook,
      lineHeight: '1.5rem',
      fontWeight: `${fonts.captionBook.weight}`,
      textTransform: 'uppercase'
    },
    productMedium: {
      fontFamily: `${fonts.captionMedium.header}, ${backupFontStack.sans}`,
      fontSize: sizes.productMedium,
      fontWeight: `${fonts.captionMedium.weight}`,
      textTransform: 'uppercase'
    },
    productHeavy: {
      fontFamily: `${fonts.captionHeavy.header}, ${backupFontStack.sans}`,
      fontSize: sizes.productHeavy,
      lineHeight: '2.5rem',
      fontWeight: `${fonts.captionHeavy.weight}`,
      textTransform: 'uppercase'
    },
    smallHeader: {
      fontFamily: `${fonts.smallHeader}, ${backupFontStack.sans}`,
      fontSize: sizes.htmlFontSize,
      fontWeight: 400,
      lineHeight: '0.9375rem',
      textTransform: 'uppercase'
    },
    button: {
      fontFamily: `${fonts.header}, ${backupFontStack.sans}`,
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: color.WHITE
    },
    bodyMd: {
      fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
      fontSize: sizes.bodyMd,
      fontWeight: `${fonts.bodyWeight}`,
      lineHeight: '1.375rem'
    },
    bodyLg: {
      fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
      fontSize: sizes.bodyLg,
      fontWeight: `${fonts.bodyWeight}`,
      lineHeight: '2.125rem'
    },
    panelHeader: {
      fontFamily: `${fonts.$brandSans}, ${backupFontStack.sans}`,
      fontSize: sizes.smallText2,
      fontWeight: `${fonts.bodyWeight}`
    },
    fineprint: {
      fontFamily: `${fonts.captionBook.header}, ${backupFontStack.sans}`,
      fontSize: sizes.fineprint,
      lineHeight: '.5rem',
      fontWeight: `${fonts.captionBook.weight}`
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        width: '100%',
        height: '80px',
        padding: '30px'
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'rgba(0, 0, 0, 1)'
      },
      input: {
        fontFamily: fonts.$brandSans,
        color: color.BLACK,
        padding: '0'
      }
    },
    MuiCheckbox: {
      root: {
        padding: 0,
        color: color.BLACK
      },
      MuiChecked: {
        color: color.BLACK
      },
      colorSecondary: {
        color: color.BLACK,
        MuiChecked: {
          color: color.BLACK
        }
      }
    },
    MuiChecked: {
      color: color.BLACK
    },
    MuiFormLabel: {
      root: {
        fontFamily: 'unset'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(24px, 34px) scale(1)',
        fontFamily: fonts.$brandSans,
        color: color.BLACK
      }
    },
    MuiGrid: {
      container: {
        maxWidth: 1600,
        margin: '0 auto'
      }
    },
    MuiTab: {
      root: {
        '&$selected': {
          backgroundColor: '#ffffff'
        }
      }
    },
    MuiContainer: {
      maxWidth: 1504
    }
  },
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export default nxtTheme;
