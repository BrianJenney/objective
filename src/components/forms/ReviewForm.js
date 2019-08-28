import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Link } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '../../components/common';
import { fonts, sizes } from '../../components/Theme/fonts';
import { colorPalette } from '../../components/Theme/color-palette';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS_MAP
} from '../../constants/payment';
import {
  StyledSectionHeader,
  StyledSubmitButton
} from '../../pages/checkout/StyledComponents';

const { BLACK } = colorPalette;
const { $brandSans, $brandSerif } = fonts;
const { microText, miniText, smallText2, productHeavy } = sizes;

const StyledLink = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '16px'
  }
}))(Link);

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  },
  agreement: {
    fontSize: miniText,
    fontColor: BLACK,
    fontFamily: $brandSans
  }
}));

const ReviewForm = ({ cart, onBack, onSubmit }) => {
  const classes = useStyles();
  const {
    items,
    shipping,
    shippingAddress,
    billingAddress,
    paymentDetails,
    total
  } = cart;

  if (
    !items ||
    !shipping ||
    !shippingAddress ||
    !billingAddress ||
    !paymentDetails
  ) {
    return null;
  }

  const shippingMethodLabel = `${shipping.displayName} - ${shipping.price} (Estimated Delivery: ${shipping.deliveryEstimate})`; // eslint-disable-line

  /* eslint-disable */
  return (
    <Box>
      <StyledSectionHeader
        style={{ margin: '20px 0', 'text-align': 'center' }}
        gutterBottom
      >
        Please take a moment to review your order
      </StyledSectionHeader>
      {/* <List disablePadding>
        {items.map(({ product_id, product_name, desc, unit_price }) => (
          <ListItem className={classes.listItem} key={product_id}>
            <ListItemText primary={product_name} secondary={desc} />
            <Typography variant="body2">{unit_price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Method
          </Typography>
          <Typography gutterBottom>{shippingMethodLabel}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.line1} ${
              shippingAddress.line2 ? shippingAddress.line2 : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}, ${shippingAddress.countryCode}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Billing Address
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.firstName} ${billingAddress.lastName}`}
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.line1} ${
              billingAddress.line2 ? billingAddress.line2 : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.city}, ${billingAddress.state} ${billingAddress.postalCode}, ${billingAddress.countryCode}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {PAYMENT_METHOD_LABELS_MAP[paymentDetails.paymentMethod]}
              </Typography>
            </Grid>
            {paymentDetails.paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
              <>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {paymentDetails.cardholderName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentDetails.number}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {paymentDetails.expirationDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentDetails.cvv}</Typography>
                </Grid>
              </>
            )}
            {paymentDetails.paymentMethod === PAYMENT_METHODS.PAYPAL && (
              <div id="paypal-checkout-button" />
            )}
          </Grid>
        </Grid>
      </Grid> */}
      <Box display="flex" alignItems="center">
        {/* <Button type="button" onClick={onBack} children="Back" mr={2} /> */}
        <StyledSubmitButton
          type="button"
          onClick={onSubmit}
          children="Place order"
          style={{ width: '530px', margin: '0 auto' }}
        />
      </Box>
      <Grid
        item
        xs={12}
        style={{ 'text-align': 'center', 'margin-top': '10px' }}
      >
        <Typography gutterBottom className={classes.agreement}>
          By placing this order I agree to the&nbsp;
          <StyledLink
            className={classes.agreement}
            component={RouterLink}
            to="/termsandconsitions"
          >
            Terms &nbsp;&amp;&nbsp; Conditions
          </StyledLink>
          &nbsp;&amp;&nbsp;
          <StyledLink
            className={classes.agreement}
            component={RouterLink}
            to="/privacypolicy"
          >
            Privacy Policy
          </StyledLink>
        </Typography>
      </Grid>
    </Box>
  );
  /* eslint-enable */
};

ReviewForm.propTypes = {
  cart: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ReviewForm;
