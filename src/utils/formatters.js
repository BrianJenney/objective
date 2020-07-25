export const displayMoney = (value, showFree = false) => {
  if (typeof value === 'undefined' || value === null || isNaN(value)) {
    value = 0;
  }

  if (parseInt(value) == 0 || showFree) {
    return 'FREE';
  } else {
    return `$${value.toFixed(2)}`;
  }
};
