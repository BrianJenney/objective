import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { DataTable, AdapterLink } from '../../components/common';

import { requestFindOrdersByAccount } from '../../modules/order/actions';
import {
  formatCurrency,
  formatDateTime,
  getTracking,
  getShippingAndTracking
} from '../../utils/misc';
import ScrollToTop from '../../components/common/ScrollToTop';

const useStyles = makeStyles(theme => ({
  topGrid: {
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  otherGrid: {
    borderBottom: '1px solid black',
  },
  leftBox: {
    float: 'left'
  },
  rightBox: {
    float: 'right'
  },
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
  info: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
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
        <Grid item sm={12} md={12} lg={12} className={dataIndex === 0 ? classes.topGrid : classes.otherGrid}>
          <Box component="div" m={1} className={classes.leftBox}>
            <Typography className={classes.statusTitle}>ORDER ID</Typography>
            <Typography className={classes.statusTitle}>
              {data.orders[dataIndex].orderNumber}
            </Typography>
            <Typography className={classes.statusTitle}>ORDER DATE</Typography>
            <Typography className={classes.statusTitle}>STATUS</Typography>
            <Typography className={classes.statusTitle}>TRACKING INFORMATON</Typography>
          </Box>
          <Box component="div" m={1} className={classes.rightBox}>
            hello
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
            {/* {data.orders.map((d, dataIndex, rowIndex) => {
              return (
                <>
                <Box component="div" m={1} className={classes.leftBox}>
                <Typography className={classes.statusTitle}>ORDER ID</Typography>
                <Typography className={classes.statusTitle}>{data.orders[dataIndex].orderNumber}</Typography>
                <Typography className={classes.statusTitle}>ORDER DATE</Typography>
                <Typography className={classes.statusTitle}>STATUS</Typography>
                <Typography className={classes.statusTitle}>TRACKING INFORMATON</Typography>
              </Box>
              <Box component="div" m={1} className={classes.rightBox}>
                hello
              </Box>
              </>
              )
            })} */}
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
