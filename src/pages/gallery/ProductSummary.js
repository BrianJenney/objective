import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const ProductSummary = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          style={{ height: 355, width: 200, margin: '20px 90px' }}
          image={product.assets.imgs}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" gutterBottom>{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/product/${product._id}`}>See Product Details</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductSummary;
