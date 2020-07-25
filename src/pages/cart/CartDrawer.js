import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { withRouter, Link, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid, Card, CardMedia } from '@material-ui/core';
import { AlertPanel, NavLink, MenuLink } from '../../components/common';
import RightArrow from '../../components/common/Icons/Keyboard-Right-Arrow/ShoppingBag';
import { PromoCodeForm } from '../../components/forms';
import PromoCodeView from './PromoCodeView';
import { removeFromCart, adjustQty } from '../../modules/cart/functions';
import { setCartDrawerOpened } from '../../modules/cart/actions';
import { displayMoney } from '../../utils/formatters';
import segmentProductClickEvent from '../../utils/product/segmentProductClickEvent';
import { colorPalette } from '../../components/Theme/color-palette';
import {
  StyledCartHeader,
  StyledSmallCaps,
  StyledFinePrint,
  //  StyledCartCount,
  StyledHeaderWrapper,
  StyledProductLink,
  StyledCounterButton,
  StyledCardActions,
  StyledCardContent,
  StyledDrawerGrid,
  StyledGridEmptyCart,
  StyledTotalWrapper,
  StyledArrowIcon,
  //  StyledBadge,
  StyledHeaderWrapperEmptyCart,
  StyledSmallCapsEmptyCart,
  StyledPromoLink,
  StyledProceedCheckout,
  StyledCartCountHeader,
  StyledProductPrice,
  StyledRemoveLink,
  StyledProductTotal,
  StyledEstimatedTotal
} from './StyledComponents';
import CartNotification from '../../components/cart/CartNotification';

const { MEDIUM_GRAY } = colorPalette;

const useStyles = makeStyles(theme => ({
  cartRestricted: {
    fontFamily: 'p22-underground',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#d0021b',
    paddingBottom: '26px'
  },
  link: {
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '1.06px',
    textTransform: 'uppercase',
    paddingBottom: '30px'
  },
  editCart: {
    marginTop: '4px',
    fontFamily: 'p22-Underground',
    fontSize: '16px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '1.06px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
      letterSpacing: '0.93px',
      paddingTop: '8px'
    }
  }
}));

