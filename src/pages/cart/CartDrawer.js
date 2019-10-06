import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { AlertPanel } from '../../components/common';
import RightArrow from '../../components/common/Icons/Keyboard-Right-Arrow/ShoppingBag';

import { PromoCodeForm } from '../../components/forms';
import PromoCodeView from './PromoCodeView';

import {
  removeFromCart,
  adjustQty,
  calculateCartTotals
} from '../../modules/cart/functions';
import { setCartDrawerOpened } from '../../modules/cart/actions';

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

const { MEDIUM_GRAY } = colorPalette;

const Cart = ({
  history,
  hideCheckoutProceedLink,
  disableItemEditing,
  hideTaxLabel,
  showOrderSummaryText,
  xsBreakpoint
}) => {
  const cart = useSelector(state => state.cart);
  const [promoVisible, setPromoVisible] = useState(false);
  const dispatch = useDispatch();
  const isTaxCalculationInProgress = useSelector(state => state.tax.isLoading);
  //const cartCount = cart.items.length;
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

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
    history.push('/checkout');
  }, [dispatch, history]);

  if (!cart) {
    return <AlertPanel type="info" text="No Cart" />;
  }

  if (!cart.items) {
    return null;
  }

  const code = get(cart, 'shipping.code', '');
  const options = get(cart, 'shipping.options', {});
  const shippingData = get(options, code, {});
  const totalSummary = calculateCartTotals(cart);
  const mobileDrawerPadding = xsBreakpoint ? '0px' : '24px 20px';
  return (
    <Grid
      container
      style={{
        width: '100%',
        minWidth: '90%',
        margin: '0 auto',
        padding: mobileDrawerPadding
      }}
      className="cart-drawer"
    >
      <div>
        {cart.items.length > 0 ? (
          <StyledHeaderWrapper container direction="column">
            <Grid container direction="row" alignItems="baseline">
              <StyledCartHeader align="center" style={xsBreakpoint ? { fontSize: "24px", fontWeight: "normal", paddingTop: "0px" } : {}}>{showOrderSummaryText ? 'Order Summary' : 'Your Cart'} </StyledCartHeader>
              <StyledCartCountHeader component="span" style={xsBreakpoint ? { fontSize: "11px", fontWeight: "600" } : {}}>
                {' '}
                ({cartCount} Items)
              </StyledCartCountHeader>
            </Grid>
            {!hideCheckoutProceedLink && (
              <Grid container direction="row" alignItems="flex-end">
                <StyledProceedCheckout
                  component="span"
                  onClick={handleCheckout}
                >
                  proceed to checkout{' '}
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
                <StyledCartHeader
                  align="center"
                  style={{ paddingBottom: '25px' }}
                >
                  Your Cart{' '}
                </StyledCartHeader>
                <StyledCartCountHeader component="span">
                  {' '}
                  ({cartCount} Items)
              </StyledCartCountHeader>
              </Grid>
            </StyledHeaderWrapperEmptyCart>
          )}
      </div>
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
                  <Link to={`/products/${item.slug}`}>
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
                      maxHeight: '40px',
                      overflow: 'hidden'
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
                            onClick={e =>
                              adjustQty(cart, e.currentTarget.value, -1)
                            }
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
                            onClick={e =>
                              adjustQty(cart, e.currentTarget.value, 1)
                            }
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
                          onClick={e => removeFromCart(cart, index)}
                          style={{ color: '#9b9b9b' }}
                        >
                          <StyledRemoveLink>Remove</StyledRemoveLink>
                        </Link>
                      )}
                    </StyledFinePrint>
                    <StyledProductPrice
                      style={xsBreakpoint ? { fontSize: '16px' } : {}}
                    >
                      {`$${(item.quantity * item.unit_price).toFixed(2)}`}
                    </StyledProductPrice>
                  </StyledCardContent>
                </Card>
              </Grid>
            </StyledDrawerGrid>
          ))
          : null}
        {cart.items.length > 0 ? (
          <Grid item xs={12} style={{ textAlign: 'left' }}>
            <StyledTotalWrapper
              container
              direction="row"
              justify="space-between"
            >
              <Grid item xs={6}>
                <StyledSmallCaps style={{ fontSize: '14px' }}>
                  Subtotal ({cartCount} Items)
                </StyledSmallCaps>
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <StyledProductTotal style={{ fontSize: '18px' }}>
                  {`$${totalSummary.subtotal.toFixed(2)}`}
                </StyledProductTotal>
              </Grid>
            </StyledTotalWrapper>
          </Grid>
        ) : null}
        {cart.items.length > 0 ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ margin: '20px 0px 0px' }}
          >
            <Grid item xs={6}>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Shipping
              </StyledSmallCaps>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {`$${
                  shippingData.price ? shippingData.price.toFixed(2) : '0.00'
                  }`}
              </StyledProductTotal>
            </Grid>
            <StyledFinePrint
              component="p"
              style={{ position: 'relative', top: '6px' }}
            >
              {shippingData.name}
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
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Savings
              </StyledSmallCaps>
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {`$${cart.savings.toFixed(2)}`}
              </StyledProductTotal>
            </Grid>
          </Grid>
        ) : null}
        {cart.items.length > 0 ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ margin: '20px 0' }}
          >
            <Grid item xs={6}>
              <StyledSmallCaps style={{ fontSize: '14px' }}>
                Tax
              </StyledSmallCaps>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductTotal style={{ fontSize: '18px' }}>
                {!isTaxCalculationInProgress && totalSummary.tax
                  ? `$${totalSummary.tax.toFixed(2)}`
                  : '$0.00'}
              </StyledProductTotal>
            </Grid>
          </Grid>
        ) : null}

        {cart.items.length > 0 ? (
          cart.promo ? (
            <PromoCodeView />
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
                  paddingTop: '29px',
                  marginTop: '30px'
                }
                : {
                  marginBottom: '0',
                  borderTop: `solid 2px ${MEDIUM_GRAY}`,
                  paddingTop: '21px',
                  marginTop: '30px'
                }
            }
          >
            <Grid item xs={6}>
              <StyledEstimatedTotal
                style={xsBreakpoint ? { fontSize: '20px' } : {}}
              >
                {xsBreakpoint ? 'Total' : 'Estimated Total'}
              </StyledEstimatedTotal>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <StyledProductPrice
                style={
                  !xsBreakpoint ? { fontSize: '22px' } : { fontSize: '18px' }
                }
              >
                {`$${totalSummary.total.toFixed(2)}`}
              </StyledProductPrice>
            </Grid>
          </Grid>
        ) : null}
        {cart.items.length > 0 && !hideTaxLabel && (
          <Grid container>
            <Grid item xs={12}>
              <StyledFinePrint component="div">
                Tax is calculated at checkout
              </StyledFinePrint>
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
