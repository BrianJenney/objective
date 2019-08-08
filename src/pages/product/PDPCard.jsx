import React, { Component } from 'react';
import ProductContext from '../../contexts/ProductContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { imgcard1, imgcard2 } from './CardTypes';


const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
  }
});



export default function PDPCard(props) {

  let cardFinal = '';
  const classes = useStyles();
  const title = <Typography gutterBottom variant="h5" component="h2"> {props.title}</Typography>;
  const body = <Typography variant="body2" color="textSecondary" component="p"> {props.body} </Typography>;


  switch (props.cardType) {
    case 'imgcard1':
      cardFinal = imgcard1(title, body);
      break;
    case 'imgcard2':
      cardFinal = imgcard2(title, body);
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