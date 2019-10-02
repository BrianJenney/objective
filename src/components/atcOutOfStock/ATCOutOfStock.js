import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MailOutline from '@material-ui/icons/MailOutline';
import { Button } from '../../components/common';
import ProductOutOfStockDialog from './ProductOutOfStockDialog';
import '../../pages/product/overrides.css';
import '../../pages/product/PDP-style.css';

const useStyles = makeStyles(theme => ({
  maxWidth: {
    maxWidth: '464px'
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

export const ATC = ({ onClick, variantSku, ATCAdded, ATCAdding }) => {
  const classes = useStyles();
  return (
    <Grid className="mobile-padding-small">
      <CardActions className={classes.maxWidth}>
        <Button fullWidth onClick={onClick} disabled={variantSku === null}>
          {!ATCAdded
            ? 'ADD TO CART'
            : !ATCAdding
            ? 'PRODUCT ADDED'
            : 'ADDING...'}
        </Button>
      </CardActions>
    </Grid>
  );
};

export const OutOfStock = ({
  onClick,
  onExited,
  product_img,
  product_name,
  openOutOfStockDialog,
  handleOpenEmailConfirmation
}) => {
  const classes = useStyles();
  return (
    <Grid>
      <CardActions className={classes.maxWidth}>
        <Button className={classes.btnOOS} fullWidth onClick={onClick}>
          <MailOutline className={classes.icon} /> TELL ME WHEN IT'S AVAILABLE
        </Button>
      </CardActions>
      {openOutOfStockDialog && (
        <ProductOutOfStockDialog
          onExited={onExited}
          product_img={product_img}
          product_name={product_name}
          handleOpenEmailConfirmation={handleOpenEmailConfirmation}
        />
      )}
    </Grid>
  );
};
