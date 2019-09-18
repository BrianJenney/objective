import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GalleryContext from '../../contexts/GalleryContext';
//import CategorySummary from './CategorySummary';
import ProductSummary from './ProductSummary';
import { getGallery } from '../../hooks';

const Products = () => {
  const { products, variants, prices } = useContext(GalleryContext);
  if (!products) return null;
  const [productSlugs, productMap, variantSlugs, variantMap, productCategories] = getGallery(
    products,
    variants,
    prices
  );


  const productCategoriesToProducts = {};
  productCategories.map(productCategory => {
    products
      .filter(product => {
        return product.category === productCategory;
      })
      .map(product => {
        product = productMap.get(product.slug);
        
        if(productCategoriesToProducts[productCategory]){

          productCategoriesToProducts[productCategory].push(product);

        }else{
          productCategoriesToProducts[productCategory] = [product];
          
        }
      });
  });

 
  return (
    <Container>
      <Grid container spacing={4}>

       {productSlugs.map(productSlug => (
          <ProductSummary
            key={productSlug}
           product={productMap.get(productSlug)}
           
)}
      </Grid>
    </Container>
  );
};

export default Products;
