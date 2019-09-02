import React, {useContext, useReducer, useCallback} from "react";

import ProductContext from '../../contexts/ProductContext';

import { getVariantTypes, getVariantAttributes, getVariantOptionsByVariantType } from '../../utils/product';

import VariantType from './VariantType';

const productTypeReducer = (state, action) => {
  switch (action.type) {
    case 'Pill Type':
      return {...state, 'Pill Type': action.payload};

    case 'Diet Type':
      return {...state, 'Diet Type': action.payload};

    default:
      return state;
  }
};

const ProductType = ({isMobile, variantSlug }) => {
  const { product, variants, prices } = useContext(ProductContext);
  const defaultTerminalVariantType = getVariantAttributes(variants, variantSlug);
  const [ terminalVariant, dispatch ] = useReducer(productTypeReducer, defaultTerminalVariantType);
  const variantTypes = getVariantTypes(product, variants);
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
            options = getVariantOptionsByVariantType(variants, 'Pill Type', terminalVariant['Pill Type']);
            break;
          default:
            break;
        }
        return (
          <>
            <VariantType isMobile={isMobile} variantType={key} options={options} variantValue={value} dispatch={dispatch}/>
            <br/>
          </>
        );
      })}
    </>
  );
};

export default ProductType;
