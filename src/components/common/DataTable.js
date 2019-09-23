import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import LoaderInProgress from './LoaderInProgress';

/* https://www.material-ui-datatables.com */
import MUIDataTable from 'mui-datatables';

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: '#FF000',
          width: '100%'
        },
        paper: {
          boxShadow: 'none'
        }
      },
      MUIDataTableHeadCell: {
        sortAction: {
          display: 'block',
          textAlign: 'left'
        }
      }
    }
  });

const DataTable = ({ title, data, columns, isLoading }) => {
  const options = {
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRows: 'none',
    rowsPerPage: 10,
    page: 0,
    rowsPerPageOptions: [10, 20, 50],
    print: false,
    search: false,
    download: false,
    viewColumns: false,
    filter: false
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={
          <Typography variant="h3">
            {title}
            {isLoading && <LoaderInProgress />}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
};

export default DataTable;
