export const separateCartItemTypes = items => {
  const visibleItems = items.filter(item => !item.isHidden);
  const promotionalItems = visibleItems.filter(item => item.pipInsertId);
  const regularItems = visibleItems.filter(item => !item.pipInsertId);
  const cartCount = visibleItems.reduce((acc, item) => acc + item.quantity, 0);
  return { visibleItems, promotionalItems, regularItems, cartCount };
};
