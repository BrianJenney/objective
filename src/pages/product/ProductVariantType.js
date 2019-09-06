import React, { useContext, useReducer, useEffect } from 'react';

import ProductContext from '../../contexts/ProductContext';

import { getVariantOptions, getVariantSkuBySlug } from '../../utils/product';

import VariantType from './VariantType';

const productTypeReducer = (state, action) => {
  switch (action.type) {
    case 'Product Type':
      return { ...state, 'Product Type': action.payload };

    default:
      return state;
  }
};

const ProductVariantType = ({
  isMobile,
  variantSlug,
  updateTerminalVariant
}) => {
  const { variants } = useContext(ProductContext);
  const defaultSku = getVariantSkuBySlug(variants, variantSlug);
  const [selectedSku, dispatch] = useReducer(productTypeReducer, {
    'Product Type': defaultSku
  });
  const variantOptions = getVariantOptions(variants);

  useEffect(() => {
    updateTerminalVariant(selectedSku);
  }, [selectedSku, updateTerminalVariant]);

  return (
    <>
      <VariantType
        isMobile={isMobile}
        variantType="Product Type"
        options={variantOptions}
        variantValue={selectedSku['Product Type']}
        dispatch={dispatch}
      />
      <br />
    </>
  );
};

export default ProductVariantType;
