import React, { useContext, useReducer, useEffect } from 'react';

import ProductContext from '../../contexts/ProductContext';

import {
  getVariantTypes,
  getVariantAttributes,
  getVariantOptionsByVariantType
} from '../../utils/product';

import VariantType from './VariantType';

const productTypeReducer = (state, action) => {
  switch (action.type) {
    case 'Pill Type':
      return { ...state, 'Pill Type': action.payload, 'Diet Type': null };

    case 'Diet Type':
      return { ...state, 'Diet Type': action.payload };

    default:
      return state;
  }
};

const ProductType = ({ isMobile, variantSlug, updateTerminalVariant }) => {
  const { product, variants } = useContext(ProductContext);
  const defaultTerminalVariantType = getVariantAttributes(
    variants,
    variantSlug
  );
  const [terminalVariant, dispatch] = useReducer(
    productTypeReducer,
    defaultTerminalVariantType
  );
  const variantTypes = getVariantTypes(product, variants);

  useEffect(() => {
    updateTerminalVariant(terminalVariant);
  }, [terminalVariant, updateTerminalVariant]);

  return (
    <>
      {Object.keys(variantTypes).map(key => {
        const value = terminalVariant[key];
        let options;
        switch (key) {
          case 'Pill Type':
            options = variantTypes[key];
            break;
          case 'Diet Type':
            options = getVariantOptionsByVariantType(
              variants,
              'Pill Type',
              terminalVariant['Pill Type']
            );
            break;
          default:
            break;
        }
        return (
          <>
            <VariantType
              isMobile={isMobile}
              variantType={key}
              options={options}
              variantValue={value}
              dispatch={dispatch}
            />
            <br />
          </>
        );
      })}
    </>
  );
};

export default ProductType;
