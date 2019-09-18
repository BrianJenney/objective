import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { DataTable }  from '../../components/common';

import { requestFindOrdersByAccount } from '../../modules/order/actions';
import { formatCurrency, formatDateTime } from '../../utils/misc';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const columns = [
  {
    name: "_id",
    label: "Order ID",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button color="primary" component={AdapterLink} to={`/account/orders/${value}`}>
            {value}
          </Button>
        );
      },
    },
  },
  {
    name: "createdAt",
    label: "Ordered On",
    options: {
      filter: false,
      sort: false,
      sortDirection: 'desc',
      customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value, true),
    },
  },
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
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Typography component="p" align="center" style={{fontSize: "0.875rem"}}>{value}</Typography>
      )

    }
  },
  {
    name: "updatedAt",
    label: "Updated On",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => formatDateTime(value, true),
    },
  },
];

const AccountOrders = ({ currentUser: { data}}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!data.orders) {
      dispatch(requestFindOrdersByAccount(data.account_jwt));
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  },[ dispatch, data.orders]);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item sm={12} md={12} lg={12}>
        <DataTable
          title={"Your Orders"}
          data={data.orders}
          columns={columns}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
};

export default AccountOrders;
