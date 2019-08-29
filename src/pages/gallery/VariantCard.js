import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {CardActions, Grid, Button} from "@material-ui/core";

const PriceVariantInfo = ({ variant }) => {
  return variant ? (<Typography variant="h6"><strong>${variant.effectivePrice}</strong> / {variant.variantInfo.size} {variant.variantInfo.prodType}</Typography>
  ) : null;
};

const VariantCard =  ({variant}) => {
  return (
    <Card>
      <CardMedia
        style={{ height: 355, width: 200, margin: '20px 90px' }}
        image={variant.image}
        title={variant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" >
          {variant.name}
        </Typography>
        <PriceVariantInfo variant={variant} />
      </CardContent>
      <CardActions>
        <Button  variant="contained" color="primary" >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default VariantCard;
