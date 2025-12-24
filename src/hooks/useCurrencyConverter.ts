import { useFormContext } from "react-hook-form";
import {
  useCurrenciesQuery,
  useCurrencyRateQuery,
} from "../queries/currency.queries";
import type { Inputs } from "../types/form.types";

export const useCurrencyConverter = () => {
  const { watch } = useFormContext<Inputs>();
  const base = watch("from");

  const currenciesQuery = useCurrenciesQuery();
  const rateQuery = useCurrencyRateQuery(base);

  return {
    currencyOptions: currenciesQuery.data
      ? Object.values(currenciesQuery.data)
      : [],
    currencyRate: rateQuery.data,
    loading: currenciesQuery.isLoading || rateQuery.isLoading,
    error: currenciesQuery.error ?? rateQuery.error,
  };
};
