const isDateEffective = (expirationDate, today) => {
  return today <= expirationDate;
};

export const getPrices = (prices) => {
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
  return variants.filter(variant => variant.product_id === productId)
                 .map(variant => variant.slug)
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
      attributes: product.attributes.map(attribute => attribute.value),
    };
    productSlugs.push(product.slug);
    productMap.set(product.slug, item);
  });
  return [productSlugs, productMap];
};

const getEffectivePrice = (sku, pricesMap) => pricesMap.get(sku);

export const getVariants = (products, variants, priceMap) => {
  const variantSlugs = [];
  const variantMap = new Map();
  products.forEach(product => {
    variants.filter(variant => variant.product_id === product._id)
            .forEach(variant => {
              const item = {
                id: variant._id,
                productSlug: product.slug,
                name: variant.name,
                sku: variant.sku,
                slug: variant.slug,
                title: variant.title,
                description: variant.description,
                image: variant.assets.imgs,
                variantInfo: variant.variantInfo,
                attributes: variant.attributes,
                effectivePrice: getEffectivePrice(variant.sku, priceMap)
              };
              variantSlugs.push(variant.slug);
              variantMap.set(variant.slug, item);
            })
  });
  return [variantSlugs, variantMap];
};

