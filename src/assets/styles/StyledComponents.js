import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export const StyledContainer = withStyles(theme => ({
  root: {
    maxWidth: 1200,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      paddingLeft: 16,
      paddingRight: 16
    }
  }
}))(Container);
