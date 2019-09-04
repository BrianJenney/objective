import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const ProductCard = ({product}) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography variant="body2" gutterBottom>{product.description}</Typography>
      </CardContent>
      <CardMedia
        style={{ height: 355, width: 200, margin: '20px 90px' }}
        image={product.assets.img_front}
        title={product.name}
      />
    </Card>
  );
};

export default ProductCard;
