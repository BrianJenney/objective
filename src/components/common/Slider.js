import React, { useContext, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GalleryContext from '../../contexts/GalleryContext';
import ProductContext from '../../contexts/ProductContext';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import BestSeller from '../ProductSlider/BestSeller';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '712px',
    flexGrow: 1,
    MuiPaper: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  }
}));

const Slider = () => {
  // get context from GalleryContext
  const productContext = useContext(GalleryContext)
  const { product } = useContext(ProductContext);
  const { assets, name, _id } = product
  const maxSteps = Object.keys(assets).length
  const imgUrl = Object.values(assets)
  console.log(productContext)
  console.log(product)
  console.log(assets, name, _id)
  console.log(maxSteps)
  console.log(imgUrl)
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  // pass id to renderProducts function and render related product
  const transformProduct = (id, product) => {
    const { assets, name, _id } = product
    console.log(assets, name, _id)
    const maxSteps = Object.keys(assets).length
    const imgUrl = Object.values(assets)

    if (id !== _id) {
      return null;
    }

    return (
      <>
        <BestSeller />
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {Object.keys(assets).map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Card>
                  <CardMedia
                    key={`${_id}`}
                    style={{ height: 355, width: 200, margin: '0 auto' }}
                    image={imgUrl[activeStep]}
                    title={product.name}
                  />
                </Card>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
                  </Button>
          }
        />
      </>
    )
  };

  const renderProducts = id => transformProduct(id, product)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }
  return (
    <div className={classes.root}>
      {
        renderProducts('5ceea2eb0023ee3bcc730cc7') // id will be passed dynamically in the future
      }
    </div>
  );
}

export default Slider
