import React, { useCallback, useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

import { addToCart } from '../../modules/cart/functions';

import { Button, NavLink } from '../../components/common';
import './home-style.scss';

export const HomeVariantCard = ({ variant }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const ref = createRef();
  const {
    name,
    effectivePrice,
    slug,
    variantInfo,
    assets,
    cardColor
  } = variant;
  const handleAddToCart = useCallback(() => {
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      //Give effect of item being added
      addToCart(cart, variant, 1);
      setATCAdding(false);
      setTimeout(() => {
        setATCAdded(false);
      },500)
    }, 500);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [cart, variant, dispatch, ref]);

  return (
    <Grid item xs={12} md={4}>
      <Card className={`tile ${cardColor}`} ref={ref}>
        <NavLink to={`/products/${slug}`} underline="none">
          <CardMedia
            style={{ height: 430, width: '100%' }}
            image={assets.imgs}
            className="tile-img"
          />

          <CardContent className="pding">
            <div className="prod-name-holder">
              <Typography>
                <Link to={`/products/${slug}`} className="title">
                  {name}
                </Link>
              </Typography>
            </div>
            <div className="variant-info">
              <div>
                <strong>${parseFloat(effectivePrice).toFixed(2)}</strong> &mdash;{' '}
                {`${variantInfo.size} ${variantInfo.prodType}`}
              </div>
            </div>
          </CardContent>
        </NavLink>
        <div className="cta-area">
          <CardActions className="home-atc">
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              className="atc-button"
              onClick={handleAddToCart}
            >
              {!ATCAdded
                ? 'ADD TO CART'
                : !ATCAdding
                  ? 'PRODUCT ADDED'
                  : 'ADDING...'}
            </Button>
          </CardActions>
        </div>
      </Card>
    </Grid>
  );
};
