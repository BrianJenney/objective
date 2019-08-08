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
      main: color.BLACK,
    },
    secondary: {
      main: color.VANILLA,
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
      vanilla: color.VANILLA
    },
    error: {
      main: color.RED,
      dark: color.RED,
      contrastText: color.WHITE
    },
    text: {
      primary: color.BLACK,
      secondary: color.NAVY,
      disabled: color.GRAY,
      hint: color.ORANGE
    },
    background: {
      paper: color.WHITE,
      default: color.WHITE
    }
  },
});

export default nxtTheme
