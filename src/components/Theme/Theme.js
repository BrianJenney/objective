import { createMuiTheme } from '@material-ui/core/styles';
import { nxtPalette } from './nxt-palette';

const { ...color } = nxtPalette;

const nxtTheme = createMuiTheme({
  palette: {
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
    }
  }
});

export default nxtTheme
