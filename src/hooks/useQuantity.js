import React, { useCallback, useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  counterGrid: {
    // width: '80%',
    marginLeft: 0,
    maxWidth: '464px'
  },
  counterWrapper: {
    width: '100%',
    height: '59px',
    padding: '0 !important',
    border: 'solid 1px #100f0f'
  },
  counterBlock: {
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0 !important',
    width: 'inherit !important',
    height: '59px'
  },
  iconButton: {
    padding: '0 !important',
    width: '80px',
    height: '59px',
    borderRadius: '0 !important'
  },
  iconButtonPlus: {
    borderLeft: 'solid 1px #100f0f',
    borderRadius: 0,
    backgroundColor: '#B5C5C3 !important',
    padding: 0,
    alignSelf: 'flex-start',
    height: '56px',
    width: '100%',
    maxWidth: '17.5%',
    minWidth: '60px',
    '&:active': {
      backgroundColor: '#6A8C87 !important'
    }
  },
  iconButtonMinus: {
    borderRight: 'solid 1px #100f0f',
    borderRadius: 0,
    backgroundColor: '#B5C5C3 !important',
    padding: 0,
    alignSelf: 'flex-start',
    height: '56px',
    width: '100%',
    maxWidth: '17.5%',
    minWidth: '60px',
    '&:active': {
      backgroundColor: '#6A8C87 !important'
    }
  }
}));

const StyledIconButton = withStyles(theme => ({
  padding: '0 !important',
  width: '80px',
  height: '59px',
  backgroundColor: '#ebf0e8 !important',
  borderRadius: '0 !important'
}))(IconButton);

export const useQuantity = (
  updateQuantityToCart,
  label,
  initialQty = 1,
  maxQty = 50
) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(initialQty);
  const lastQuantity  = useRef(quantity);
  const adjustQuantity = useCallback(
    adjustment => {
      setQuantity(qty => qty + adjustment);
    },
    [setQuantity]
  );

  useEffect(() => {
    const okToUpdate = (lastQuantity.current === 2 && quantity === 1) || (quantity > 1);
    lastQuantity.current = quantity;
    if (okToUpdate) updateQuantityToCart(quantity);
  }, [quantity]);

  const Quantity = () => (
    <>
      <Grid
        container
        xs={12}
        className={classes.counterGrid}
        justify="left-start"
        alignItems="center"
        className="qty-button"
      >
        <Grid item className={classes.counterWrapper}>
          <Grid
            className={classes.counterBlock}
            container
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <StyledIconButton
              className={classes.iconButtonMinus}
              disabled={quantity <= 1}
              color="primary"
              onClick={e => {
                adjustQuantity(-1);
              }}
            >
              <RemoveIcon />
            </StyledIconButton>
            <Typography align="center" variant="body2">
              {quantity}
            </Typography>
            <StyledIconButton
              className={classes.iconButtonPlus}
              disabled={quantity >= maxQty}
              color="primary"
              onClick={e => {
                adjustQuantity(1);
              }}
            >
              <AddIcon />
            </StyledIconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  return [quantity, setQuantity, Quantity];
};
