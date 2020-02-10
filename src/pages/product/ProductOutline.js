import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ProductContext from '../../contexts/ProductContext';
import { scrollToRef } from '../../utils/misc';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '20px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  keyObjective: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
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
    color: '#1f396d',
    maxWidth: '792px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: 1.25,
      letterSpacing: '-0.6px',
      maxWidth: '304px'
    }
  },
  keyObjectiveImage: {
    width: '300px',
    position: 'absolute',
    top: 0,
    [theme.breakpoints.down('sm')]: {
      width: '56px'
    }
  },
  howItWorksBlocks: {
    padding: '0 16px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      overflowX: 'auto',
      overflowY: 'hidden'
    },

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
      return <img src={node.data.target.fields.file.url + params} alt={node.data.target.fields.title} />;
    }
  }
};

const ProductOutline = ({ scrollToTabs }) => {
  const { product, variants, prices, content } = useContext(ProductContext);
  const containerRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (product && variants.length && content) {
      if (scrollToTabs) {
        scrollToRef(containerRef);
      }
    }
  }, [product, variants, prices, content]);

  if (!product || !content) return null;

  const { keyObjectiveImages } = content;

  return (
    <div className={classes.root} ref={containerRef}>
      <Box className={classes.keyObjective} width={1}>
        {keyObjectiveImages && keyObjectiveImages.length === 2 && (
          <Box className={classes.keyObjectiveImage} style={{ left: 0 }}>
            <img src={keyObjectiveImages[0].url} alt="" width="100%" height="auto" />
          </Box>
        )}
        <Box>
          <Typography className={classes.heading} variant="h3" align="center">
            Key Objective
          </Typography>
          <Box>
            <Typography className={classes.keyObjectiveHeading} variant="h3" align="center">
              {content.keyObjective}
            </Typography>
          </Box>
        </Box>
        {keyObjectiveImages && keyObjectiveImages.length === 2 && (
          <Box className={classes.keyObjectiveImage} style={{ right: 0 }}>
            <img src={keyObjectiveImages[1].url} alt="" width="100%" height="auto" />
          </Box>
        )}
      </Box>
      <Box mt={2} className={classes.howItWorksBlocks}>
        <Typography className={classes.heading} variant="h3" align="center">
          How It Works
        </Typography>
        <Box className={classes.howItWorksBlocksContent}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {documentToReactComponents(content.howItWorksBlock1, contentfulOptions)}
            </Grid>
            <Grid item xs={6}>
              {documentToReactComponents(content.howItWorksBlock2, contentfulOptions)}
            </Grid>
          </Grid>
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
