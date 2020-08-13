import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import LoaderInProgress from './LoaderInProgress';

/* https://www.material-ui-datatables.com */
import MUIDataTable from 'mui-datatables';

const useStyles = makeStyles(theme => ({

  title: {
    fontFamily: theme.typography.headerFontFamily,
    fontSize: 34,
    marginBottom: 30,
    color: theme.palette.brand.camoGreen,
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      marginTop: 15,
      marginBottom: 5
    }
  }
}));

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

const DataTable = ({ title, data, columns, isLoading, moreOptions }) => {
  const classes = useStyles();
  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    selectableRows: 'none',
    rowsPerPage: 10,
    page: 0,
    rowsPerPageOptions: [10, 20, 50],
    print: false,
    search: false,
    download: false,
    viewColumns: false,
    filter: false,
    ...moreOptions
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={
          <Typography className={classes.title}>
            {title}
            {isLoading && <LoaderInProgress />}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
        className="data-table"
      />
    </MuiThemeProvider>
  );
};

export default DataTable;
