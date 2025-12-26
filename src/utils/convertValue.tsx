import type { ICurrencyRate } from "../types/currency.types";

export const convertValue = (
  value: number,
  to: string,
  currencyRate: ICurrencyRate
): number => {
  if (!value || !to) return 0;
  const toValue = currencyRate.rates[to];

  return value * toValue;
};
