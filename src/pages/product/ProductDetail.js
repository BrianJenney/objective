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
  const [quantity, setQuantity] = useState(1);
  const { product, content } = useContext(ProductContext);
  const theme = useTheme();

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
    price,
    productSize,
    descriptionDisclaimer
  } = content;

  const productSubtitle = content.productHeadline;

  const renderProductTitleContainer = () => {
    const cbdText = <span className="cbd-content">{`(with ${cbdContent} CBD)`}</span>;
    return (
      <>
        <Typography id="full-spectrum">FULL SPECTRUM</Typography>
        <Typography variant="h1" className="pdp-header">
          {`CBD ${productName}`}
          <div>{cbdText}</div>
        </Typography>
        <Box className="pdp-subtitle">{productSubtitle}</Box>
      </>
    );
  };

  const handleSetQuantity = val => {
    if (quantity + val > 0) {
      setQuantity(quantity + val);
    }
  };

  const renderAtcContainer = () => {
    return (
      <Box className="pdp-atc-container" width={1}>
        <Box className="pdp-quantity">
          <button type="button" onClick={() => handleSetQuantity(-1)}>
            <img
              alt="Decrease quantity"
              src="http://cdn1.stopagingnow.com/bbCBD/icons/subtract.png"
            ></img>
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => handleSetQuantity(1)}>
            <img
              alt="Increase quantity"
              src="http://cdn1.stopagingnow.com/bbCBD/icons/add.png"
            ></img>
          </button>
        </Box>
        <Box className="atc-btn" ref={atcRef}>
          <ATC price={price} maxWidth={classes.maxWidth} btnStyle="pdp-atc-button" />
        </Box>
      </Box>
    );
  };

  const renderDetailSpecs = () => (
    <Box className="pdp-detail-specs">
      <Box className="pdp-origin-statement">
        <img alt="" src="http://cdn1.stopagingnow.com/bbCBD/svg/ingredients.svg"></img>
        <span>{naturalOriginPercentage} NATURAL ORIGIN</span>
      </Box>
      <Box className="pdp-skin-type">
        <div>
          SIZE:<span>{productSize}</span>
        </div>
        <div>
          SKIN&#8209;TYPE:<span>{skinType}</span>
        </div>
      </Box>
    </Box>
  );

  const renderDescriptionContainer = () => (
    <Box className="pdp-description">
      <Box>{productDescription}</Box>
      <br></br>
      <Box>{descriptionDisclaimer}</Box>
    </Box>
  );

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
                  {renderProductTitleContainer()}
                  {renderAtcContainer()}
                  {renderDetailSpecs()}
                  {renderDescriptionContainer()}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

export default withRouter(ProductDetail);
