import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

/* https://www.material-ui-datatables.com */
import MUIDataTable from "mui-datatables";

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTable: {
      root: {
        backgroundColor: "#FF000",
        width: "100%",
      },
      paper: {
        boxShadow: "none",
      }
    },
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: "#FFF"
      }
    },
    MUIDataTableHeadCell: {
      root: {
        fontSize: '1rem',
        fontWeight: 800,
      },
      sortAction: {
        display: 'block',
        textAlign: "center",
      }
    }

  }});

const DataTable = ({ title, data, columns, isLoading}) => {
  const options = {
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    selectableRows: "none",
    rowsPerPage: 10,
    page: 1,
    rowsPerPageOptions: [10, 20, 50],
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={
          <Typography variant="h5">
            <strong>{title}</strong>
            {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
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
