import React, { useState, useContext, useCallback } from 'react';

import ProductContext from '../contexts/ProductContext';
import VariantType from '../pages/product/VariantType';

import {getVariantAttributes, getVariantTypes} from "../utils/product";

export const useProductType = () => {

  const [selectedTerminalVariant, setSelectedTerminalVariant] = useState(null);

  const ProductType = ({isMobile, variantSlug }) => {
    const [ product, variants ] = useContext(ProductContext);
    const [pillType, dietType] = getVariantAttributes(variants, variantSlug);
    console.log('useProductType', {product, variants} )
    console.log('variant', pillType, dietType)
    const variantTypes = getVariantTypes(product, variants);
    return (
      <>
        {Object.keys(variantTypes).map(key => {
          let value = '';
          switch (key) {
            case 'Pill Type':
              value = pillType;
              break;
            case 'Diet Type':
              value = dietType;
              break;
            default:
              break;
          }
          return (
            <>
              <VariantType isMobile={isMobile} variantType={key} options={variantTypes[key]} value={value}/>
              < br/>
            </>
          );
        })}
      </>
    );
  };

  return [selectedTerminalVariant, ProductType];

};
