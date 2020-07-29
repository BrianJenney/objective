import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { MenuLink } from '../../components/common';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { StyledArrowIcon } from '../cart/StyledComponents';
import {
  StyledSmallCaps,
  StyledFinePrint,
  StyledProductLink,
  StyledCounterButton,
  StyledCardActions,
  StyledCardContent,
  StyledDrawerGrid,
  StyledProductPrice,
  StyledRemoveLink
} from '../cart/StyledComponents.js';
import { displayMoney } from '../../utils/formatters';

import { requestFindOrdersByAccount } from '../../modules/order/actions';
import {
  formatCurrency,
  formatDateTime,
  getTracking,
  getShippingAndTracking
} from '../../utils/misc';
import ScrollToTop from '../../components/common/ScrollToTop';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: 25,
    marginBottom: 20,
    color: theme.palette.brand.camoGreen
  },
  statusTitle: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 700,
    letterSpacing: '1px',
    fontSize: '14px',
    color: '#231f20'
  },
  productTitle: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 700,
    fontSize: '18px',
    color: theme.palette.brand.camoGreen,
    lineHeight: '22.5px',
    paddingTop: '10px',
    marginLeft: '0px',
    marginBottom: '-10px'
  },
  price: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 400,
    fontSize: '16px',
    color: theme.palette.brand.accentBrown,
    letterSpacing: '1px',
    marginTop: '-55px'
  },
  info: {
    fontFamily: theme.typography.bodyFontFamily,
    fontWeight: 400,
    letterSpacing: '1px',
    fontSize: '14px',
    color: '#231f20',
    marginTop: '-5px'
  },
  link: {
    display: 'block',
    color: theme.palette.brand.accentBrown,
    fontWeight: 400
  },
  topGrid: {
    borderTop: '1px solid black',
    borderBottom: '1px solid black'
  },
  otherGrid: {
    borderBottom: '1px solid black'
  },
  leftBox: {
    float: 'left'
  },
  rightBox: {
    float: 'right'
  }
}));

// const columns = [
//   {
//     name: '_id',
//     options: {
//       display: 'false'
//     }
//   },
//   {
//     name: 'orderNumber',
//     label: 'ORDER ID',
//     options: {
//       filter: false,
//       sort: false,
//       customBodyRender: (value, tableMeta, updateValue) => (
//         <Button
//           style={{ lineHeight: 0, paddingLeft: '1px' }}
//           color="primary"
//           component={AdapterLink}
//           to={`/orders/${tableMeta.rowData[0]}`}
//         >
//           {value}
//         </Button>
//       )
//     }
//   },
//   {
//     name: 'createdAt',
//     label: 'ORDER DATE',
//     options: {
//       filter: false,
//       sort: false,
//       sortDirection: 'desc',
//       customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value, false)
//     }
//   },
//   /*
//   {
//     name: "cart.total",
//     label: "Amount",
//     options: {
//       filter: false,
//       sort: true,
//       customBodyRender: (value, tableMeta, updateValue) => (
//         <Typography component="p" align="right" style={{fontSize: "0.875rem"}}>{formatCurrency(value)}</Typography>
//       )
//     }
//   },
//   {
//     name: "source",
//     label: "Source",
//     options: {
//       filter: true,
//       sort: false,
//       customBodyRender: (value, tableMeta, updateValue) => (
//         <Typography component="p" align="center" style={{fontSize: "0.875rem"}}>{value}</Typography>
//       )
//     }
//   },
//   */
//   {
//     name: 'status',
//     label: 'STATUS',
//     options: {
//       filter: true,
//       sort: false,
//       customBodyRender: (value, tableMeta, updateValue) => (
//         <Typography component="p" align="left" style={{ fontSize: '0.875rem' }}>
//           {value}
//         </Typography>
//       )
//     }
//   },
//   {
//     name: 'items',
//     label: 'TRACKING INFORMATION',
//     options: {
//       filter: false,
//       sort: false,
//       customBodyRender: (value, tableMeta, updateValue) => {
//         const { rowData } = tableMeta;
//         const trackings = getTracking(rowData[4], rowData[3]);
//         return trackings
//           ? trackings.map(tracking => (
//               <>
//                 <Link
//                   href={tracking.url}
//                   style={{ color: 'black' }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {tracking.number}
//                 </Link>
//                 <br />
//               </>
//             ))
//           : null;
//       }
//     }
//   }

/*
{
          name: "updatedAt",
          label: "Updated On",
          options: {
            filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value, true),
        },
      },
      */
// ];

