import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import GalleryContext from '../../contexts/GalleryContext';
import CategorySummary from './CategorySummary';
//import ProductSummary from './ProductSummary';
import { getGallery } from '../../hooks';

const skinImg = require('../../../src/assets/images/skin-cat.png');
const skinIcon = require('../../../src/assets/images/skin-cat-icon.png');
const healthIcon = require('../../../src/assets/images/health-cat-icon.png');
const healthImg = require('../../../src/assets/images/health-cat.png');
const energyIcon = require('../../../src/assets/images/energy-cat-icon.png');
const energyImg = require('../../../src/assets/images/energy-cat.png');

const Products = () => {
  const { products, variants, prices } = useContext(GalleryContext);

  if (!products) return null;
  const [
    productSlugs,
    productMap,
    variantSlugs,
    variantMap,
    productCategories
  ] = getGallery(products, variants, prices);

  const productCategoriesToProducts = {};
  productCategories.map(productCategory => {
    products
      .filter(product => {
        return product.category === productCategory;
      })
      .map(product => {
        product = productMap.get(product.slug);

        if (productCategoriesToProducts[productCategory]) {
          productCategoriesToProducts[productCategory].push(product);
        } else {
          productCategoriesToProducts[productCategory] = [product];
        }
      });
  });

  //Code needs to be replaced to map through different categories in different containers

  return (
    <>
      <Box py={10} className="corehealth">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="opt1">
                <Grid container className="gallery-content-blurb">
                  <Grid item xs={12} md={5} className="leftside">
                    <h3>Core Health</h3>
                    <img src={healthIcon} alt="" className="blurb-icon" />
                    <Divider variant="fullWidth" />
                    <p>Core Health is great and important!</p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <img src={healthImg} alt="" className="blurb-img" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={10} className="beige-bg moodenergy">
        <Container className="beige-container">
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="opt1">
                <Grid container className="gallery-content-blurb">
                  <Grid item xs={12} md={5} className="leftside">
                    <h3>Mood & Energy</h3>
                    <img src={energyIcon} alt="" className="blurb-icon" />
                    <Divider variant="fullWidth" />
                    <p>Mood and energy is great and important!</p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <img src={energyImg} alt="" className="blurb-img" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={10} className="skinbeauty">
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="opt1">
                <Grid container className="gallery-content-blurb">
                  <Grid item xs={12} md={5} className="leftside">
                    <h3>Skin & Beauty</h3>
                    <img src={skinIcon} alt="" className="blurb-icon" />
                    <Divider variant="fullWidth" />
                    <p>Skin & beauty is great and important!</p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <img src={skinImg} alt="" className="blurb-img" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <div>
        {Object.keys(productCategoriesToProducts).map(key => (
          <CategorySummary
            key={key}
            products={productCategoriesToProducts[key]}
            variantMap={variantMap}
            category={{
              title: 'Skin & Beauty',
              description: 'Some description',
              slug: key
            }}
            styleMap={{
              container: {
                borderColor: productCategoriesToProducts[key][0].color
              },
              text: { color: productCategoriesToProducts[key][0].color }
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
