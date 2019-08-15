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
import { imgcard1, imgcard2, Imgcard3 } from './CardTypes';
import { NONAME } from 'dns';


const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    borderRadius: 0,
  }
});


export default function PDPCard({ title, body, icon, cardType, bottomColor, textColor }) {

  let cardFinal = '';
  const classes = useStyles();
  const titleContent = <Typography variant="h5" component="h2"> {title} </Typography>;
  const bodyContent = <Typography variant="body2" color="textSecondary" component="p"> {body} </Typography>;
  const iconContent = <CardMedia image={icon} />

  switch (cardType) {
    case 'imgcard1':
      cardFinal = imgcard1(titleContent, bodyContent);
      break;
    case 'imgcard2':
      cardFinal = imgcard2(titleContent, bodyContent);
      break;
    case 'imgcard3':
      cardFinal = <Imgcard3 title={titleContent} body={bodyContent} icon={iconContent} bottomColor={bottomColor} textColor={textColor} />;
      break;
    default:
      return null;
  }


  return (
    <Card className={classes.card} elevation={0}>
      {cardFinal}
    </Card>
  );
}