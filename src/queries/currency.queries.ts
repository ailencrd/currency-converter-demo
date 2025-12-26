import { useQuery } from "@tanstack/react-query";
import {
  getCurrencies,
  getRateByCurrency,
} from "../services/currency.services";

export const useCurrenciesQuery = () =>
  useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useCurrencyRateQuery = (base: string) =>
  useQuery({
    queryKey: ["currency-rate", base],
    queryFn: () => getRateByCurrency(base),
    enabled: !!base,
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
