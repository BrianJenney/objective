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
  console.log(products, variants, prices);

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

  if (!productCategoriesToProducts.skin) return null;
  console.log(productMap, variantMap, productCategories);
  console.log(productCategoriesToProducts);
  console.log(productCategoriesToProducts.skin);
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
                    <h3>General Health</h3>
                    <img src={healthIcon} alt="" className="blurb-icon" />
                    <Divider variant="fullWidth" />
                    <p>
                      Powerful, science-based formulas designed to keep you
                      strong, active and feeling good day in and day out.
                    </p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <img src={healthImg} alt="" className="blurb-img" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <CategorySummary
              key={'core'}
              products={productCategoriesToProducts.core}
              variantMap={variantMap}
              category={{
                title: 'Skin & Beauty',
                description: 'Some description',
                slug: 'core'
              }}
              styleMap={{
                container: {
                  borderColor: productCategoriesToProducts.core[0].color
                },
                text: { color: productCategoriesToProducts.core[0].color }
              }}
            />
          </Grid>
        </Container>
      </Box>
      <Box py={10} className="beige-bg moodenergy">
        <Container className="beige-container">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="opt1">
                <Grid container className="gallery-content-blurb">
                  <Grid item xs={12} md={5} className="leftside">
                    <h3>Targeted Solutions</h3>
                    <img src={energyIcon} alt="" className="blurb-icon" />
                    <Divider variant="fullWidth" />
                    <p>
                      Crafted with ingredients shown to deliver specific
                      results, from better sleep to sharper thinking and hormone
                      help.
                    </p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <img src={energyImg} alt="" className="blurb-img" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <CategorySummary
              key={'energy'}
              products={productCategoriesToProducts.energy}
              variantMap={variantMap}
              category={{
                title: 'Skin & Beauty',
                description: 'Some description',
                slug: 'energy'
              }}
              styleMap={{
                container: {
                  borderColor: productCategoriesToProducts.energy[0].color
                },
                text: { color: productCategoriesToProducts.energy[0].color }
              }}
            />
          </Grid>
        </Container>
      </Box>
      <Box py={10} className="skinbeauty">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="opt1">
                <Grid container className="gallery-content-blurb">
                  <Grid item xs={12} md={5} className="leftside">
                    <h3>Skin Health</h3>
                    <img src={skinIcon} alt="" className="blurb-icon" />
                    <Divider variant="fullWidth" />
                    <p>
                      Nourish your skin from within and topically for fewer
                      wrinkles, even tone and a healthy, radiant glow.
                    </p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <img src={skinImg} alt="" className="blurb-img" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <CategorySummary
              key={'skin'}
              products={productCategoriesToProducts.skin}
              variantMap={variantMap}
              category={{
                title: 'Skin & Beauty',
                description: 'Some description',
                slug: 'skin'
              }}
              styleMap={{
                container: {
                  borderColor: productCategoriesToProducts.skin[0].color
                },
                text: { color: productCategoriesToProducts.skin[0].color }
              }}
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Products;
