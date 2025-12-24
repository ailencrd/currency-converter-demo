export interface ICurrencyOption {
  name: string;
  symbol: string;
}

export type ICurrencies = Record<string, ICurrencyOption>;

export interface ICurrencyRate {
  date: string;
  base: string;
  rates: Record<string, number>;
}
