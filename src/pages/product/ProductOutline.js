import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ProductContext from '../../contexts/ProductContext';
import { scrollToRef } from '../../utils/misc';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '10px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    textTransform: 'uppercase'
  },
  keyObjective: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  keyObjectiveHeading: {
    fontFamily: 'FreightTextProBook',
    fontWeight: 'normal',
    fontSize: '50px',
    lineHeight: 1.2,
    letterSpacing: '-1.25px',
    color: '#1f396d'
  },
  howItWorksBlocks: {
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
      marginBottom: '5px'
    },
    '& ul': {
      paddingLeft: '20px'
    },
    '& li p, & p': {
      fontFamily: 'FreightTextProBook',
      fontSize: '18px',
      fontWeight: 'normal',
      lineHeight: 1.5,
      color: '#000'
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

  useEffect(() => {
    if (product && variants.length && content) {
      if (scrollToTabs) {
        scrollToRef(containerRef);
      }
    }
  }, [product, variants, prices, content]);

  if (!product || !content) return null;

  return (
    <Container>
      <div className={classes.root} ref={containerRef}>
        <Box className={classes.keyObjective}>
          <Box style={{ flex: '0 0 250px' }}>
            <img
              src={content.keyObjectiveImages[0].url}
              alt=""
              width="100%"
              height="auto"
            />
          </Box>
          <Box>
            <Typography className={classes.heading} variant="h4" align="center">
              Key Objective
            </Typography>
            <Box>
              <Typography
                className={classes.keyObjectiveHeading}
                variant="h3"
                align="center"
              >
                {content.keyObjective}
              </Typography>
            </Box>
          </Box>
          <Box style={{ flex: '0 0 250px' }}>
            <img
              src={content.keyObjectiveImages[1].url}
              alt=""
              width="100%"
              height="auto"
            />
          </Box>
        </Box>
        <Typography className={classes.heading} variant="h4" align="center">
          How It Works
        </Typography>
        <Box mt={4} className={classes.howItWorksBlocks} width="1000px">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {documentToReactComponents(
                content.howItWorksBlock1,
                contentfulOptions
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {documentToReactComponents(
                content.howItWorksBlock2,
                contentfulOptions
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  );
};

ProductOutline.propTypes = {
  scrollToTabs: PropTypes.bool
};

ProductOutline.defaultProps = {
  scrollToTabs: false
};

export default ProductOutline;
