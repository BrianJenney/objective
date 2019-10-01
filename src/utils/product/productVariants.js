const isDateEffective = (expirationDate, today) => {
  return today <= expirationDate;
};

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
    pricesMap.set(price.sku, effectivePrice);
  });
  return pricesMap;
};

const getVariantSlugs = (productId, variants) => {
  return variants
    .filter(variant => variant.product_id === productId)
    .map(variant => variant.slug);
};

export const getProducts = (products, variants) => {
  const productSlugs = [];
  const productMap = new Map();

  products.forEach(product => {
    const item = {
      id: product._id,
      name: product.name,
      slug: product.slug,
      title: product.title,
      subtitle: product.subtitle,
      description: product.description,
      variantSlugs: getVariantSlugs(product._id, variants),
      assets: product.assets,
      category: product.category,
      color: product.color,
      attributes: product.attributes.map(attribute => attribute.value)
    };
    productSlugs.push(product.slug);
    productMap.set(product.slug, item);
  });
  return [productSlugs, productMap];
};

const getEffectivePrice = (sku, pricesMap) => pricesMap.get(sku);

/*
@description - Returns product category slugs
@param {Array} products
@return - {Array} product categories
*/
export const getProductCategories = products => {
  const productCategoriesMap = new Map();
  const productCategories = [];
  products.map(product => {
    if (!productCategoriesMap.has(product.category)) {
      productCategoriesMap.set(product.category, true);
      productCategories.push(product.category);
    }
  });

  return productCategories;
};

export const getVariants = (products, variants, priceMap) => {
  const variantSlugs = [];
  const variantMap = new Map();
  products.forEach(product => {
    variants
      .filter(variant => variant.product_id === product._id)
      .forEach(variant => {
        const item = {
          id: variant._id,
          prodSlug: product.slug,
          name: variant.name,
          sku: variant.sku,
          slug: variant.slug,
          title: variant.title,
          description: variant.description,
          assets: variant.assets,
          variantInfo: variant.variantInfo,
          attributes: variant.attributes,
          productCategory: product.category,
          effectivePrice: getEffectivePrice(variant.sku, priceMap)
        };
        variantSlugs.push(variant.slug);
        variantMap.set(variant.slug, item);
      });
  });

  return [variantSlugs, variantMap];
};

export const getVariantTypes = (product, variants) => {
  const variantTypeMap = new Map();
  product.attributes.forEach(attribute => {
    const variantType = attribute.value;
    const variantTypeOptions = [];
    variants.forEach(variant => {
      variant.attributes.forEach(attribute => {
        if (attribute.name === variantType) {
          const value = attribute.value;
          if (!variantTypeOptions.includes(value))
            variantTypeOptions.push(value);
        }
      });
    });
    variantTypeMap.set(variantType, variantTypeOptions);
  });
  // console.log('variantTypes', variantTypeMap);
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

export const getVariantByVariantSlug = (variants, pricesMap, variantSlug) => {
  let variant = null;
  if (variants.length > 0) {
    variant = variants.filter(variant => variant.slug === variantSlug)[0];
    variant.effectivePrice = pricesMap.get(variant.sku);
  }
  return variant;
};

export const getVariantByTerminalVariant = (
  variants,
  pricesMap,
  terminalVariant
) => {
  let variant = null;
  if (variants.length > 0) {
    const found = variants.filter(
      variant =>
        variant.attributes[0].value === terminalVariant['Pill Type'] &&
        (variants.attributes.length > 1 &&
          variant.attributes[1].value === terminalVariant['Diet Type'])
    );
    if (found.length > 0) {
      variant = found[0];
      variant.effectivePrice = pricesMap.get(variant.sku);
    }
  }
  return variant;
};

export const getVariantOptions = variants => {
  return variants.map(variant => variant.sku);
};

export const getVariantSkuBySlug = (variants, variantSlug) => {
  let variantSku = null;
  const variant = variants.filter(variant => variant.slug === variantSlug);
  if (variant.length > 0) {
    variantSku = variant[0].sku;
  }
  // console.log('getVariantSkuBySlug', { variants, variantSku})
  return variantSku;
};

export const getDefaultSkuByProduct = product => {
  let defaultVariantSku = null;
  if (product) defaultVariantSku = product.defaultVariantSku;
  return defaultVariantSku;
};

export const getVariantMap = (variants, pricesMap) => {
  const variantMap = new Map();
  variants.forEach(variant => {
    variant.effectivePrice = pricesMap.get(variant.sku);
    variantMap.set(variant.sku, variant);
  });
  return variantMap;
};
