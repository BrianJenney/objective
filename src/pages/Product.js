import React from 'react';
import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import Step from './product/Step';
import { ProductStore } from '../contexts/ProductContext';
import ProductDetail from './product/ProductDetail';
import { SnackbarProvider } from 'notistack';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Select,
  MenuItem,
  CardMedia
} from '@material-ui/core';

const Product = ({ match }) => {
  const productId = match.params.id;
  const message = 'Your notification here';
  return (
    <ProductStore productId={productId}>
      {/* <SnackbarProvider
        action={<Button onClick={() => alert(message)}>{'Alert'}</Button>}
      ></SnackbarProvider> */}
      <ProductDetail />
      <TabSection />
      <Instruction />
      <Step />
    </ProductStore>
  );
};

export default Product;
