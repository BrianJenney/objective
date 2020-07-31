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
      main: '#553226'
    },
    brand: {
      camoGreen: '#553226',
      accentBrown: '#a06958',
      mainYellow: '#f7c665',
      creamYellow: '#fff7e8',
      lightSubTextGray: '#938985',
      darkSubTextGray: '#7f7470',
      redSubText: '#ce0e2d'
    },
    error: {
      main: 'rgba(208, 2, 27, 0.15)',
      dark: '#ce0e2d'
    },
    text: {
      primary: color.BLACK,
      secondary: color.BLACK,
      disabled: color.GRAY,
      hint: color.ORANGE
    },
    background: {
      paper: color.WHITE,
      default: color.WHITE
    }
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    bodyFontFamily: `${fonts.body}, ${backupFontStack.sans}`,
    headerFontFamily: `${fonts.header}, ${backupFontStack.sans}`,
    body1: {
      fontFamily: `${fonts.body}, ${backupFontStack.sans}`,
      fontSize: sizes.productDetail,
      fontWeight: 400,
      lineHeight: '2.3rem'
    },
    body2: {
      fontFamily: `${fonts.body2}, ${backupFontStack.sans}`,
      fontSize: sizes.smallText1,
      fontWeight: 400,
      lineHeight: '1rem'
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
      fontSize: '25px',
      color: '#a06958',
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
    fineprint: {
      fontFamily: `${fonts.captionBook.header}, ${backupFontStack.sans}`,
      fontSize: sizes.fineprint,
      lineHeight: '.5rem',
      fontWeight: `${fonts.captionBook.weight}`
    }
  },
  overrides: {
    MuiButton: {
      containedSecondary: {
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#fff'
        }
      },
      containedPrimary: {
        backgroundColor: '#f1be56',
        color: '#553226',
        '&:hover': {
          backgroundColor: '#f1be56'
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontFamily: 'unset',
        color: color.DARK_GRAY
      }
    },
    MuiInputBase: {
      root: {
        fontFamily: 'upgrade, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '18px'
      }
    },
    MuiInputLabel: {
      root: {
        fontFamily: 'proxima-nova, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        color: '#a06958'
      },
      outlined: {
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, 4px) scale(0.75)',
          color: '#a06958'
        }
      }
    },
    MuiCheckbox: {
      root: {
        color: '#7f7470',
        '&$checked': {
          color: '#553226 !important'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        borderColor: '#a06958',
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a06958'
          }
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a06958'
          }
        }
      },
      notchedOutline: {
        '& legend': {
          display: 'none'
        },
        borderColor: '#a06958'
      },
      input: {
        fontWeight: '500',
        color: '#a06958',
        fontSize: '18px'
      }
    },
    MuiRadio: {
      root: {
        color: '#553226'
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
    },
    MuiTextField: {
      root: {
        fontFamily: 'proxima-nova, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '22px'
      }
    },
    MuiSelect: {
      root: {
        fontFamily: 'proxima-nova, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '22px'
      }
    },
    MuiFormHelperText: {
      root: {
        '&.Mui-error': {
          backgroundColor: 'rgba(208, 2, 27, 0.15)',
          color: '#000'
        }
      },
      contained: {
        margin: 0,
        minHeight: 24,
        lineHeight: '24px',
        padding: '0 5px',
        color: '#7f7470'
      }
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
