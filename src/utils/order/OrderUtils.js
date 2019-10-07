export const roundTo2Decimal = (number) => Math.round(number * 100) / 100;

export const getOrderTotalSummary = order => {
  let { subtotal, tax, discount } = order;

  if (tax === null || !isNaN(tax)) {
    tax = 0;
  }

  const total = subtotal - roundTo2Decimal(discount) + roundTo2Decimal(tax);

  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    discount: discount.toFixed(2),
    total: total.toFixed(2)
  };
};