const AccountOrders = ({ currentUser: { data }, location }) => {
  const dispatch = useDispatch();
  // const { state } = location;
  const order = useSelector(state => state.order.order);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    if (!data.orders) {
      dispatch(requestFindOrdersByAccount(data.account_jwt));
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, data.orders]);

  useEffect(() => {
    window.analytics.page('Account Orders');
  }, []);

  for (const key in data.orders) {
    const { statusStepper } = getShippingAndTracking(data.orders[key]);
    if (statusStepper.status === 'delivered') {
      data.orders[key].status = 'delivered';
    }
    if (order && data.orders[key]._id === order._id) {
      data.orders[key].status = order.status;
    }
    if (data.orders[key].status === 'canceled') {
      data.orders[key].status = 'Order Cancelled';
    }
  }

  const renderOrders = () => {
    if (!data.orders) {
      return null;
    }

    return data.orders.map((d, dataIndex, rowIndex) => {
      return (
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          className={dataIndex === 0 ? classes.topGrid : classes.otherGrid}
        >
          <Box component="div" m={1} className={classes.leftBox}>
            <Typography className={classes.statusTitle}>ORDER ID</Typography>
            <MenuLink
              to={`/orders/${data.orders[dataIndex]._id}`}
              className={classes.link}
              underline="always"
            >
              {data.orders[dataIndex].orderNumber}
            </MenuLink>
            <Typography className={classes.statusTitle}>ORDER DATE</Typography>
            <Typography className={classes.info}>{formatDateTime(data.orders[dataIndex].createdAt, false)}</Typography>

            <Typography className={classes.statusTitle}>STATUS</Typography>
            <Typography className={classes.info}>{data.orders[dataIndex].status.charAt(0).toUpperCase() + data.orders[dataIndex].status.slice(1)}</Typography>
            <Typography className={classes.statusTitle}>TRACKING INFORMATON</Typography>
            <MenuLink
              to={`/transactions/${data.orders[dataIndex]._id}`}
              className={classes.link}
              underline="always"
            >
              {data.orders[dataIndex].shipTracking}
            </MenuLink>
          </Box>
          <Box component="div" m={1} className={classes.rightBox}>
          {data.orders[dataIndex].items.map((item) => {
            return (
              <StyledDrawerGrid
                container
                direction="row"
                key={`cart-${dataIndex}`}
                className="CartListBox"
              >
                <Grid
                  item
                  xs={4}
                  style={
                    !xs
                      ? { minWidth: '126px', marginRight: '25px' }
                      : { minWidth: '126px', marginRight: '18px' }
                  }
                >
                  <Card>
                    <Link
                      to={`/products/${item.slug}`}
                    >
                      <CardMedia
                        style={{ height: 126, width: 126 }}
                        image={item.variant_img}
                        title={item.variant_name} 
                        />
                    </Link>
                  </Card>
                </Grid>
                <Grid item xs={xs ? 8 : 7}>
                  <Card
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                      justifyContent: 'space-between'
                    }}
                  >
                      <StyledProductLink
                        className={classes.productTitle}
                        align="left"
                      >
                        {item.variant_name}
                      </StyledProductLink>
                    <StyledCardContent
                      style={
                        !xs
                          ? { paddingBottom: '0' }
                          : { paddingBottom: '0px', paddingRight: '0px' }
                      }
                    >
                      <Typography className={classes.price}>
                        {displayMoney(item.quantity * item.unit_price)}
                      </Typography>
                    </StyledCardContent>
                    <StyledCardContent
                      style={
                        !xs
                          ? { paddingBottom: '0' }
                          : { paddingBottom: '0px', paddingRight: '0px' }
                      }
                    >
                      <MenuLink
              to={`/orders/${data.orders[dataIndex]._id}`}
              className={classes.link}
              underline="always"
            >
              
              <span>Trace Product</span>
              <StyledArrowIcon style={{marginLeft: '10px'}}>
                  <ArrowForwardIcon style={{color: '#a06958'}} />
                </StyledArrowIcon>
            </MenuLink>
                    </StyledCardContent>
                  </Card>
                </Grid>
              </StyledDrawerGrid>
            )
          })}
          </Box>
        </Grid>
      );
    });
  };

  return (
    <ScrollToTop>
      <Grid
        container
        direction="column"
        spacing={3}
        // className={xs ? 'account-orders account-orders-mobile-table' : 'account-orders'}
      >
        {!xs ? <Typography className={classes.title}>Your Orders</Typography> : null}
        
        {xs ? (
          <p>hello</p>
        ) : (
          // <DataTable
          //   title={xs ? '' : 'Your Orders'}
          //   data={data.orders}
          //   columns={columns}
          //   isLoading={isLoading}
          //   moreOptions={{
          //     customRowRender: (d, dataIndex, rowIndex) => (
          //       <tr className="account-orders-mobile-row">
          //         <td>
          //           <Grid container direction="row">
          //             <Grid item xs>
          //               <Typography className="order-meta-title-item">ORDER NUMBER</Typography>
          //               <Typography className="order-meta-item-info">
          //                 <Button
          //                   color="primary"
          //                   component={AdapterLink}
          //                   to={`/orders/${data.orders[dataIndex]._id}`}
          //                 >
          //                   {data.orders[dataIndex].orderNumber}
          //                 </Button>
          //               </Typography>
          //             </Grid>
          //           </Grid>

          //           <Grid container direction="row">
          //             <Grid item xs>
          //               <Typography className="order-meta-title-item">ORDER DATE</Typography>
          //               <Typography
          //                 className="order-meta-item-info"
          //                 style={{ verticalAlign: 'top' }}
          //               >
          //                 {formatDateTime(data.orders[dataIndex].createdAt, false)}
          //               </Typography>
          //             </Grid>
          //           </Grid>

          //           <Grid container direction="row">
          //             <Grid item xs>
          //               <Typography className="order-meta-title-item">STATUS</Typography>
          //               <Typography className="order-meta-item-info">
          //                 {data.orders[dataIndex].status}
          //               </Typography>
          //             </Grid>
          //           </Grid>

          //           <Grid container direction="row">
          //             <Grid item xs>
          //               <Typography className="order-meta-title-item">
          //                 TRACKING INFORMATION
          //               </Typography>
          //               <Typography className="order-meta-item-info">
          //                 <Button
          //                   color="primary"
          //                   component={AdapterLink}
          //                   to={`/transactions/${data.orders[dataIndex]._id}`}
          //                 />
          //               </Typography>
          //             </Grid>
          //           </Grid>
          //         </td>
          //       </tr>
          //     )
          //   }}
          // />
          <>
            {renderOrders()}
          </>

          // <DataTable
          //   title={xs ? '' : 'Your Orders'}
          //   data={data.orders}
          //   columns={columns}
          //   isLoading={isLoading}
          // />
        )}
      </Grid>
    </ScrollToTop>
  );
};

export default AccountOrders;
