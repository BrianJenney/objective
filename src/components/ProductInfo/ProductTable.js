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
    marginTop: 100,
    border: `1px solid ${theme.palette.brand.forestGreen}`
  },
}));

const createData = (serving, amount, dv) => {
  return { serving, amount, dv }
}

const createHeader = (serving, amount, dv) => {
  return { serving, amount, dv }
}
// 'Each serving contains', 'Amount', '% Daily Value'

const headers = [
  createHeader('Each serving contains', 'Amount', '% Daily Value'),
];

const rows = [
  createData('Calories', 5, '-' ),
  createData('Calories from saturated fat', '4.5', '-'),
  createData('Vitamin E (d-alpha tocopherol)', '10mg', '45%*'),
  createData('Astaxanthin (Haematococcus 12 mg * pluvialis microalgae)', '10mg', '**'),
];

const PDPTable = () => {
  const classes = useStyles();

  const createHeaders = header => (
    <TableRow key={header.serving}>
      <TableCell component="th" scope="row">{header.serving}</TableCell>
      <TableCell align="right">{header.amount}</TableCell>
      <TableCell align="right">{header.dv}</TableCell>
    </TableRow>
  )

  const createRows = row => (
    <TableRow key={row.serving}>
      <TableCell component="td" scope="row">
        {row.serving}
      </TableCell>
      <TableCell align="right">{row.amount}</TableCell>
      <TableCell align="right">{row.dv}</TableCell>
    </TableRow>
  )

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          {headers.map(createHeaders)}
        </TableHead>
        <TableBody>
          {rows.map(createRows)}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default PDPTable
