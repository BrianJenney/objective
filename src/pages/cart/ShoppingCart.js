import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import CartDrawer from './CartDrawer';
import TemporaryCartDrawer from '../../components/common/TemporaryCartDrawer';
import shoppingBagLogo from '../../assets/images/shopping_bag.svg';
import { StyledCartCloseIcon } from './StyledComponents';

const ShoppingCart = ({ hideLPCoupon, isBundleLP, showCartCount }) => {
  const cart = useSelector(state => state.cart);
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <TemporaryCartDrawer
      hideLPCoupon={hideLPCoupon}
      toggleContent={
        <>
          {isBundleLP ? (
            <> </>
          ) : (
            <img
              width="15"
              height="17"
              style={{ objectFit: 'contain' }}
              src={shoppingBagLogo}
              alt="shopping"
            />
          )}
          <span
            style={{
              fontFamily: 'p22-underground, sans-serif',
              fontSize: '14px'
            }}
          >
            {isBundleLP || !showCartCount ? '' : cartCount}
          </span>
        </>
      }
      closer={
        <StyledCartCloseIcon
          children={
            <CloseIcon
              style={{
                width: '40px',
                height: '40px',
                color: '#979797'
              }}
            />
          }
        />
      }
      listContent={<CartDrawer showCheckoutProceedLink />}
      side="right"
    />
  );
};

ShoppingCart.propTypes = {
  hideLPCoupon: PropTypes.bool,
  isBundleLP: PropTypes.bool,
  showCartCount: PropTypes.bool
};

ShoppingCart.defaultProps = {
  hideLPCoupon: false,
  isBundleLP: false,
  showCartCount: true
};

export default ShoppingCart;
