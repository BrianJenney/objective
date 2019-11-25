import React from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';

const useStyles = makeStyles(() => ({
  container: {
    padding: '16px 48px 48px'
  },
  text: {
    fontFamily: 'FreightTextProBook',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#000000'
  },
  list: {
    paddingLeft: '24px'
  }
}));

const ShippingRestrictions = ({ product_name, restrictedStates }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Grid container xs={12} direction="row" justify="center" align="left">
        <Grid item xs={12}>
          <Typography className={classes.text}>
            Unfortunately, {product_name} is not available in the following
            states:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ul className={classes.list}>
            {restrictedStates.map((state, ind) => (
              <li key={ind} className={classes.text}>
                {state}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.text}>
            We hope to be able to offer {product_name} in all states soon!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const ShippingRestrictionsDialog = withDialog(ShippingRestrictions);

const ShippingRestrictionsPage = props => (
  <ShippingRestrictionsDialog onExited={props.history.goBack} {...props} />
);

export default withRouter(ShippingRestrictionsPage);
