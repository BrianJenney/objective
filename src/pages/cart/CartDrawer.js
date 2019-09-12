import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge/Badge';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { AlertPanel } from '../../components/common';
import { calculateCartTotal } from './CartFunctions';
import {
  requestPatchCart,
  setCartDrawerOpened
} from '../../modules/cart/actions';
import RightArrow from '../../components/common/Icons/Keyboard-Right-Arrow/ShoppingBag';
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
  StyledPromoCode,
  StyledLogo,
  StyledLogoContainer,
  StyledArrowIcon,
  StyledShoppingBag
} from './StyledComponents';
import ShoppingBag from '../../components/common/Icons/Shopping-Bag/ShoppingBag';

const { LIGHT_GRAY, MEDIUM_GRAY, BLACK } = colorPalette;

const Cart = ({ history, showCheckoutProceedLink }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cartCount = cart.items.length;

  const applyCoupon = useCallback(e => {
    console.log('Logic to apply coupon goes here');
  }, []);

  const removeFromCart = e => {
    const newItems = [...cart.items];
    newItems.splice(e.currentTarget.value, 1);

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    dispatch(requestPatchCart(cart._id, patches));
  };

  const adjustQty = (e, amt) => {
    const newItems = [...cart.items];
    newItems[e.currentTarget.value].quantity += amt;

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    dispatch(requestPatchCart(cart._id, patches));
  };

  const onClickLogo = useCallback(() => {
    dispatch(setCartDrawerOpened(false));
    history.push('/gallery');
  }, [dispatch, history]);

  const onClickProduct = useCallback(() => {
    const newItems = [...cart.items];
    dispatch(setCartDrawerOpened(false));
    newItems.map(item => (
      history.push(`/products/${item.prodSlug}/${item.varSlug}`)
    ))
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
    >
      <StyledLogoContainer>
        <StyledLogo onClick={onClickLogo}>LOGO</StyledLogo>
        <StyledShoppingBag display={{ xs: 'block', sm: 'none' }}>
          <Badge
            invisible={cartCount < 1}
            badgeContent={cartCount}
            color="secondary"
          >
            <ShoppingBag />
          </Badge>
        </StyledShoppingBag>
      </StyledLogoContainer>

      <div>
        <StyledHeaderWrapper container direction="column">
          <Grid container direction="row" alignItems="baseline">
            <StyledCartHeader align="center">Your Cart </StyledCartHeader>
            <StyledCartCount component="span">
              {' '}
              ({cart.items.length} Items)
            </StyledCartCount>
          </Grid>
          {showCheckoutProceedLink && (
            <Grid container direction="row" alignItems="flex-end">
              <StyledSmallCaps component="span" onClick={handleCheckout}>
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
                            onClick={e => adjustQty(e, -1)}
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
                            onClick={e => adjustQty(e, 1)}
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
                          onClick={e => removeFromCart(e)}
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
                Subtotal Total:
              </StyledSmallCaps>
            </Grid>
            <Grid item xs={3} style={{ 'text-align': 'right' }}>
              <StyledSmallCaps style={{ 'font-size': '18px' }}>
                {`$${cart.total.toFixed(2)}`}
              </StyledSmallCaps>
            </Grid>
          </StyledTotalWrapper>
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

          <Grid container direction="row" xs={12} justify="space-between">
            <Grid item xs={12}>
              <StyledSmallCaps style={{ 'font-size': '14px' }}>
                Promo Code
              </StyledSmallCaps>
            </Grid>
            <Grid container xs={12} style={{ 'align-items': 'flex-end' }}>
              <Grid item xs={8}>
                <StyledPromoCode
                  // label="Enter Promo Code"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4} style={{ 'text-align': 'right' }}>
                <StyledSmallCaps
                  component="span"
                  style={{ 'font-size': '18px' }}
                >
                  <Link to="" style={{ color: BLACK }}>
                    Apply
                  </Link>
                </StyledSmallCaps>
              </Grid>
            </Grid>
          </Grid>
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
    </Grid>
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