const Cart = ({
  history,
  hideCheckoutProceedLink,
  disableItemEditing,
  hideTaxLabel,
  showOrderSummaryText,
  xsBreakpoint,
  location,
  activeStep,
  restrictionMessage,
  restrictedProduct,
  checkoutVersion
}) => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const cartNotification = useSelector(state => state.utils.cartNotification);
  const [promoVisible, setPromoVisible] = useState(false);
  const dispatch = useDispatch();
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const hideLPCoupon = !!history.location.state;

  useEffect(() => {
    const loc =
      matchPath(location.pathname, { path: '/checkout' }) ||
      matchPath(location.pathname, { path: '/checkout2' }) ||
      matchPath(location.pathname, { path: '/order' });
    const orderItemsTransformed = [];

    cart.items.forEach(item => {
      orderItemsTransformed.push({
        image_url: `https:${item.variant_img}`,
        quantity: item.quantity,
        sku: item.sku,
        price: Number.parseFloat(item.unit_price),
        product_id: item.variant_id,
        variant: item.variant_id,
        name: item.variant_name,
        brand: cart.storeCode
      });
    });
    if (cart.cartDrawerOpened && !loc) {
      window.analytics.track('Cart Viewed', {
        cart_id: cart._id,
        num_products: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        products: orderItemsTransformed
      });
    }

    if (!cart.cartDrawerOpened && !loc) {
      window.analytics.track('Cart Dismissed', {
        cart_id: cart._id,
        num_products: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        products: orderItemsTransformed
      });
    }
  }, [cart.cartDrawerOpened]);

  const onClickLogo = useCallback(() => {
    dispatch(setCartDrawerOpened(false));
    history.push('/gallery');
  }, [dispatch, history]);

  const onClickProduct = useCallback(() => {
    dispatch(setCartDrawerOpened(false));
  }, [dispatch]);

  const togglePromo = useCallback(() => {
    setPromoVisible(!promoVisible);
  }, [promoVisible, setPromoVisible]);

  const handleCheckout = useCallback(() => {
    dispatch(setCartDrawerOpened(false));
    history.push('/checkout', hideLPCoupon);
  }, [dispatch, history]);

  const handleEditCart = useCallback(() => {
    dispatch(setCartDrawerOpened(true));
    history.push('/gallery', hideLPCoupon);
  }, [dispatch, history]);

  if (!cart) {
    return <AlertPanel type="info" text="No Cart" />;
  }

  if (!cart.items) {
    return null;
  }

  const shippingData = cart.shippingMethod;
  const mobileDrawerPadding = window.screen.width < 960 ? '24px 20px' : '0px';
  const isCheckoutPage =
    matchPath(location.pathname, { path: '/checkout' }) ||
    matchPath(location.pathname, { path: '/checkout2' });

  const checkoutPadding = xsBreakpoint ? '0px' : 'inherit';
  const drawerPadding = !isCheckoutPage ? mobileDrawerPadding : checkoutPadding;
  return (
    <Grid
      container
      style={{
        width: '100%',
        minWidth: '90%',
        margin: '0 auto',
        padding: drawerPadding
      }}
      className="cart-drawer"
    >
      <div>
        {cart.items.length > 0 ? (
          <StyledHeaderWrapper container direction="column">
            <Grid container direction="row" alignItems="baseline">
              <StyledCartHeader
                align="center"
                style={
                  xsBreakpoint
                    ? {
                        fontSize: '24px',
                        fontWeight: 'normal',
                        paddingTop: '0px'
                      }
                    : {}
                }
              >
                {showOrderSummaryText ? 'Order Summary' : 'Your Cart'}{' '}
              </StyledCartHeader>
              <StyledCartCountHeader
                component="span"
                style={xsBreakpoint ? { fontSize: '11px', fontWeight: '600' } : {}}
              >
                ({cartCount} Items)
              </StyledCartCountHeader>
              {cartNotification && isCheckoutPage ? (
                <CartNotification isCheckoutPage={isCheckoutPage} />
              ) : null}
            </Grid>
            {checkoutVersion === 2 ? (
              <MenuLink
                onClick={handleEditCart}
                underline="always"
                className={classes.editCart}
                children="EDIT CART"
              />
            ) : null}
            {!hideCheckoutProceedLink && (
              <Grid container direction="row" alignItems="flex-end">
                <StyledProceedCheckout component="span" onClick={handleCheckout}>
                  proceed to checkout
                  <StyledArrowIcon>
                    <RightArrow />
                  </StyledArrowIcon>
                </StyledProceedCheckout>
              </Grid>
            )}
          </StyledHeaderWrapper>
        ) : (
          <StyledHeaderWrapperEmptyCart container direction="column">
            <Grid container direction="row" alignItems="baseline">
              <StyledCartHeader align="center" style={{ paddingBottom: '25px' }}>
                Your Cart
              </StyledCartHeader>
              <StyledCartCountHeader component="span">({cartCount} Items)</StyledCartCountHeader>
            </Grid>
          </StyledHeaderWrapperEmptyCart>
        )}
      </div>
      <Grid container>
        {isCheckoutPage &&
        (activeStep === 2 || activeStep === 3 || (checkoutVersion === 2 && activeStep === 1)) &&
        restrictionMessage ? (
          <>
            <Typography className={classes.cartRestricted}>
              CHANGES TO YOUR CART: We’ve removed {restrictedProduct} from your cart because this
              product is not available in the state you selected. We hope to be able to offer{' '}
              {restrictedProduct} in your state soon!
            </Typography>
            {cartCount === 0 && (
              <NavLink to="/gallery" underline="always" className={classes.link}>
                Continue shopping
              </NavLink>
            )}
          </>
        ) : null}
      </Grid>

      <Grid container>
        {cart.items.length === 0 ? (
          <StyledGridEmptyCart item xs={12}>
            <StyledSmallCapsEmptyCart component="span">
              Your cart is currently empty
            </StyledSmallCapsEmptyCart>
          </StyledGridEmptyCart>
        ) : null}
        {cart.items.length > 0
          ? Object.values(cart.items).map((item, index) => (
              <StyledDrawerGrid container direction="row" key={`cart-${index}`}>
                <Grid
                  item
                  xs={4}
                  style={
                    !xsBreakpoint
                      ? { minWidth: '126px', marginRight: '18px' }
                      : { minWidth: '126px', marginRight: '18px' }
                  }
                >
                  <Card>
                    <Link
                      to={`/products/${item.slug}`}
                      onClick={() => {
                        segmentProductClickEvent({
                          image_url: `https:${item.variant_img}`,
                          quantity: item.quantity,
                          sku: item.sku,
                          price: Number.parseFloat(item.unit_price),
                          product_id: item.variant_id,
                          variant: item.variant_id,
                          name: item.variant_name,
                          brand: cart.storeCode,
                          cart_id: cart._id,
                          site_location: 'cart'
                        });
                      }}
                    >
                      <CardMedia
                        style={{ height: 126, width: 126 }}
                        image={item.variant_img}
                        title={item.variant_name}
                        onClick={onClickProduct}
                      />
                    </Link>
                  </Card>
                </Grid>
                <Grid item xs={xsBreakpoint ? 8 : 7}>
                  <Card
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Link
                      to={`/products/${item.slug}`}
                      style={{
                        textDecoration: 'none',
                        maxHeight: '40px'
                      }}
                      onClick={() => {
                        segmentProductClickEvent({
                          image_url: `https:${item.variant_img}`,
                          quantity: item.quantity,
                          sku: item.sku,
                          price: Number.parseFloat(item.unit_price),
                          product_id: item.variant_id,
                          variant: item.variant_id,
                          name: item.variant_name,
                          brand: cart.storeCode,
                          cart_id: cart._id,
                          site_location: 'cart'
                        });
                      }}
                    >
                      <StyledProductLink
                        style={{ fontSize: '18px', padding: '0' }}
                        align="left"
                        onClick={onClickProduct}
                      >
                        {item.variant_name}
                      </StyledProductLink>
                    </Link>
                    <Grid item style={{ padding: '0' }}>
                      {disableItemEditing ? (
                        <Box
                          style={{
                            fontFamily: 'p22-underground, sans-serif',
                            fontSize: '16px'
                          }}
                          component={Typography}
                          children={`QTY: ${item.quantity}`}
                        />
                      ) : (
                        <StyledCardActions>
                          <StyledCounterButton
                            color="primary"
                            onClick={e => adjustQty(cart, e.currentTarget.value, -1)}
                            style={{
                              fontSize: '20pt',
                              paddingBottom: '4px'
                            }}
                            value={index}
                            disabled={item.quantity < 2}
                          >
                            -
                          </StyledCounterButton>
                          <StyledSmallCaps style={{ fontSize: '18px' }}>
                            {item.quantity}
                          </StyledSmallCaps>
                          <StyledCounterButton
                            color="primary"
                            onClick={e => adjustQty(cart, e.currentTarget.value, 1)}
                            style={{
                              fontSize: '13pt',
                              paddingBottom: '2.5px'
                            }}
                            value={index}
                          >
                            +
                          </StyledCounterButton>
                        </StyledCardActions>
                      )}
                    </Grid>
                    <StyledCardContent
                      style={
                        !xsBreakpoint
                          ? { paddingBottom: '0' }
                          : { paddingBottom: '0px', paddingRight: '0px' }
                      }
                    >
                      <StyledFinePrint component="div" value={index}>
                        {!disableItemEditing && (
                          <Link
                            onClick={e => {
                              e.preventDefault();
                              removeFromCart(cart, index);
                            }}
                            style={{ color: '#9b9b9b' }}
                          >
                            <StyledRemoveLink>Remove</StyledRemoveLink>
                          </Link>
                        )}
                      </StyledFinePrint>
                      <StyledProductPrice style={xsBreakpoint ? { fontSize: '16px' } : {}}>
                        {displayMoney(item.quantity * item.unit_price)}
                      </StyledProductPrice>
                    </StyledCardContent>
                  </Card>
                </Grid>
              </StyledDrawerGrid>
            ))
          : null}
        {cart.items.length > 0 ? (
          <Grid item xs={12} style={{ textAlign: 'left' }}>
            <StyledTotalWrapper container direction="row" justify="space-between">
              <Grid item xs={6}>
                <StyledSmallCaps style={{ fontSize: '14px' }}>
                  Subtotal ({cartCount} Items)
                </StyledSmallCaps>
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <StyledProductTotal style={{ fontSize: '18px' }}>
                  {displayMoney(cart.subtotal)}
                </StyledProductTotal>
              </Grid>
            </StyledTotalWrapper>
          </Grid>
        ) : null}
        {cart.items.length > 0 && isCheckoutPage ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ margin: '10px 0px 0px' }}
          >
            <Grid item xs={6}>
              <StyledSmallCaps style={{ fontSize: '14px' }}>Shipping</StyledSmallCaps>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {displayMoney(shippingData.price, true)}
              </StyledProductTotal>
            </Grid>
            <StyledFinePrint component="p" style={{ position: 'relative', top: '6px' }}>
              {shippingData.deliveryEstimate}
            </StyledFinePrint>
          </Grid>
        ) : null}
        {cart.items.length > 0 && !isCheckoutPage ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ margin: '20px 0px 0px' }}
          >
            <Grid item xs={6}>
              <StyledSmallCaps style={{ fontSize: '14px' }}>Shipping</StyledSmallCaps>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {displayMoney(shippingData.price, true)}
              </StyledProductTotal>
            </Grid>
            <StyledFinePrint
              component="p"
              style={{ position: 'relative', top: '6px', marginBottom: '25px' }}
            >
              {shippingData.deliveryEstimate}
            </StyledFinePrint>
          </Grid>
        ) : null}
        {cart.items.length > 0 && cart.savings ? (
          <Grid
            container
            direction="row"
            xs={12}
            justify="space-between"
            style={{ margin: '20px 0' }}
          >
            <Grid item xs={6}>
              <StyledSmallCaps style={{ fontSize: '14px' }}>Savings</StyledSmallCaps>
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {displayMoney(cart.savings)}
              </StyledProductTotal>
            </Grid>
          </Grid>
        ) : null}
        {cart.items.length > 0 && isCheckoutPage ? (
          <Grid container direction="row" justify="space-between" style={{ margin: '20px 0 0' }}>
            <Grid item xs={6}>
              <StyledSmallCaps style={{ fontSize: '14px' }}>Tax</StyledSmallCaps>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {displayMoney(cart.tax)}
              </StyledProductTotal>
            </Grid>
          </Grid>
        ) : null}

        {cart.items.length > 0 ? (
          cart.promo ? (
            <PromoCodeView hideLPCoupon={hideLPCoupon} history={history} />
          ) : (
            <>
              <StyledPromoLink align="left" onClick={togglePromo}>
                {!promoVisible ? 'Enter Promo Code' : null}
              </StyledPromoLink>
              {promoVisible && <PromoCodeForm />}
            </>
          )
        ) : null}

        {cart.items.length > 0 ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            style={
              !xsBreakpoint
                ? {
                    marginBottom: '0',
                    borderTop: `solid 2px ${MEDIUM_GRAY}`,
                    paddingTop: '25px',
                    marginTop: '23px'
                  }
                : {
                    marginBottom: '0',
                    borderTop: `solid 2px ${MEDIUM_GRAY}`,
                    paddingTop: '10px',
                    marginTop: '10px'
                  }
            }
          >
            <Grid item xs={6}>
              <StyledEstimatedTotal style={xsBreakpoint ? { fontSize: '20px' } : {}}>
                {xsBreakpoint || checkoutVersion === 2 ? 'Total' : 'Estimated Total'}
              </StyledEstimatedTotal>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductPrice
                style={!xsBreakpoint ? { fontSize: '22px' } : { fontSize: '18px' }}
              >
                {displayMoney(cart.total)}
              </StyledProductPrice>
            </Grid>
          </Grid>
        ) : null}
        {cart.items.length > 0 && !hideTaxLabel && (
          <Grid container>
            <Grid item xs={12}>
              <StyledFinePrint component="div">Tax is calculated at checkout</StyledFinePrint>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

Cart.propTypes = {
  history: PropTypes.object.isRequired,
  hideCheckoutProceedLink: PropTypes.bool,
  disableItemEditing: PropTypes.bool,
  hideTaxLabel: PropTypes.bool
};

Cart.defaultProps = {
  hideCheckoutProceedLink: false,
  disableItemEditing: false,
  hideTaxLabel: false
};

export default withRouter(Cart);
