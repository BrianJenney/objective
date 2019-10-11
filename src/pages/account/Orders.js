import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { DataTable, AdapterLink } from '../../components/common';

import { requestFindOrdersByAccount } from '../../modules/order/actions';
import { formatCurrency, formatDateTime, getTracking } from '../../utils/misc';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const columns = [
  {
    name: '_id',
    label: 'ORDER ID',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button
            color="primary"
            component={AdapterLink}
            to={`/orders/${value}`}
          >
            {value}
          </Button>
        );
      }
    }
  },
  {
    name: 'createdAt',
    label: 'ORDER DATE',
    options: {
      filter: false,
      sort: false,
      sortDirection: 'desc',
      customBodyRender: (value, tableMeta, updateValue) =>
        formatDateTime(value, false)
    }
  },
  /*
  {
    name: "cart.total",
    label: "Amount",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography component="p" align="right" style={{fontSize: "0.875rem"}}>{formatCurrency(value)}</Typography>
      )
    }
  },
  {
    name: "source",
    label: "Source",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography component="p" align="center" style={{fontSize: "0.875rem"}}>{value}</Typography>
      )
    }
  },
  */
  {
    name: 'status',
    label: 'STATUS',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography component="p" align="left" style={{ fontSize: '0.875rem' }}>
          {value}
        </Typography>
      )
    }
  },
  {
    name: 'items',
    label: 'TRACKING INFORMATION',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowData = tableMeta.rowData;
        const tracking = getTracking(rowData[3], rowData[2])
        return tracking ? (
          <Link href={tracking.url} color="inherited" target="_blank" rel="noreferrer">{tracking.number}</Link>
        ) : null;
      }
    }
  }

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
];
let ordersPageTracked = false;
const AccountOrders = ({ currentUser: { data } }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (!data.orders) {
      dispatch(requestFindOrdersByAccount(data.account_jwt));
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, data.orders]);

  for (let key in data.orders) {
    if (data.orders[key].status == 'cancelled') {
      data.orders[key].status = 'Order Cancelled';
    }
  }
  if (!ordersPageTracked){
    window.analytics.page("Account Orders");
    ordersPageTracked = true;
  }
  return (

    <Grid
      container
      direction="column"
      spacing={3}
      className={
        xs ? 'account-orders account-orders-mobile-table' : 'account-orders'
      }
    >
      <Grid item sm={12} md={12} lg={12}>
        {xs ? (
          <DataTable
            title={xs ? '' : 'Your Orders'}
            data={data.orders}
            columns={columns}
            isLoading={isLoading}
            moreOptions={{
              customRowRender: (d, dataIndex, rowIndex) => {
                console.log('THIS_DATA', data.orders[dataIndex]);
                return (
                  <tr className="account-orders-mobile-row">
                    <td>
                      <Grid container direction="row">
                        <Grid item xs>
                          <Typography className="order-meta-title-item">
                            ORDER ID
                          </Typography>
                          <Typography className="order-meta-item-info">
                            <Button
                              color="primary"
                              component={AdapterLink}
                              to={`/orders/${data.orders[dataIndex]._id}`}
                            >
                              {data.orders[dataIndex]._id}
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row">
                        <Grid item xs>
                          <Typography className="order-meta-title-item">
                            ORDER DATE
                          </Typography>
                          <Typography className="order-meta-item-info">
                            {formatDateTime(
                              data.orders[dataIndex].createdAt,
                              false
                            )}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row">
                        <Grid item xs>
                          <Typography className="order-meta-title-item">
                            STATUS
                          </Typography>
                          <Typography className="order-meta-item-info">
                            {data.orders[dataIndex].status}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row">
                        <Grid item xs>
                          <Typography className="order-meta-title-item">
                            TRACKING INFORMATION
                          </Typography>
                          <Typography className="order-meta-item-info">
                            <Button
                              color="primary"
                              component={AdapterLink}
                              to={`/transactions/${data.orders[dataIndex]._id}`}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </td>
                  </tr>
                );
              }
            }}
          />
        ) : (
          <DataTable
            title={xs ? '' : 'Your Orders'}
            data={data.orders}
            columns={columns}
            isLoading={isLoading}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AccountOrders;
