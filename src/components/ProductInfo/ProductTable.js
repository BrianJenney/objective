import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    maxWidth: 534,
    minWidth: 320,
    border: `1px solid ${theme.palette.brand.forestGreen}`
  },
}));

const createData = (serving, amount, dv) => {
  return { serving, amount, dv }
}

const createHeader = (serving, amount, dv) => {
  return { serving, amount, dv }
}

const headers = [
  createHeader('Calories', 'Amount', '% Daily Value'),
];

const rows = [
  createData('Each Serving Contains', 5, '-' ),
  createData('Calories from saturated fat', '4.5', '-'),
  createData('Vitamin E (d-alpha tocopherol)', '10mg', '45%*'),
  createData('Astaxanthin (Haematococcus 12 mg * pluvialis microalgae)', '10mg', '**'),
];

const PDPTable = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Each Serving Contains</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">% Daily Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.serving}>
              <TableCell component="th" scope="row">
                {row.serving}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.dv}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default PDPTable
