import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {

  const classes = useStyles();

  if((!props.cart.items) || (!props.cart.shipping) || (!props.cart.shippingAddress) || (!props.cart.billingAddress) || (!props.cart.paymentDetails)) {
    return (<div></div>);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Object.values(props.cart.items).map((product, index) => (
          <ListItem className={classes.listItem} key={product.product_id}>
            <ListItemText primary={product.product_name} secondary={product.desc} />
            <Typography variant="body2">{product.unit_price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.cart.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>{props.cart.shippingAddress.firstName + ' ' + props.cart.shippingAddress.lastName}</Typography>
          <Typography gutterBottom>{props.cart.shippingAddress.address1 + ' ' + (props.cart.shippingAddress.address2  ? props.cart.shippingAddress.address2 : '')}</Typography>
          <Typography gutterBottom>{props.cart.shippingAddress.city + ', ' + props.cart.shippingAddress.state + ' ' + props.cart.shippingAddress.zip}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.cart.paymentDetails.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.cart.paymentDetails.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{props.cart.paymentDetails.expDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}