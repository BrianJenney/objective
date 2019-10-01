export const roundTo2Decimal = (number) => Math.round(number * 100) / 100;

export const getOrderTotalSummary = order => {
  const { subtotal, tax, discount } = order;
  const total = subtotal - roundTo2Decimal(discount) + roundTo2Decimal(tax);
  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    discount: discount.toFixed(2),
    total: total.toFixed(2)
  };
};
