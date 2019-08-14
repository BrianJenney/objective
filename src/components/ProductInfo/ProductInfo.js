import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { textOnlyCard } from '../../pages/product/CardTypes';
import ListItemText from '@material-ui/core/ListItemText';
import PDPCard from '../../pages/product/PDPCard';

const Styles = makeStyles(theme => ({
  root: {
    maxWidth: 1138,
    margin: '0 auto'
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  sectionTitle: {
    fontSize: "40px",
    marginBottom: "70px"
  },
  subhead: {
    fontSize: theme.overrides.h4,
    height: "40px"
  },
  smallHeader2: theme.typography.smallHeader,
  pos: {
    marginBottom: 12,
  }
}));
const productFacts = {
  serving: [
    "Serving Size: 1", "Serving Per Bottle: 30 (1 Monthly Supply)",
  ],
  directions: [
    "Take 1 softgel daily with a meal."
  ],
  fineprint: [
    "* Daily Value (DV) is based on a 2,000 calorie diet",
    "** Daily Value (DV) not established",
    "Zanthin R is a registered trademark of Valensa International"
  ]
}

// grid should be declared here as we're implementing
// the textOnlyCard component here
const ProductInfo = (props) => {
  const sectionTitle = 'Supplement Facts'
  const listServing = Object.values(productFacts.serving).map(fact => <ListItemText>{fact}</ListItemText>)
  const listDirections = Object.values(productFacts.directions).map(direction => <ListItemText>{direction}</ListItemText>)
  const fineprint = Object.values(productFacts.fineprint).map(print => <ListItemText>{print}</ListItemText>)

  const classes = Styles();
  const title = <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" >{sectionTitle}</Typography>
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <PDPCard
            title={title}
            cardType='textOnlyCard'
            smallHeader1="Serving"
            list1={listServing}
            smallHeader2="directions"
            list2={listDirections}
            fineprint={fineprint}/>
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
