import React, {useCallback, useState} from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export const useQuantity = (label, initialQty = 1) => {
  const [quantity, setQuantity] = useState(initialQty);
  const adjustQuantity = useCallback((adjustment) => setQuantity(qty => qty + adjustment), []);
  const Quantity = () => (
    <>
      <Grid container justify="left-start" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="body2">{label}</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <RemoveCircleIcon  color="primary" onClick={(e) => adjustQuantity(-1)} />
            <Typography align="center" variant="body2">{quantity}</Typography>
            <AddCircleIcon color="primary" onClick={(e) => adjustQuantity(1)} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  return [quantity, Quantity];
};
