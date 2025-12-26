import { convertValue } from "./convertValue";
import type { ICurrencyRate } from "../types/currency.types";

describe("convertValue", () => {
  const mockCurrencyRate: ICurrencyRate = {
    base: "USD",
    date: '07-12-2025',
    rates: {
      EUR: 0.9,
      ARS: 850,
      USD: 1,
    },
  };

  it("returns 0 when value is 0", () => {
    const result = convertValue(0, "EUR", mockCurrencyRate);
    expect(result).toBe(0);
  });

  it("returns 0 when 'to' is empty", () => {
    const result = convertValue(100, "", mockCurrencyRate);
    expect(result).toBe(0);
  });

  it("converts value using the correct rate", () => {
    const result = convertValue(100, "EUR", mockCurrencyRate);
    expect(result).toBe(90);
  });

  it("returns the same value when converting to base currency", () => {
    const result = convertValue(50, "USD", mockCurrencyRate);
    expect(result).toBe(50);
  });

  it("handles decimal values correctly", () => {
    const result = convertValue(12.5, "EUR", mockCurrencyRate);
    expect(result).toBeCloseTo(11.25);
  });

  it("returns NaN when rate does not exist", () => {
    const result = convertValue(100, "GBP", mockCurrencyRate);
    expect(result).toBeNaN();
  });
});
