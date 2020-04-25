import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ProductContext from '../../contexts/ProductContext';
import { scrollToRef } from '../../utils/misc';
import './PDP-style.scss';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  keyObjective: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
  },
  keyObjectiveImage: {
    width: '300px',
    position: 'absolute',
    top: 20
  },
  heading: {
    marginTop: '70px',
    marginBottom: '10px',
    fontFamily: 'p22-underground, sans-serif',
    fontSize: '24px',
    fontWeight: 900,
    lineHeight: 1.33,
    letterSpacing: '1.7px',
    color: '#000',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      marginTop: '12px',
      marginBottom: '5px',
      fontSize: '14px',
      lineHeight: 2.29,
      letterSpacing: '0.99px'
    }
  },
  keyObjectiveHeading: {
    fontFamily: 'FreightTextProBook',
    fontWeight: 'normal',
    fontSize: '50px',
    lineHeight: 1.2,
    letterSpacing: '-1.25px',
    maxWidth: '792px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: 1.25,
      letterSpacing: '-0.6px',
      maxWidth: '304px'
    }
  },
  howItWorksBlocks: {
    padding: '0 16px',
    width: '100%',

    '& img': {
      width: '100%',
      height: 'auto'
    },
    '& h4': {
      fontFamily: 'FreightTextProMedium',
      fontSize: '24px',
      fontWeight: 'normal',
      lineHeight: 1.33,
      color: '#1e58ab',
      marginTop: '25px',
      marginBottom: '5px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        lineHeight: 1.5,
        letterSpacing: 'normal'
      }
    },
    '& ul': {
      paddingLeft: '20px'
    },
    '& li p, & p': {
      fontFamily: 'FreightTextProBook',
      fontSize: '18px',
      fontWeight: 'normal',
      lineHeight: 1.5,
      color: '#000',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px'
      }
    }
  },
  howItWorksBlocksContentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      overflowX: 'scroll',
      overflowY: 'hidden',
      scrollSnapType: 'x mandatory',
      '&::-webkit-scrollbar': {
        height: '2px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#1f396d'
      }
    }
  },
  howItWorksBlocksContent: {
    marginTop: '20px',
    width: '1000px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      width: '636px'
    }
  }
}));
const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=555&fm=jpg&q=50';
      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
      }
      return (
        <img
          src={node.data.target.fields.file.url + params}
          alt={node.data.target.fields.title}
        />
      );
    }
  }
};

const ProductOutline = ({ scrollToTabs }) => {
  const { product, variants, prices, content } = useContext(ProductContext);
  const containerRef = useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (product && variants.length && content) {
      if (scrollToTabs) {
        scrollToRef(containerRef);
      }
    }
  }, [product, variants, prices, content]);

  if (!product || !content) return null;

  const {
    keyObjectiveBackgroundImage,
    keyObjectiveImages,
    keyObjective,
    howItWorksBlock1,
    howItWorksBlock2,
    productColor
  } = content;
  const keyObjectiveBackgroundStyle =
    sm && keyObjectiveBackgroundImage
      ? {
          backgroundImage: `url(${keyObjectiveBackgroundImage.fields.file.url})`
        }
      : {};

  return (
    <div className={classes.root} ref={containerRef}>
      <Box
        className={classes.keyObjective}
        style={keyObjectiveBackgroundStyle}
        width={1}
      >
        {!sm && keyObjectiveImages && keyObjectiveImages.length === 2 && (
          <Box className={classes.keyObjectiveImage} style={{ left: 0 }}>
            <img
              src={keyObjectiveImages[0].fields.file.url}
              alt=""
              width="100%"
              height="auto"
            />
          </Box>
        )}
        <Box>
          <Typography className={classes.heading} variant="h3" align="center">
            Key Objective
          </Typography>
        </Box>
        <Box>
          <Typography
            className={`${classes.keyObjectiveHeading} ${productColor}`}
            variant="h3"
            align="center"
          >
            {keyObjective}
          </Typography>
        </Box>
        {!sm && keyObjectiveImages && keyObjectiveImages.length === 2 && (
          <Box className={classes.keyObjectiveImage} style={{ right: 0 }}>
            <img
              src={keyObjectiveImages[1].fields.file.url}
              alt=""
              width="100%"
              height="auto"
            />
          </Box>
        )}
      </Box>
      <Box className={classes.howItWorksBlocks}>
        <Typography className={classes.heading} variant="h3" align="center">
          How It Works
        </Typography>
        <Box className={classes.howItWorksBlocksContentWrapper}>
          <Box className={classes.howItWorksBlocksContent}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {documentToReactComponents(howItWorksBlock1, contentfulOptions)}
              </Grid>
              <Grid item xs={6}>
                {documentToReactComponents(howItWorksBlock2, contentfulOptions)}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

ProductOutline.propTypes = {
  scrollToTabs: PropTypes.bool
};

ProductOutline.defaultProps = {
  scrollToTabs: false
};

export default ProductOutline;
