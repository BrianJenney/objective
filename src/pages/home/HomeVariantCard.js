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
import { setCartDrawerOpened } from '../../modules/cart/actions';

import { Button } from '../../components/common';
import './home-style.scss';

export const bestSellers = [
  {
    name: 'Everything Armor',
    id: '5d8bb76ff5005515a437d4c8',
    assets: {
      imgs: 'https://cdn1.stopagingnow.com/objective/everything_armor_front.png'
    },
    sku: 'TPZU-1BOT-GELS',
    variantInfo: { prodType: 'Softgels', size: '30' },
    attributes: [],
    effectivePrice: 35.0,
    slug: 'TPZU1',
    prodSlug: 'everything-armor',
    cardColor: 'green'
  },
  {
    name: 'Focus + Clarity',
    id: '5ceebfdca686a03bccfa67c0',
    assets: {
      imgs:
        'https://cdn1.stopagingnow.com/objective/focus_and_clarity_front.png'
    },
    sku: 'TSGF-1BOT-CAPS',
    variantInfo: { prodType: 'Veggie Capsules', size: '30' },
    attributes: [],
    effectivePrice: 50.0,
    slug: 'TSGF1',
    prodSlug: 'focus-clarity',
    cardColor: 'blue'
  },
  {
    name: 'Smooth + Luminous',
    id: '5d8bb840f5005515a437d4cb',
    assets: {
      imgs: 'https://cdn1.stopagingnow.com/objective/smooth_luminous_front.png'
    },
    sku: 'TCNB-1BOT-PWD',
    variantInfo: { prodType: 'OZ', size: '2.7' },
    attributes: [],
    effectivePrice: 35.0,
    slug: 'TCNB1',
    prodSlug: 'smooth-luminous',
    cardColor: 'red'
  }
];

export const familySolutions = [
  {
    name: 'Proactive Prostate',
    id: '5d8ba4f6f5005515a437d4be',
    assets: {
      imgs:
        'https://cdn1.stopagingnow.com/objective/Proactive_Prostate_Front.png'
    },
    sku: 'TOPT-1BOT-GELS',
    variantInfo: { prodType: 'Softgels', size: '60' },
    attributes: [],
    effectivePrice: 51.0,
    slug: 'TOPT1',
    prodSlug: 'proactive-prostate',
    cardColor: 'green'
  },
  {
    name: 'Keep Cool',
    id: '5ce6d310585756469c36e250',
    assets: {
      imgs: 'https://cdn1.stopagingnow.com/objective/keep_cool_front.png'
    },
    sku: 'TMNO-1BOT-CAPS',
    variantInfo: { prodType: 'Veggie Capsules', size: '30' },
    attributes: [],
    effectivePrice: 50.0,
    slug: 'TMNO1',
    prodSlug: 'keep-cool',
    cardColor: 'blue'
  },
  {
    name: 'Immune + Wellness',
    id: '5ceec52ba686a03bccfa67c5',
    assets: {
      imgs:
        'https://cdn1.stopagingnow.com/objective/immune_and_wellness_front.png'
    },
    sku: 'TIMN-1BOT-GUMS',
    variantInfo: { prodType: 'Gummies', size: '60' },
    attributes: [],
    effectivePrice: 80.04,
    slug: 'TIMN1',
    prodSlug: 'immune-wellness',
    cardColor: 'red'
  }
];

export const HomeVariantCard = ({ variant }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const ref = createRef();
  const {
    name,
    effectivePrice,
    prodSlug,
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
    }, 500);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [cart, variant, dispatch, ref]);

  return (
    <Grid item xs={12} md={4}>
      <Card className={`tile ${cardColor}`} ref={ref}>
        <CardMedia
          style={{ height: 430, width: 430 }}
          image={assets.imgs}
          className="tile-img"
        />
        <CardContent className="pding">
          <div className="prod-name-holder">
            <Typography>
              <Link to={`/products/${prodSlug}`} className="title">
                {name}
              </Link>
            </Typography>
          </div>
          <div className="variant-info">
            <div>
              <strong>${effectivePrice.toFixed(2)}</strong> &mdash;{' '}
              {`${variantInfo.size} ${variantInfo.prodType}`}
            </div>
          </div>
        </CardContent>
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
