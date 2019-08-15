import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { imgcard1, imgcard2, textOnlyCard, tableOnlyCard } from './CardTypes';
import PDPTable from '../../components/ProductInfo/ProductTable';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '100%',
  },
  smallHeader1: theme.typography.smallHeader,
  smallHeader2: theme.typography.smallHeader,
  fineprint: theme.typography.fineprint,
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
}));



export default function PDPCard(props) {
  const classes = useStyles();
  const { cardType } = props
  let cardFinal = '';
  const title = <Typography gutterBottom variant="h5" component="h2"> {props.title}</Typography>;
  const body = <Typography variant="body2" color="textPrimary" component="p"> {props.body} </Typography>;
  const subhead = <Typography gutterBottom variant="h5" component="h2"> {props.subhead}</Typography>;
  const smallHeader1 = <Typography className={classes.smallHeader1} gutterBottom component="p"> {props.smallHeader1}</Typography>;
  const smallHeader2 = <Typography className={classes.smallHeader2} gutterBottom component="p"> {props.smallHeader2}</Typography>;
  const bulletedList = <List component="li"><ListItemIcon><ListItem><ListItemText>{props.bulletedList}</ListItemText></ListItem></ListItemIcon></List>;
  const list1 = <List><ListItem component="li"><ListItemText>{props.list1}</ListItemText></ListItem></List>;
  const list2 = <List><ListItem component="li"><ListItemText>{props.list2}</ListItemText></ListItem></List>;
  const fineprint = <List gutterBottom variant="fineprint" className={classes.fineprint}><ListItemText>{props.fineprint}</ListItemText></List>;
  const table = <PDPTable />;

  switch (cardType) {
    case 'imgcard1':
      cardFinal = imgcard1(title, body);
      break;
    case 'imgcard2':
      cardFinal = imgcard2(title, body);
      break;
    case 'textOnlyCard':
      cardFinal = textOnlyCard(title, body, smallHeader1, list1, smallHeader2, list2, fineprint, bulletedList);
      break;
    case 'tableOnlyCard':
      cardFinal = tableOnlyCard(table);
      break;
  }


  return (
    <Card className={classes.card}>
        {cardFinal}
    </Card>
  );
}
