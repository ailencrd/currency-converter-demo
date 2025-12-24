import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useCurrencyConverter } from "./useCurrencyConverter";
import type { Inputs, IUseCurrencyFormDataResult } from "../types/form.types";

export const useCurrencyFormData = (): IUseCurrencyFormDataResult => {
  const { currencyOptions, currencyRate } = useCurrencyConverter();
  const { watch } = useFormContext<Inputs>();

  const amountValue = watch("value");
  const from = watch("from");
  const to = watch("to");

  const baseCurrency = useMemo(
    () => currencyOptions.find((option) => option.symbol === from),
    [currencyOptions, from]
  );

  const secondaryCurrency = useMemo(
    () => currencyOptions.find((option) => option.symbol === to),
    [currencyOptions, to]
  );

  const isReady = Boolean(currencyOptions.length && currencyRate);

  return {
    amountValue: Number(amountValue),
    from,
    to,
    baseCurrency,
    secondaryCurrency,
    currencyNames: {
      from: baseCurrency?.name ?? "",
      to: secondaryCurrency?.name ?? "",
    },
    isReady,
  };
};
