export const formatAmount = (value: number, decimals = 2) => {
  const valueWithDecimals = Number(value.toFixed(decimals));
  const decimalPart = valueWithDecimals % 1;

  return decimalPart === 0 ? value.toFixed(2) : value.toFixed(decimals);
};
