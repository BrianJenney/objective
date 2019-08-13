import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import { borderLeft } from '@material-ui/system';




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


const imgcard3 = (title, body, icon) => {

  const Styles = makeStyles({
    media: {
      height: 300,
    },
  });
  const classes = Styles();

  return (
    <>
      <CardMedia
        className={classes.media}
        image={icon.props.image} />
      <CardContent>
        <Typography align="center">
          {title}
        </Typography>
      </CardContent>
    </>

  );
};

export { imgcard1, imgcard2, imgcard3 };