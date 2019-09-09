import React, { useCallback } from 'react';
import {
  makeStyles,
  Grid,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl
} from '@material-ui/core';
import './PDP-style.css';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const VariantType = ({
  isMobile,
  variantType,
  options,
  variantValue,
  dispatch
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const handleChange = useCallback(
    event => {
      dispatch({ type: event.target.name, payload: event.target.value });
    },
    [dispatch]
  );

  return (
    <Grid container direction={isMobile ? 'column' : 'row '} spacing={7}>
      <Grid item alignItems="flex-start">
        <Typography className="pdp-product-type">
          {variantType.toUpperCase()}
        </Typography>
      </Grid>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple"></InputLabel>
        <Select
          name={variantType}
          value={variantValue}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} />}
        >
          {options.map((option, index) => (
            <MenuItem key={`${variantType}-${index}`} value={option}>
              <Typography variant="h4">{option}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default VariantType;
