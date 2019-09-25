import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { DataTable, AdapterLink } from '../../components/common';

import { requestFindOrdersByAccount } from '../../modules/order/actions';
import { formatCurrency, formatDateTime } from '../../utils/misc';
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
    name: '_id',
    label: 'TRACKING INFORMATION',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button
            color="primary"
            component={AdapterLink}
            to={`/transactions/${value}`}
          >
            {' '}
          </Button>
        );
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

  return (
    <Grid container direction="column" spacing={3} className="account-orders">
      <Grid item sm={12} md={12} lg={12}>
        <DataTable
          title={xs? '' : 'Your Orders'}
          data={data.orders}
          columns={columns}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
};

export default AccountOrders;
