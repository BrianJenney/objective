import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { fonts } from '../../components/Theme/fonts.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const pStyle = {
  padding: 20
};
const change = {
  fontFamily: fonts.smallHeader,
  fontSize: 12,
  padding: 9,
  color: 'black'
};
const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: fonts.header,
    fontSize: 48,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  info: {
    fontFamily: fonts.smallHeader,
    fontSize: '18px'
  },
  subTexts: {
    fontFamily: fonts.body,
    fontSize: '21px',
    padding: 10
  },
  inline: {
    display: 'flex'
  },
  root: {
    width: '100%',
    maxWidth: 360
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  box: {
    backgroundColor: '#003833',
    '&:hover': {
      backgroundColor: '#003833'
    }
  },
  item: {
    color: 'white'
  }
}));
const AccountOverview = props => {
  const { currentUser } = props;
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = React.useState(true);
  console.log('USER', currentUser);
  const handleClick = () => {
    setOpen(!open);
  };
  const RenderOverview = () => (
    <div className="account-overview">
      <Typography className={classes.title} variant="h1" gutterBottom>
        Welcome, {currentUser.data.firstName}!
      </Typography>
      <p>
        <strong>NAME</strong> {currentUser.data.firstName}{' '}
        {currentUser.data.lastName}
      </p>
      <p>
        <strong>EMAIL</strong>
        {currentUser.data.email}
      </p>
      <p>
        <strong>PASSWORD</strong>
        xxxxxx
        <a href="/account/profile" style={change}>
          CHANGE
        </a>
      </p>
      <p>
        <strong>SAVED PAYMENT METHOD</strong>
      </p>
    </div>
  );
  return xs ? (
    <Container style={pStyle} className="overview-mobile">
      <Box className={classes.root}>
        <List>
          <ListItem className={classes.box} button onClick={handleClick}>
            <ListItemText className={classes.item} primary="OVERVIEW" />
            {open ? (
              <ExpandLess style={{ color: 'white' }} />
            ) : (
              <ExpandMore style={{ color: 'white' }} />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItem button className={classes.nested}>
                <RenderOverview />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </Container>
  ) : (
    <RenderOverview />
  );
};
export default AccountOverview;
