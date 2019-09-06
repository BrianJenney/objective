import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';

import { makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import { setCartDrawerOpened} from '../../modules/cart/actions';

const useStyles = makeStyles({
  card: {
    maxWidth: 100,
  },
});

const ATCSnackbarAction = ({variant}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const viewCart = () => {
    dispatch(setCartDrawerOpened(true));
  };

  return (
    <Card>
      <Grid container sm={12} direction="row" alignItems="center">
        <Grid item sm={4} >
          <CardMedia
            style={{ height: 85, width: 85 }}
            image={variant.assets.imgs}
            title={variant.name}
          />
        </Grid>
        <Grid item sm={8}>
          <CardContent>
          <Grid container xs={12} direction="column" alignItems="flex-start">
            <Typography variant="body1">Added to cart</Typography>
            <br/>
            <Button color="default" onClick={viewCart}>
                <Typography variant="caption">View Cart</Typography>
            </Button>
          </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ATCSnackbarAction;
