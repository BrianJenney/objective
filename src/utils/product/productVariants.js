const isDateEffective = (expirationDate, today) => today <= expirationDate;

export const getPrices = prices => {
  const today = Date.now();
  const pricesMap = new Map();
  prices.forEach(price => {
    let effectivePrice = null;
    if (effectivePrice === null && price.campaign) {
      const campaignDate = Date.parse(price.campaign.campaignEndDate);
      if (isDateEffective(campaignDate, today)) {
        effectivePrice = price.campaign.campaignPrice.$numberDecimal;
      }
    }
    if (effectivePrice === null && price.sale) {
      const saleDate = Date.parse(price.sale.saleEndDate);
      if (isDateEffective(saleDate, today)) {
        effectivePrice = price.sale.salePrice.$numberDecimal;
      }
    }
    if (effectivePrice === null) {
      effectivePrice = price.price.$numberDecimal;
    }
    pricesMap.set(price.variant_id, effectivePrice);
  });
  return pricesMap;
};

/*
@description - Returns product category slugs
@param {Array} products
@return - {Array} product categories
*/
export const getProductCategories = products => {
  const isNewYearPage = window.location.pathname.includes('newyear');
  const productCategoriesMap = new Map();
  const productCategories = [];
  if (isNewYearPage) {
    products.map(product => {
      if (
        product.id == '5d8bb76ff5005515a437d4c8' ||
        product.id == '5d8bb528f5005515a437d4c5' ||
        product.id == '5ceebfdca686a03bccfa67c0'
      ) {
        product.productCategory = 'newyear';
      }
      if (!productCategoriesMap.has(product.productCategory)) {
        productCategoriesMap.set(product.productCategory, true);
        productCategories.push(product.productCategory);
      }
    });
  } else {
    products.map(product => {
      if (!productCategoriesMap.has(product.productCategory)) {
        productCategoriesMap.set(product.productCategory, true);
        productCategories.push(product.productCategory);
      }
    });
  }

  return productCategories;
};

export const getVariantTypes = (product, variants) => {
  const variantTypeMap = new Map();
  product.attributes.forEach(attribute => {
    const variantType = attribute.value;
    const variantTypeOptions = [];
    variants.forEach(variant => {
      variant.attributes.forEach(attribute => {
        if (attribute.name === variantType) {
          const { value } = attribute;
          if (!variantTypeOptions.includes(value))
            variantTypeOptions.push(value);
        }
      });
    });
    variantTypeMap.set(variantType, variantTypeOptions);
  });
  const map = {};
  variantTypeMap.forEach((v, k) => (map[k] = v));
  return map;
};

export const getVariantAttributes = (variants, variantSlug) => {
  const variant = variants.filter(v => v.slug === variantSlug);
  const defaultVariantTypes = {};
  variant[0].attributes.forEach(
    attribute => (defaultVariantTypes[attribute.name] = attribute.value)
  );
  return defaultVariantTypes;
};

export const getVariantOptionsByVariantType = (
  variants,
  variantName,
  variantValue
) => {
  const options = variants
    .filter(
      variant =>
        variant.attributes[0].name === variantName &&
        variant.attributes[0].value === variantValue
    )
    .map(variant => variant.attributes[1].value);
  return options;
};

export const getVariantOptions = variants =>
  variants.map(variant => variant.sku);

export const getDefaultSkuByProduct = product => {
  let defaultVariantSku = null;

  if (product) {
    defaultVariantSku = product.defaultVariantSku;
  }

  return defaultVariantSku;
};

export const getVariantMap = (product, variants, pricesMap) => {
  const variantMap = new Map();

  variants.forEach(variant => {
    variant.effectivePrice = pricesMap.get(variant._id);
    variant.slug = product.slug;
    variant.id = variant._id;

    variantMap.set(variant.sku, variant);
  });

  return variantMap;
};
