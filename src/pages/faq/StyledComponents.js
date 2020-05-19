import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { fonts } from '../../components/Theme/fonts';
import Link from '@material-ui/core/Link';

const { $brandSans } = fonts;

export const StyledBackground = withStyles(theme => ({
  root: {
    backgroundColor: '#fdfbf9',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      backgroundColor: '#fdfbf9'
    }
  }
}))(Box);

export const StyledContainer = withStyles(theme => ({
  root: {
    paddingTop: 70,
    paddingBottom: 40,
    width: 1193,
    [theme.breakpoints.down('xs')]: {
      padding: '38px 0 40px',
      backgroundColor: '#fdfbf9',
      width: '100%'
    }
  }
}))(Container);

