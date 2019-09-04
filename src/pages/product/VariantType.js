import React, { useCallback } from "react";
import {makeStyles, Grid, MenuItem, Select, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dropdown: {
    width: '100%',
    minWidth: '180px',
    maxWidth: '220px',
    paddingLeft: '0 !important',
    border: '1px solid',
    height: '52px',
    fontFamily: 'p22-underground, Helvetica, sans-serif',
  },
  overridePadding: {
    padding: '0 0 0 12px !important',
    width: '59%',
  },
  rightPadding: {
    paddingRight: '0 !important',
    maxWidth: '130px !important'
  },
  productType: {
    fontSize: '.9rem',
    padding: 0,
    lineHeight: '.7rem',
    marginTop: theme.spacing(1),
    minWidth: '110px !important',
  },
}));

const VariantType = ({ isMobile, variantType, options, variantValue, dispatch }) => {
  const classes = useStyles();
  const handleChange = useCallback((event) => {
    dispatch({ type: event.target.name, payload: event.target.value});
  }, [dispatch]);
  return (
    <Grid container direction={isMobile ? "column" : "row "} spacing={3}>
      <Grid item xs={12} sm={4} lg={3} alignItems="flex-start" className={classes.rightPadding}>
        <Typography className={classes.productType} variant="h6">{variantType.toUpperCase()}</Typography>
      </Grid>
      <Grid item xs={12} sm={7} className={classes.overridePadding} justify={isMobile ? "flex-end" : "flex-start"}>
        <Select
          className={classes.dropdown}
          name={variantType}
          value={variantValue}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={`${variantType}-${index}`} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default VariantType;
