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
    }
  }
});

export default nxtTheme
