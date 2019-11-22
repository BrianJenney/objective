import React from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavLink from '../common/NavLink';
import withDialog from '../../hoc/withDialog';

const useStyles = makeStyles(() => ({
  container: {
    padding: '21px 25px 32px 24px'
  },
  text: {
    fontFamily: 'p22-underground',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#000000'
  },
  link: {
    fontSize: '14px',
    fontWeight: '501',
    textTransform: 'uppercase'
  }
}));

// Need to pass cart to check the number of items to display proper link
const StateRestrictions = ({ product_name, cartCount }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Grid container xs={12} direction="row" justify="center" spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.text}>CHANGES TO YOUR CART</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.text}>
            We’ve removed {product_name} from your cart because this product is
            not available in the state you selected. We hope to be able to offer{' '}
            {product_name} in your state soon!
          </Typography>
        </Grid>
        {/* If cart is empty, display 'Continue shopping' or else display 'Continue checkout */}
        <Grid item xs={12}>
          {cartCount > 0 ? (
            //    What does this step take us to? Can we just simply click Close button to return to Checkout?
            <NavLink to="/" underline="always" className={classes.link}>
              Continue checkout
            </NavLink>
          ) : (
            <NavLink to="/gallery" underline="always" className={classes.link}>
              Continue shopping
            </NavLink>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const StateRestrictionsDialog = withDialog(StateRestrictions);

const StateRestrictionsPage = props => (
  <StateRestrictionsDialog onExited={props.history.goBack} {...props} />
);

export default withRouter(StateRestrictionsPage);
