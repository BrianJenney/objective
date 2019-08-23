import React, { useCallback, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Divider from "@material-ui/core/Divider";

export const useQuantity = (label, initialQty = 1, maxQty = 50) => {
  const [ quantity, setQuantity ] = useState(initialQty);
  const adjustQuantity = useCallback((adjustment) => setQuantity(qty => qty + adjustment), [ setQuantity ]);
  const Quantity = () => (
    <>
      <Divider variant="fullWidth" />
      <br />

      <Grid container justify="left-start" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="body2">{label}</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <IconButton disabled={quantity <= 1} color="primary" onClick={(e) => adjustQuantity(-1)}>
              <RemoveIcon  />
            </IconButton>
            <Typography align="center" variant="body2">{quantity}</Typography>
            <IconButton disabled={quantity >= maxQty} color="primary" onClick={(e) => adjustQuantity(1)} >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Divider variant="fullWidth" />
    </>
  );
  return [ quantity, setQuantity, Quantity ];
};
