import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '../../components/common';
import ProductOutOfStockDialog from './ProductOutOfStockDialog';
import '../../pages/product/overrides.css';
import '../../pages/product/PDP-style.css';
import { Typography } from '@material-ui/core';
import EnvelopeIcon from './EnvelopeIcon';
import { closeSync } from 'fs';

const useStyles = makeStyles(theme => ({
  maxWidth: {
    maxWidth: '464px',
    padding: '0 16px'
  },

  btnOOS: {
    border: '1px solid',
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '15px 0 !important',
    fontSize: '14px !important',
    lineHeight: '1.8 !important',
    letterSpacing: '1.17px !important',
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  btnPDP: {
    border: '2px solid',
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    padding: '30px 0',
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  icon: {
    width: '33px',
    height: '18px'
  },
  text: {
    fontFamily: 'P22-Underground',
    fontSize: '14px',
    fontWeight: '900',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '1.33px',
    textAlign: 'center'
  },
  textPDP: {
    fontFamily: 'P22-Underground',
    fontSize: '16px',
    fontWeight: '900',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.59px',
    letterSpacing: '1.17px',
    textAlign: 'center'
  }
}));

export const ATC = ({ onClick, variantSku, ATCAdded, ATCAdding }) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      disabled={variantSku === null}
      className="atc-button"
    >
      {!ATCAdded ? 'ADD TO CART' : !ATCAdding ? 'PRODUCT ADDED' : 'ADDING...'}
    </Button>
  );
};

export const ATCPDP = ({
  onClick,
  variantSku,
  ATCAdded,
  ATCAdding,
  btnStyle
}) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      disabled={variantSku === null}
      className={btnStyle}
    >
      {!ATCAdded ? 'ADD TO CART' : !ATCAdding ? 'PRODUCT ADDED' : 'ADDING...'}
    </Button>
  );
};

export const OutOfStockPDP = ({
  onClick,
  onExited,
  product_img,
  product_name,
  product_category,
  product_id,
  product_sku,
  product_variant,
  openOutOfStockDialog,
  handleOpenEmailConfirmation
}) => {
  const classes = useStyles();
  return (
    <>
      <CardActions className={classes.maxWidth}>
        <Button className={classes.btnPDP} fullWidth onClick={onClick}>
          <EnvelopeIcon />
          <Typography className={classes.textPDP}>
            TELL ME WHEN IT'S AVAILABLE
          </Typography>
        </Button>
      </CardActions>
      {openOutOfStockDialog && (
        <ProductOutOfStockDialog
          onExited={onExited}
          product_img={product_img}
          product_name={product_name}
          product_category={product_category}
          product_id={product_id}
          product_sku={product_sku}
          product_variant={product_variant}
          handleOpenEmailConfirmation={handleOpenEmailConfirmation}
        />
      )}
    </>
  );
};

export const OutOfStock = ({
  onClick,
  onExited,
  product_img,
  product_name,
  product_category,
  product_id,
  product_sku,
  product_variant,
  openOutOfStockDialog,
  handleOpenEmailConfirmation,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <>
      <Box width={1} className="gallery-atc">
        <Button
          className={classes.btnOOS}
          fullWidth
          onClick={onClick}
          {...rest}
        >
          TELL ME WHEN IT IS AVAILABLE
        </Button>
      </Box>
      {openOutOfStockDialog && (
        <ProductOutOfStockDialog
          onExited={onExited}
          product_img={product_img}
          product_name={product_name}
          product_category={product_category}
          product_id={product_id}
          product_sku={product_sku}
          product_variant={product_variant}
          handleOpenEmailConfirmation={handleOpenEmailConfirmation}
        />
      )}
    </>
  );
};
