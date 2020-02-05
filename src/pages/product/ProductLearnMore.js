import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductContext from '../../contexts/ProductContext';
import { MenuLink } from '../../components/common';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '20px',
    paddingTop: '10px',
    paddingBottom: '100px',
    backgroundColor: '#fdfbf9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    textTransform: 'uppercase'
  },
  thumbnail: {
    width: '100%',
    height: 'auto'
  },
  category: {
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 600,
    color: '#000'
  },
  longHypen: {
    width: '25px',
    height: '2px',
    backgroundColor: '#ccc',
    marginLeft: '10px',
    marginRight: '10px'
  },
  duration: {
    textTransform: 'uppercase',
    fontSize: '18px',
    color: '#000'
  },
  title: {
    fontSize: '42px',
    fontWeight: 500,
    color: '#000',
    marginTop: '20px',
    marginBottom: '20px'
  },
  description: {
    fontSize: '20px',
    color: '#707070',
    marginBottom: '20px'
  },
  readMore: {
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: 600,
    color: '#000',
    textTransform: 'uppercase'
  }
}));

const ProductLearnMore = () => {
  const { content } = useContext(ProductContext);
  const classes = useStyles();

  if (!content) {
    return null;
  }

  const { learnMoreBlocks = [] } = content;

  return (
    <Box className={classes.root}>
      <Typography className={classes.heading} variant="h4" align="center">
        Want to Learn More?
      </Typography>
      <Box width="1200px">
        <Grid container spacing={2}>
          {learnMoreBlocks.map((learnMoreBlock, index) => (
            <Grid key={`block-${index.toString()}`} item xs={12} sm={4}>
              <img
                className={classes.thumbnail}
                src={learnMoreBlock.image}
                alt=""
              />
              <Box display="flex" alignItems="center" mt="10px">
                <Box className={classes.category}>
                  {learnMoreBlock.category}
                </Box>
                <Box className={classes.longHypen} />
                <Box className={classes.duration}>
                  {learnMoreBlock.duration}
                </Box>
              </Box>
              <Typography className={classes.title}>
                {learnMoreBlock.title}
              </Typography>
              <Typography className={classes.description}>
                {learnMoreBlock.description}
              </Typography>
              <MenuLink className={classes.readMore} href={learnMoreBlock.link}>
                Read More
              </MenuLink>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductLearnMore;
