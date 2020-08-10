import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import { useTheme, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ProductContext from '../../contexts/ProductContext';
import { useQuantity, useWindowSize } from '../../hooks';
import { Dialog, MenuLink } from '../../components/common';
import LogoShort from '../../components/common/Icons/LogoShort/LogoShort';
import PDPSlider from '../../components/ProductSlider/PDPSlider';
import './overrides.css';
import { addToCart } from '../../modules/cart/functions';
import { getPrices, getVariantMap, getDefaultSkuByProduct } from '../../utils/product';
import { ATC, OutOfStockPDP } from '../../components/atcOutOfStock';
import ConfirmEmail from './ProductOutOfStockEmailConfirmed';
import ProductAccordion from './ProductAccordion';
import './PDP-style.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import { StyledContainer } from '../../assets/styles/StyledComponents';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: '22px'
    }
  },
  maxWidth: {
    maxWidth: '464px',
    justifyContent: 'center'
  },
  cardRootOverrides: {
    display: 'flex',
    flexDirection: 'column'
  },
  box: {
    backgroundColor: 'transparent'
  },
  btnOOS: {
    border: '1.5px solid',
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  icon: {
    marginRight: '10px'
  }
}));

const ProductDetail = () => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const windowSize = useWindowSize();
  const contentRef = useRef();
  const atcRef = useRef();
  const dispatch = useDispatch();
  const { product, content } = useContext(ProductContext);
  const theme = useTheme();

  const handleWindowScroll = evt => {
    const OFFSET = 80;
    const scrollingElement = evt.target.scrollingElement || evt.target.document.scrollingElement;
    const { scrollTop } = scrollingElement;

    if (atcRef.current && contentRef.current) {
      if (
        scrollTop >
        OFFSET + contentRef.current.offsetTop + contentRef.current.offsetHeight - windowSize.height
      ) {
        atcRef.current.style.position = 'static';
        atcRef.current.style.boxShadow = 'none';
      } else {
        atcRef.current.style.position = 'fixed';
        atcRef.current.style.boxShadow = '0 0 8px 8px #ccc';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  if (!content) {
    return <LoadingSpinner loadingMessage="Loading product" page="pdp" />;
  }

  const {
    productImages,
    productName,
    productDescription,
    skinType,
    naturalOriginPercentage,
    cbdContent,
    price
  } = content;

  const productSubtitle = content.productHeadline;

  console.log(content);

  // return (
  //   <>
  //     <p>{productName}</p>
  //     <p>{productHeadline}</p>
  //     <p>{productDescription}</p>
  //   </>
  // );

  const renderProductTitle = () => {
    const cbdText = <span className="cbd-content">{`(with ${cbdContent} CBD)`}</span>;
    return (
      <>
        <Typography id="full-spectrum">FULL SPECTRUM</Typography>
        <Typography
          variant="h1"
          className="pdp-header"
          style={{ color: theme.palette.brand.lighterGreen }}
        >
          {`CBD ${productName}`}
          {cbdText}
        </Typography>
      </>
    );
  };

  return (
    <Box className={classes.root}>
      <StyledContainer>
        <Grid container xs={12} sm={12}>
          <Grid item xs={12} sm={7}>
            <PDPSlider images={productImages} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className={classes.box}>
              <CardContent className={classes.cardRootOverrides}>
                <Box className="pdp-content" ref={contentRef}>
                  {renderProductTitle()}
                  <Box className="pdp-subtitle">{productSubtitle}</Box>
                  <Box className="pdp-description">{productDescription}</Box>
                  <Box className="pdp-accordion">
                    <ProductAccordion content={content} />
                  </Box>
                  <Quantity />
                </Box>
              </CardContent>
              <CardActions className={classes.maxWidth}>
                <Box className="pdp-atc-container" width={1}>
                  <Box className="atc-btn" ref={atcRef}>
                    <ATC price={price} maxWidth={classes.maxWidth} />
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

export default withRouter(ProductDetail);
