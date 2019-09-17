import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { AlertPanel } from '../../components/common';
import RightArrow from '../../components/common/Icons/Keyboard-Right-Arrow/ShoppingBag';
import ShoppingBag from '../../components/common/Icons/Shopping-Bag/ShoppingBag';

import { PromoCodeForm } from '../../components/forms';
import PromoCodeView from './PromoCodeView';

import { removeFromCart, adjustQty } from '../../modules/cart/functions';
import { setCartDrawerOpened } from '../../modules/cart/actions';

import { colorPalette } from '../../components/Theme/color-palette';
import {
  StyledCartHeader,
  StyledSmallCaps,
  StyledFinePrint,
  StyledCartCount,
  StyledHeaderWrapper,
  StyledProductLink,
  StyledCounterButton,
  StyledCardActions,
  StyledCardContent,
  StyledDrawerGrid,
  StyledGridEmptyCart,
  StyledTotalWrapper,
  StyledLogo,
  StyledLogoContainer,
  StyledArrowIcon,
  StyledShoppingBag,
  StyledBadge
} from './StyledComponents';

const { LIGHT_GRAY, MEDIUM_GRAY } = colorPalette;

const Cart = ({ history, showCheckoutProceedLink }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  //const cartCount = cart.items.length;
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const onClickLogo = useCallback(() => {
    dispatch(setCartDrawerOpened(false));
    history.push('/gallery');
  }, [dispatch, history]);

  const onClickProduct = useCallback(() => {
    const newItems = [...cart.items];
    dispatch(setCartDrawerOpened(false));
    newItems.map(item =>
      history.push(`/products/${item.prodSlug}/${item.varSlug}`)
    );
  }, [dispatch, history]);

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

  return (
    <Grid
      container
      xs={12}
      style={{ width: '100%', 'min-width': '90%', margin: '0 auto' }}
      className="cart-drawer"
    >
      <StyledLogoContainer>
        <StyledLogo onClick={onClickLogo}>LOGO</StyledLogo>
        <StyledShoppingBag display={{ xs: 'block', sm: 'none' }}>
          <StyledBadge
            invisible={cartCount < 1}
            badgeContent={cartCount}
            color="secondary"
          >
            <ShoppingBag />
          </StyledBadge>
        </StyledShoppingBag>
      </StyledLogoContainer>

      <div>
        <StyledHeaderWrapper container direction="column">
          <Grid container direction="row" alignItems="baseline">
            <StyledCartHeader align="center">Your Cart </StyledCartHeader>
            <StyledCartCount component="span">
              {' '}
              ({cartCount} Items)
            </StyledCartCount>
          </Grid>
          {cart.items.length !== 0
            ? showCheckoutProceedLink && (
              <Grid container direction="row" alignItems="flex-end">
                <StyledSmallCaps component="span" onClick={handleCheckout}>
                  proceed to checkout{' '}
                  <StyledArrowIcon>
                    <RightArrow />
                  </StyledArrowIcon>
                </StyledSmallCaps>
              </Grid>
            )
            : showCheckoutProceedLink && (
              <Grid container direction="row" alignItems="flex-end">
                <StyledSmallCaps
                  component="span"
                  onClick={e => e.preventDefault()}
                >
                  proceed to checkout{' '}
                  <StyledArrowIcon>
                    <RightArrow />
                  </StyledArrowIcon>
                </StyledSmallCaps>
              </Grid>
            )}
        </StyledHeaderWrapper>
      </div>
      <Grid container xs={12}>
        {cart.items.length === 0 ? (
          <StyledGridEmptyCart item xs={12}>
            <StyledSmallCaps component="span">
              Your cart is empty
            </StyledSmallCaps>
          </StyledGridEmptyCart>
        ) : (
            Object.values(cart.items).map((item, index) => (
              <>
                <StyledDrawerGrid container xs={12} direction="row">
                  <Grid
                    item
                    xs={4}
                    style={{ 'min-width': '126px', 'margin-right': '18px' }}
                  >
                    <Card>
                      <CardMedia
                        style={{ height: 126, width: 126 }}
                        image={item.variant_img}
                        title={item.variant_name}
                        onClick={onClickProduct}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={7}>
                    <Card
                      style={{
                        display: 'flex',
                        'flex-direction': 'column',
                        height: '126px',
                        'justify-content': 'space-between'
                      }}
                    >
                      <StyledProductLink align="left" onClick={onClickProduct}>
                        {item.variant_name}
                      </StyledProductLink>
                      <Grid item style={{ padding: '0' }}>
                        <StyledCardActions>
                          <StyledCounterButton
                            color="primary"
                            onClick={e => adjustQty(cart, e.currentTarget.value, -1)}
                            style={{ 'font-size': '18pt' }}
                            value={index}
                            disabled={item.quantity < 2}
                          >
                            -
                        </StyledCounterButton>
                          <StyledSmallCaps style={{ marginTop: '2px' }}>
                            {item.quantity}
                          </StyledSmallCaps>
                          <StyledCounterButton
                            color="primary"
                            onClick={e => adjustQty(cart, e.currentTarget.value, 1)}
                            style={{ 'font-size': '18pt' }}
                            value={index}
                          >
                            +
                        </StyledCounterButton>
                        </StyledCardActions>
                      </Grid>
                      <StyledCardContent style={{ 'padding-bottom': '0' }}>
                        <StyledFinePrint
                          component="div"
                          onClick={e => removeFromCart(cart, index)}
                          value={index}
                        >
                          <Link
                            style={{
                              'text-transform': 'uppercase',
                              color: LIGHT_GRAY
                            }}
                          >
                            Remove
                        </Link>
                        </StyledFinePrint>
                        {/* <StyledSmallCaps>{item.unit_price.toFixed(2)}</StyledSmallCaps> */}
                        <StyledSmallCaps>
                          {(item.quantity * item.unit_price).toFixed(2)}
                        </StyledSmallCaps>
                      </StyledCardContent>
                    </Card>
                  </Grid>
                </StyledDrawerGrid>
              </>
            ))
          )}
        <Grid item xs={12} style={{ 'text-align': 'left' }}>
          <StyledTotalWrapper
            container
            direction="row"
            xs={12}
            justify="space-between"
          >
            <Grid item xs={6}>
              <StyledSmallCaps style={{ 'font-size': '14px' }}>
                Subtotal:
              </StyledSmallCaps>
            </Grid>
            <Grid item xs={3} style={{ 'text-align': 'right' }}>
              <StyledSmallCaps style={{ 'font-size': '18px' }}>
                {`$${cart.subtotal.toFixed(2)}`}
              </StyledSmallCaps>
            </Grid>
          </StyledTotalWrapper>
        </Grid>
        <Grid
          container
          direction="row"
          xs={12}
          justify="space-between"
          style={{ margin: '20px 0' }}
        >
          <Grid item xs={6}>
            <StyledSmallCaps style={{ 'font-size': '14px' }}>
              Shipping
            </StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '18px' }}>
              $XXX.xx
            </StyledSmallCaps>
          </Grid>
          <StyledFinePrint component="p">
            Ground 3-5 Business Days
          </StyledFinePrint>
        </Grid>

        {cart.promo ? (
          <PromoCodeView />
        ) : (
            <PromoCodeForm />
          )}

        <Grid
          container
          direction="row"
          xs={12}
          justify="space-between"
          style={{
            'margin-bottom': '0',
            'border-top': `solid 2px ${MEDIUM_GRAY}`,
            'padding-top': '29px',
            'margin-top': '50px'
          }}
        >
          <Grid item xs={6}>
            <StyledSmallCaps>Estimated Total:</StyledSmallCaps>
          </Grid>
          <Grid item xs={3} style={{ 'text-align': 'right' }}>
            <StyledSmallCaps style={{ 'font-size': '22px' }}>
              {`$${cart.total.toFixed(2)}`}
            </StyledSmallCaps>
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={12}>
            <StyledFinePrint component="div">
              Tax is calculated at checkout
            </StyledFinePrint>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // </Grid>
  );
};

Cart.propTypes = {
  history: PropTypes.object.isRequired,
  showCheckoutProceedLink: PropTypes.bool
};

Cart.defaultProps = {
  showCheckoutProceedLink: false
};

export default withRouter(Cart);
