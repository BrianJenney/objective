import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export const StyledContainer = withStyles(theme => ({
  root: {
    maxWidth: 1200
  }
}))(Container);
