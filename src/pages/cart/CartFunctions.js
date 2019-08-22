export function calculateCartTotal(c) {
  const total = c.reduce(function (prev, curr) {
    return prev + curr.unit_price * curr.quantity;
  }, 0);

  return total;
}