import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { textOnlyCard } from '../../pages/product/CardTypes';
import PDPCard from '../../pages/product/PDPCard';

const Styles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  sectionTitle: {
    fontSize: "35px"
  },
  subtitle: {
    fontSize: theme.overrides.h4,
    height: "40px"
  },
  pos: {
    marginBottom: 12,
  }
}));
const sectionTitle = 'Supplement Facts'
// grid should be declared here as we're implementing
// the textOnlyCard component here
const ProductInfo = (props) => {
  const classes = Styles();
  const title = <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" >{sectionTitle}</Typography>
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <PDPCard title={title} cardType='textOnlyCard' list='img card 2 body' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDPCard title='(table)' cardType='textOnlyCard' list='img card 2 body' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDPCard title='Other Ingredients' cardType='textOnlyCard' list='img card 2 body' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDPCard title='Important' cardType='textOnlyCard' list='img card 2 body' />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductInfo
