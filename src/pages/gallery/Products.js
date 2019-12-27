import React, { useContext, useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import { setIn } from 'formik';
import GalleryContext from '../../contexts/GalleryContext';
import CategorySummary from './CategorySummary';
// import ProductSummary from './ProductSummary';
import { getProductCategories } from '../../utils/product';
import LoadingSpinner from '../../components/LoadingSpinner';

const skinImg = require('../../../src/assets/images/skin.png');
const healthImg = require('../../../src/assets/images/general.png');
const energyImg = require('../../../src/assets/images/targeted.png');

const Products = () => {
  const products = useContext(GalleryContext);
  const [seconds, setSeconds] = useState(0);
  const isNewYearPage = window.location.pathname == '/newyear';

  useEffect(() => {
    // track seconds for products to load
    const interval = setInterval(() => {
      setSeconds(seconds + 0.5);
    }, 500);

    if (seconds === 11) {
      clearInterval(interval);
    }

    if (!products && seconds === 10) {
      clearInterval(interval);
      alert(
        'Something wrong just happened, please refresh your browser and try again'
      );
    }

    return () => clearInterval(interval);
  }, [seconds]);

  if (!products) {
    return (
      <LoadingSpinner loadingMessage="Products loading ..." page="gallery" />
    );
  }

  const productCategories = getProductCategories(products);
  const productCategoriesToProducts = {};
  console.log(productCategories);
  productCategories.map(productCategory => {
    products
      .filter(product => product.productCategory === productCategory)
      .map(product => {
        if (productCategoriesToProducts[productCategory]) {
          productCategoriesToProducts[productCategory].push(product);
        } else {
          productCategoriesToProducts[productCategory] = [product];
        }
      });
  });

  if (!productCategoriesToProducts.skin) return null;

  return (
    <>
      {isNewYearPage ? (
        <Box py={5} className="newyear">
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="opt1">
                  <Grid container className="gallery-content-blurb">
                    <Grid item xs={12} md={5} className="leftside">
                      <h3>Be Your Best YOU</h3>
                      <Divider variant="fullWidth" />
                      <p>
                        This year, feel sharper, more rested and healthier doing
                        everything you do—our science-backed supplements make it
                        easy. Order today risk-free with our 90-day, 100% refund
                        guarantee.
                      </p>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <img
                        src="https://cdn1.stopagingnow.com/objective/NYSY-GalleryPage-BusinessWoman-706x1000px.png"
                        alt=""
                        className="blurb-img"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <CategorySummary
                key="core"
                products={productCategoriesToProducts.core}
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
      ) : (
        <>
          <Box py={5} className="corehealth">
            <Container>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="opt1">
                    <Grid container className="gallery-content-blurb">
                      <Grid item xs={12} md={5} className="leftside">
                        <h3>General Health</h3>
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
                  key="core"
                  products={productCategoriesToProducts.core}
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
          <Box py={5} className="beige-bg moodenergy">
            <Container className="beige-container">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="opt1">
                    <Grid container className="gallery-content-blurb">
                      <Grid item xs={12} md={5} className="leftside">
                        <h3>Targeted Solutions</h3>
                        <Divider variant="fullWidth" />
                        <p>
                          Crafted with ingredients shown to deliver specific
                          results, from better sleep to sharper thinking and
                          hormone help.
                        </p>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <img src={energyImg} alt="" className="blurb-img" />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <CategorySummary
                  key="energy"
                  products={productCategoriesToProducts.energy}
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
          <Box py={5} className="skinbeauty">
            <Container>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="opt1">
                    <Grid container className="gallery-content-blurb">
                      <Grid item xs={12} md={5} className="leftside">
                        <h3>Skin Health</h3>
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
                  key="skin"
                  products={productCategoriesToProducts.skin}
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
      )}
    </>
  );
};

export default Products;
