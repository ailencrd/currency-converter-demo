import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ICurrencies, ICurrencyRate } from "../types/currency.types";

const getMock = vi.hoisted(() => vi.fn());

vi.mock("./httpClient", () => {
  return {
    HttpClient: vi.fn(function () {
      return {
        get: getMock,
      };
    }),
  };
});

import { getCurrencies, getRateByCurrency } from "./currency.services";


describe("currency services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getCurrencies calls client.get with the correct path", async () => {
    const mockResponse: ICurrencies = {
      USD: { name: "United States Dollar", symbol: "$" },
      EUR: { name: "Euro", symbol: "€" },
    };

    getMock.mockResolvedValueOnce(mockResponse);

    const result = await getCurrencies();

    expect(getMock).toHaveBeenCalledWith("/currencies");
    expect(result).toEqual(mockResponse);
  });

  it("getRateByCurrency calls client.get with the correct base currency", async () => {
    const mockResponse: ICurrencyRate = {
      base: "USD",
      date: '12-03-2023',
      rates: {
        EUR: 0.9,
        ARS: 850,
      },
    };

    getMock.mockResolvedValueOnce(mockResponse);

    const result = await getRateByCurrency("USD");

    expect(getMock).toHaveBeenCalledWith("/rates?base=USD");
    expect(result).toEqual(mockResponse);
  });

  it("propagates errors thrown by HttpClient", async () => {
    const error = new Error("Network error");

    getMock.mockRejectedValueOnce(error);

    await expect(getCurrencies()).rejects.toThrow("Network error");
  });
});
