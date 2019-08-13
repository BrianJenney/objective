import React, { Component, useContext, useCallback } from 'react';
import { Formik } from 'formik';

import ProductContext from '../../contexts/ProductContext';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import Field from '../../components/form-fields/Field';
import InputField from '../../components/form-fields/InputField';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  media: {
    width: 200,
    height: 355,
    margin: '20px 90px'
  }
}));

const ProductDetail = () => {
  const classes = useStyles();
  const { product } = useContext(ProductContext);
  const handleAddToCart = useCallback(() => {
    alert(`Add to cart ${product.name} at `)
  },[]);
  if (!product) {
    return null;
  }
  const available = 60;
  const subtitle = 'COMPLETE PLAN PROTEIN + PROBIOTICS';

  return (
    <Container>
      <Card >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            <CardMedia
              className={classes.media}
              image={product.assets.imgs}
              title={product.name}
            />
          </Grid>
          <Grid item item xs={12} sm={4} md={8}>
            <CardContent>
              <Typography gutterBottom variant="h3" align="center">{product.name}</Typography>
              <Divider variant="middle" />
              <Typography variant="h6" align="center">{subtitle}</Typography>
              <Divider variant="middle" />
              <Typography gutterBottom variant="body1">{product.description}</Typography>
              <Typography  variant="h6">${product.price.$numberDecimal} / {available} VEGGIE CAPSULES</Typography>
              <Divider variant="middle" />
              <Divider variant="middle" />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleAddToCart}>
                Add To Cart
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );

}

export default ProductDetail;

