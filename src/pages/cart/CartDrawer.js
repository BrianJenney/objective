import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { AlertPanel } from '../../components/common';
import { Link } from 'react-router-dom';
import { calculateCartTotal } from './CartFunctions';
import { requestFetchCart, requestPatchCart } from '../../modules/cart/actions';
import store from '../../store';
import RightArrow from '../../components/common/Icons/Keyboard-Right-Arrow/ShoppingBag';
import { fonts } from '../../components/Theme/fonts'
import { colorPalette } from '../../components/Theme/color-palette';
import {
  StyledCartHeader,
  StyledSmallCaps,
  StyledFinePrint,
  StyledCartCount,
  StyledHeaderWrapper,
  StyledCheckoutButton,
  StyledProductLink,
  StyledCounterButton,
  StyledCardActions,
  StyledCardContent,
  StyledDrawerGrid,
  StyledGridEmptyCart,
  StyledTotalWrapper
} from './StyledComponents';


const { $brandSans } = fonts
const { LIGHT_GRAY, MEDIUM_GRAY, BLACK } = colorPalette

class Cart extends React.Component {
  applyCoupon(e) {
    console.log('Logic to apply coupon goes here');
  }

  removeFromCart(e) {

    const newItems = [...this.props.cart.items];
    newItems.splice(e.currentTarget.value, 1);

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(this.props.cart._id, patches));
  }

  adjustQty(e, amt) {
    const newItems = [...this.props.cart.items];
    newItems[e.currentTarget.value].quantity += amt;

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(this.props.cart._id, patches));
  }

  render() {
    if (!this.props.cart) {
      return <AlertPanel type="info" text="No Cart" />;
    }

    if (!this.props.cart.items) {
      return null;
    }

    return (
      <Grid container xs={12} style={{'width': '100%', 'min-width': '90%', 'margin': '0 auto'}}>
        <div>
          <StyledHeaderWrapper container direction="column">
            <Grid container direction="row" alignItems="baseline" >
              <StyledCartHeader align="center" >
                Your Cart {' '}
              </StyledCartHeader>
            <StyledCartCount component="span">
              {' '}
              ({this.props.cart.items.length} Items)
            </StyledCartCount>
            </Grid>
            <Grid container direction="row" alignItems="flex-end">
              <StyledSmallCaps component="span">
                proceed to checkout
              </StyledSmallCaps>
              <RightArrow />
            </Grid>
          </StyledHeaderWrapper>
        </div>
        <Grid container xs={12}>
          {this.props.cart.items.length === 0 ? (
            <StyledGridEmptyCart item xs={12}>
              <StyledSmallCaps component="span">
              Your cart is empty
            </StyledSmallCaps>
            </StyledGridEmptyCart>
          ) : (
              Object.values(this.props.cart.items).map((item, index) => (
                <>
                  <StyledDrawerGrid container xs={12} direction='row'>
                    <Grid item xs={4} style={{'min-width': '126px', 'margin-right': '18px'}}>
                      <Card>
                      <CardMedia
                        style={{ height: 126, width: 126 }}
                        image={item.product_img}
                        title={item.product_name}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={7}>
                  <Card style={{'display': 'flex', 'flex-direction': 'column', 'height': '126px', 'justify-content':'space-between'}}>
                    <Link to={`product/${item.product_id}`} style={{'text-decoration': 'none'}}>
                      <StyledProductLink align="left">
                        {item.variant_name}
                      </StyledProductLink>
                    </Link>
                    <Grid item style={{'padding': '0'}}>
                    <StyledCardActions>
                      <StyledCounterButton
                        color="primary"
                        onClick={e => this.adjustQty(e, -1)}
                        style={{ 'font-size': '18pt' }}
                        value={index}
                      >
                        -
                      </StyledCounterButton>
                      <StyledSmallCaps style={{'marginTop': '2px'}}>{item.quantity}</StyledSmallCaps>
                      <StyledCounterButton
                        color="primary"
                        onClick={e => this.adjustQty(e, 1)}
                        style={{ 'font-size': '18pt' }}
                        value={index}
                      >
                        +
                      </StyledCounterButton>
                    </StyledCardActions>
                    </Grid>
                        <StyledCardContent style={{'padding-bottom': '0'}}>
                          <StyledFinePrint component="div" onClick={e => this.removeFromCart(e)} value={index}>
                            <Link style={{'text-transform': 'uppercase', 'color': LIGHT_GRAY }}>Remove</Link>
                          </StyledFinePrint>
                          {/* <StyledSmallCaps>{item.unit_price.toFixed(2)}</StyledSmallCaps> */}
                          <StyledSmallCaps>{(item.quantity * item.unit_price).toFixed(2)}</StyledSmallCaps>
                        </StyledCardContent>
                  </Card>
                    </Grid>
                  </StyledDrawerGrid>
                </>
              ))
            )
          }
          <Grid item xs={12} container>

            <StyledTotalWrapper container direction="row" xs={12} justify='space-between'>
              <Grid item xs={6}>
                <StyledSmallCaps style={{'font-size': '14px'}}>
                  Estimated Total:
                </StyledSmallCaps>
              </Grid>
              <Grid item xs={3} style={{ 'text-align': 'right' }}>
                <StyledSmallCaps style={{'font-size': '18px'}}>
                  {`$${this.props.cart.total.toFixed(2)}`}
                </StyledSmallCaps>
              </Grid>
            </StyledTotalWrapper>

            <Grid container direction="row" xs={12} justify='space-between' style={
              { 'margin': '20px 0' }
            }>
              <Grid item xs={6}>
                <StyledSmallCaps style={{'font-size': '14px'}}>
                  Shipping
                </StyledSmallCaps>
              </Grid>
              <Grid item xs={3} style={{ 'text-align': 'right' }}>
                <StyledSmallCaps style={{'font-size': '18px'}}>
                  $XXX.xx
                </StyledSmallCaps>
              </Grid>
              <StyledFinePrint component='p'>Ground 3-5 Business Days</StyledFinePrint>
            </Grid>

            <Grid container direction="row" xs={12} justify='space-between' >
              <Grid item xs={6}>
                <StyledSmallCaps style={{'font-size': '14px'}}>
                  Savings
                </StyledSmallCaps>
              </Grid>
              <Grid item xs={3} style={{ 'text-align': 'right' }}>
                <StyledSmallCaps style={{'font-size': '18px'}}>
                  $XXX.xx
                </StyledSmallCaps>
              </Grid>
            </Grid>
            <Link to='/' style={
              { 'margin-top': '-10px', 'font-family': $brandSans, 'text-transform': 'uppercase', 'color': BLACK, 'font-size': '14px', 'text-decoration': 'underline' }
            }>Enter Promo Code</Link>
            <Grid container direction="row" xs={12} justify='space-between' style={
              { 'margin-bottom': '0', 'border-top': `solid 2px ${MEDIUM_GRAY}`, 'padding-top': '29px' , 'margin-top': '20px'}
            }>
              <Grid item xs={6}>
                <StyledSmallCaps>
                  Estimated Total:
                </StyledSmallCaps>
              </Grid>
              <Grid item xs={3} style={{ 'text-align': 'right' }}>
                <StyledSmallCaps style={{'font-size': '22px'}}>
                  {`$${this.props.cart.total.toFixed(2)}`}
                </StyledSmallCaps>
              </Grid>
            </Grid>

            <Grid container xs={12}>
              <Grid item xs={12}>
                <StyledFinePrint component="div">
                  Tax is calculated at checkout
                </StyledFinePrint>
              </Grid>
              <Grid item xs={12}>
                <StyledCheckoutButton color="primary" variant="contained">
                  <Link to="/checkout" style={{'color': 'white', 'text-decoration': 'none', 'font-family': $brandSans, 'font-weight': 'bold'}}>Checkout</Link>
                </StyledCheckoutButton>
              </Grid>
            </Grid>


          </Grid>
          
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  requestFetchCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
