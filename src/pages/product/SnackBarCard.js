import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TemporaryDrawer from '../../components/common/TemporaryDrawer';
import CartDrawer from '../../pages/cart/CartDrawer';
import ShoppingBag from '../../components/common/Icons/Shopping-Bag';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Select,
  MenuItem,
  CardMedia,
  SvgIcon,
  Badge
} from '@material-ui/core';
import { fonts, sizes } from '../../components/Theme/fonts';

const useStyles = makeStyles(theme => ({
  snackCard: {
    width: '230px',
    height: '100px',
    padding: '14px'
  },
  snackCardMedia: {
    width: '100%',
    height: '68px'
  },
  contentText: {
    width: '135px',
    padding: '0 !important'
  },
  snackCardItem: {
    width: '260px',
    height: '100px',
    padding: '14px',
    backgroundColor: '#ffffff',
    boxShadow: '2px 2px 6px 0px rgba(0,0,0,0.64)'
  }
}));

const checkMarkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);

const { $brandSans, $brandSerif } = fonts;
const { smallText1 } = sizes;
const StyledBadge = withStyles(theme => ({
  root: {
    fontSize: 20,
    fontFamily: $brandSans
  },
  badge: {
    top: '45%',
    right: -8,
    fontSize: 20,
    fontFamily: $brandSans
  }
}))(Badge);

const SnackBarCard = React.forwardRef((props, ref) => {
  const cart = useSelector(state => state.cart);

  const cartCount = cart.items.length;
  const { image, title, closer } = props;
  const classes = useStyles();

  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);
  const [drawer, setDrawer] = React.useState({
    open: undefined
  });

  const openDrawer = event => {
    closeSnackbar(props.id);
    setDrawer({ open: true });
  };

  const viewCartDrawer = (
    <TemporaryDrawer
      toggleContent={
        <StyledBadge invisible={cartCount < 1} badgeContent={cartCount}>
          <ShoppingBag />
        </StyledBadge>
      }
      closer={
        <Box position="absolute" right={10} top={10} children={<CloseIcon />} />
      }
      listContent={<CartDrawer />}
      side="right"
    ></TemporaryDrawer>
  );

  return (
    <Box boxShadow={3} className={classes.snackCardItem} ref={ref}>
      <Grid
        container
        style={{ width: '100%' }}
        justify="space-between"
        alignItems="center"
      >
        <Grid item style={{ width: '13px' }}>
          <SvgIcon style={{ 'margin-right': '3px' }}>{checkMarkIcon}</SvgIcon>
        </Grid>
        <Grid item style={{ width: '59px', height: '68px' }}>
          <CardMedia
            className={classes.snackCardMedia}
            image={image}
            title={title}
            style={{ width: '59px', 'margin-left': '5px' }}
          />
        </Grid>
        <Grid item style={{ width: '130px', padding: '0' }}>
          <CardContent className={classes.contentText}>
            <Typography
              component="p"
              style={{ width: '130px', 'font-size': '22px' }}
            >
              Added to cart
            </Typography>
            <Button onClick={() => openDrawer()} children={closer}>
              <Typography
                style={{
                  'font-family': $brandSans,
                  'font-size': smallText1,
                  'text-transform': 'uppercase',
                  'font-weight': 'bold',
                  'text-decoration': 'underline'
                }}
                component="p"
              ></Typography>
              Alert Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
});

SnackBarCard.propTypes = {
  id: PropTypes.number.isRequired
};

export default SnackBarCard;
