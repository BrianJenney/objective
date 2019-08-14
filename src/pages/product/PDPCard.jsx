import React, { Component } from 'react';
import ProductContext from '../../contexts/ProductContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { imgcard1, imgcard2, textOnlyCard } from './CardTypes';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '100%',
  },
  smallHeader1: theme.typography.smallHeader,
  smallHeader2: theme.typography.smallHeader,
  fineprint: theme.typography.fineprint,
}));



export default function PDPCard(props) {
  const { cardType, className} = props
  let cardFinal = '';
  const classes = useStyles();
  const title = <Typography gutterBottom variant="h5" component="h2"> {props.title}</Typography>;
  const body = <Typography variant="body2" color="textPrimary" component="p"> {props.body} </Typography>;
  const subhead = <Typography gutterBottom variant="h5" component="h2"> {props.subhead}</Typography>;
  const smallHeader1 = <Typography className={classes.smallHeader1} gutterBottom component="p"> {props.smallHeader1}</Typography>;
  const smallHeader2 = <Typography className={classes.smallHeader2} gutterBottom component="p"> {props.smallHeader2}</Typography>;
  const list1 = <List gutterBottom variant="subhead" component="p"><ListItem>{props.list1}</ListItem></List>;
  const list2 = <List gutterBottom variant="subhead" component="p"><ListItem><ListItemText>{props.list2}</ListItemText></ListItem></List>;
  const fineprint = <List gutterBottom variant="fineprint" className={classes.fineprint}><ListItem><ListItemText>{props.fineprint}</ListItemText></ListItem></List>;


  switch (cardType) {
    case 'imgcard1':
      cardFinal = imgcard1(title, body);
      break;
    case 'imgcard2':
      cardFinal = imgcard2(title, body);
      break;
    case 'textOnlyCard':
      cardFinal = textOnlyCard(className, title, subhead, smallHeader1, list1, smallHeader2, list2, fineprint);
      break;
  }


  return (
    <Card className={classes.card}>
      <CardActionArea>
        {cardFinal}
      </CardActionArea>
    </Card>
  );
}