import React, { useState, useContext, useCallback } from 'react';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import ProductContext from '../contexts/ProductContext';

export const useProductType = (product, variants) => {
  const [productType, setProductType] = useState(null);
  const dropdownType = product.attributes[0].value;
  const productTypeOptions = variants.filter(variant => variant.attributes[0].name === dropdownType)
    .map((variant, index) => {
      const dropdownValue = variant.attributes[0].value;
      return {
        key: variant._id,
        label: `${dropdownValue}`,
        value: String(index)
      }
    });
  const ProductType = ({isMobile}) => {
    const handleChange = useCallback((event) => {
      setProductType(event.target.value)
    },[]);
    return (
      <Grid container direction={isMobile ? "column" : "row "} spacing={3}>
        <Grid item >
          <Typography variant="h6">Product Type</Typography>
        </Grid>
        <Grid item>
          <Select
            value={productType}
            onChange={handleChange}
          >
            {productTypeOptions.map(option => (
              <MenuItem key={option.key} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    );
  };

  return [productType, ProductType];

};
