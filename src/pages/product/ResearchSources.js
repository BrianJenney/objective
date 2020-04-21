import React, { useContext } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ProductContext from '../../contexts/ProductContext';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1200px !important',
    marginTop: '65px',
    marginBottom: '65px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '58px',
      marginBottom: '58px'
    },
    '& p': {
      fontFamily: 'FreightTextProBook',
      fontSize: '14px',
      color: '#000',
      lineHeight: 'normal',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px'
      }
    }
  },
  heading: {
    marginBottom: '26px',
    fontFamily: 'p22-underground, sans-serif',
    fontSize: '24px',
    fontWeight: 900,
    lineHeight: 1.33,
    letterSpacing: '1.7px',
    color: '#000',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
      fontSize: '18px',
      fontWeight: 600,
      letterSpacing: '1.13px'
    }
  }
}));

export default function ResearchSources() {
  const { content } = useContext(ProductContext);
  const classes = useStyles();

  if (!content || !content.researchSources) {
    return null;
  }

  return (
    <Container className={classes.root}>
      <Box width="1000px">
        <Typography className={classes.heading} variant="h4">
          Research Sources &amp; Studies
        </Typography>
        {documentToReactComponents(content.researchSources)}
      </Box>
    </Container>
  );
}
