import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




const imgcard1 = (title, body) => {

  const Styles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = Styles();

  return (
    <>
      <CardMedia
        className={classes.media}
        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile" />
      <CardContent>
        {title}
        {body}
      </CardContent>
    </>

  );
};

const imgcard2 = (title, body, icon) => {

  const Styles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = Styles();

  return (
    <>
      <CardMedia
        className={classes.media}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaVvMW5zQqL7iu3UDSrgBazRKnbTOA6MKGl7Xhe6XODUhLRIQ"
        title="Contemplative Reptile" />
      <CardContent>
        {title}
        {body}
      </CardContent>
    </>

  );
};

const textOnlyCard = (title, subhead, smallHeader1, list1, smallHeader2, list2) => {
  const Styles = makeStyles(theme => ({
    card: {
      minWidth: 275,
      maxWidth: 569,
      minHeight: 100,
      display: 'block',
      backgroundColor: theme.palette.background.paper
    },
    bullet: {
      display: 'block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    subtitle: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));
  const classes = Styles();

  return (
    <Card className={classes.card}>
      <CardContent>
        {title}
        {subhead}
        {smallHeader1}
        {list1}
        {smallHeader2}
        {list2}
      </CardContent>
    </Card>
  )
}

export { imgcard1, imgcard2, textOnlyCard };
