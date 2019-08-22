import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';
import DropdownMenu from './common/DropdownMenu';
import TemporaryDrawer from './common/TemporaryDrawer';
import CartDrawer from '../pages/cart/CartDrawer';

const black = '#000000';
const offWhite = '#fcf8f4';

const paddingLevel = '30px';
const useStyles = makeStyles(theme => ({
  headerBar: {
    background: black,
    color: offWhite,
    height: 30,
    paddingTop: 7,
    textTransform: 'uppercase'
  },
  headerBarLeft: {
    'padding-right': paddingLevel,
    textAlign: 'right'
  },
  headerBarRight: {
    'padding-left': paddingLevel,
    textAlign: 'left'
  },
  headerLogo: {
    background: offWhite,
    height: 45,
    paddingTop: 10,
    textAlign: 'center',
  },
  navBarLink: {
    background: offWhite,
    color: '#000000',
    height: 45,
    paddingTop: 10,
    textAlign: 'center'
  }
}));


const Header = () => {
  const classes = useStyles();

  const renderBurgerIcon = () => {
    return (
      <>
        <DropdownMenu
          toggleLabel={
            <SvgIcon>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </SvgIcon>
          }
          panelId="my-account"
          menuItems={[
            { key: 'first', to: '/gallery', children: 'Shop' },
            { key: 'second', to: '/', children: 'Science' },
            { key: 'third', to: '/account', children: 'Account' },
          ]}
        />
      </>
    );
  };

  const renderCartIcon = () => {
    return (
      <TemporaryDrawer
        toggleContent={
          <SvgIcon>
            <path d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' />
          </SvgIcon>
        }
        closer={<Box position="absolute" right={10} top={10} children={<CloseIcon />} />}
        listContent={<CartDrawer />}
        side='right'
      >
      </TemporaryDrawer>
    );
  };

  const theme = useTheme();
  const burger = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container spacing={0}>
      <Grid item xs={6} className={classes.headerBar}>
        <Box fontSize={11} className={classes.headerBarLeft}>
          Free Shipping On Orders Over $75
        </Box>
      </Grid>
      <Grid item xs={6} className={classes.headerBar}>
        <Box fontSize={11} className={classes.headerBarRight}>
          Free Returns
        </Box>
      </Grid>
      {burger ? (
        <>
          <Grid item xs={1} className={classes.navBarLink}>
            {renderBurgerIcon()}
          </Grid>
          <Grid item xs={1} className={classes.navBarLink}></Grid>
        </>
      ) : (
          <>
            <Grid item xs={1} className={classes.navBarLink}>
              <Link color={black} component={RouterLink} to='/gallery'>Shop</Link>
            </Grid>
            <Grid item xs={1} className={classes.navBarLink}>
              <Link color={black} component={RouterLink} to='/'>Science</Link>
            </Grid>
          </>
        )}
      <Grid item xs={8} className={classes.headerLogo}>
        TH Logo here.
      </Grid>
      <Grid item xs={1} className={classes.navBarLink}>
        {!burger && (
          <Link color={black} component={RouterLink} to='/account'>
            Account
          </Link>
        )}
      </Grid>
      <Grid item xs={1} className={classes.navBarLink}>
        {renderCartIcon()}
      </Grid>
    </Grid>
  );
};

export default Header;
