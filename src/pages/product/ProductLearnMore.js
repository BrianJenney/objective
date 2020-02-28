import React, { useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ProductContext from '../../contexts/ProductContext';

import FeaturedItem from '../blog/FeaturedItem';
import '../blog/blog-styles.scss';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px',
    padding: '10px 16px 100px',
    backgroundColor: '#fdfbf9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 16px 57px'
    }
  },
  heading: {
    marginTop: '70px',
    marginBottom: '60px',
    fontFamily: 'p22-underground, sans-serif',
    fontSize: '24px',
    fontWeight: 900,
    lineHeight: 1.33,
    letterSpacing: '1.7px',
    color: '#000',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      marginTop: '48px',
      marginBottom: '39px',
      fontSize: '16px',
      lineHeight: 'normal',
      letterSpacing: '1.28px'
    }
  }
}));

const renderPosts = posts =>
  posts.map((item, key) => <FeaturedItem post={item} key={item.sys.id} />);

const ProductLearnMore = () => {
  const { content } = useContext(ProductContext);
  const classes = useStyles();

  if (!content) {
    return null;
  }

  const { relatedArticles = [] } = content;

  return (
    <Box className={classes.root}>
      <Typography className={classes.heading} variant="h4" align="center">
        Want to Learn More?
      </Typography>
      <div className="journal-gallery">
        <Box className="content">
          <Grid container spacing={4} className="calloutSmall">
            {renderPosts(relatedArticles)}
          </Grid>
        </Box>
      </div>
    </Box>
  );
};

export default ProductLearnMore;
