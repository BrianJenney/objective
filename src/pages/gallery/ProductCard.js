import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GalleryContext from '../../contexts/GalleryContext';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class ProductCard extends Component {
  static contextType = GalleryContext;

  render() {
    if (!this.context.products) {
      return (<div></div>);
    }

    let prodlist = Object.values(this.context.products).map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Card>
          <CardMedia
            style={{ height: 355, width: 200, margin: '20px 90px' }}
            image={product.assets.img_front}
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
              <Link to={`/product/${product._id}`}>See Details</Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));

    return <Container><Grid container spacing={4}>{prodlist}</Grid></Container>;
  }
}

export default ProductCard;