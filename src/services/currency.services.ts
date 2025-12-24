// currency.services.ts
import type { ICurrencies, ICurrencyRate } from "../types/currency.types";
import { HttpClient } from "./httpClient";

const client = new HttpClient("https://api.vatcomply.com");

export const getCurrencies = (): Promise<ICurrencies> =>
  client.get("/currencies");

export const getRateByCurrency = (currency: string): Promise<ICurrencyRate> =>
  client.get(`/rates?base=${currency}`);
