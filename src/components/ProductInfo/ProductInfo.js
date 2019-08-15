import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
  import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import PDPCard from '../../pages/product/PDPCard';
import PDPTable from './ProductTable';

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
    marginBottom: "70px",
    marginTop: 100
  },
  subhead: {
    fontSize: theme.overrides.h4,
    height: "40px"
  },
  smallHeader2: theme.typography.smallHeader,
  pos: {
    marginBottom: 12,
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
}));
// faked data
const productFacts = {
  serving: [
    "Serving Size: 1",
    "Serving Per Bottle: 30 (1 Monthly Supply)",
  ],
  directions: [
    "Take 1 softgel daily with a meal."
  ],
  fineprint: [
    "* Daily Value (DV) is based on a 2,000 calorie diet",
    "** Daily Value (DV) not established",
    "Zanthin R is a registered trademark of Valensa International"
  ],
  otherIngredients: [
    "High oleic safflower oil (non-GMO)",
    "Glycerin",
    "Purified water",
    "Medium chain triglycerides",
    "Mixed tocopherols",
    "Rosemary extract"
  ],
  important: [
    "Not made with milk, egg, fish, shellfish, tree nuts, wheat, peanuts and soy",
    "Store in a cool, dry place with bottle lid tightly closed",
    "Keep away from chilren. Do not use if seal is broken",
    "For adults only. If you are on medications, pregnant or nursing a baby, consult a health care practitioner prior to taking. Do not take if you have any bleeding problems."
  ]
}

// grid should be declared here as we're implementing
// the textOnlyCard component here
const ProductInfo = (props) => {
  const sectionTitle = 'Supplement Facts'
  const serving = Object.values(productFacts.serving).map(serving => <ListItemText>{serving}</ListItemText>)
  const directions = Object.values(productFacts.directions).map(direction => <ListItemText>{direction}</ListItemText>)
  const fineprint = Object.values(productFacts.fineprint).map(print => <ListItemText>{print}</ListItemText>)
  const otherIngredients = Object.values(productFacts.otherIngredients).map(other => <ListItemText>{other}</ListItemText>)
  const important = Object.values(productFacts.important).map(item => <ListItemText>{item}</ListItemText>)
  const productTable = <PDPTable />
  const classes = Styles();
  const title = <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" >{sectionTitle}</Typography>
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <PDPCard
            cardType='textOnlyCard'
            title={title}
            smallHeader1="Serving"
            list1={serving}
            smallHeader2="directions"
            list2={directions}
            fineprint={fineprint}
            className={classes.pushDown}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDPCard
            title='(table)'
            cardType='tableOnlyCard'
            table={productTable}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDPCard
            smallHeader1='Other Ingredients'
            cardType='textOnlyCard'
            list1={otherIngredients}
            className={classes.sectionTitle}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PDPCard
            smallHeader1='Important'
            cardType='textOnlyCard'
            list1={important} />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductInfo
