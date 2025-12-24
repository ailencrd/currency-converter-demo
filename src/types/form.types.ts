import type { FieldValues, Path, Control } from "react-hook-form";
import type { ICurrencyOption } from "./currency.types";

export interface Inputs {
  value: string;
  from: string;
  to: string;
}

export interface ICurrencyNames {
  from: string;
  to: string;
}

export interface IUseCurrencyFormDataResult {
  amountValue: number;
  from: string;
  to: string;
  currencyNames: ICurrencyNames;
  baseCurrency: ICurrencyOption | undefined;
  secondaryCurrency: ICurrencyOption | undefined;
  isReady: boolean;
}

export interface INumberInputFieldProps<T extends FieldValues = FieldValues> {
  disabled: boolean;
  label: string;
  fieldName: Path<T>;
  control: Control<T>;
}

export interface ISelectInputFieldProps<T extends FieldValues = FieldValues> {
  disabled: boolean;
  label: string;
  fieldName: Path<T>;
  control: Control<T>;
  options: ICurrencyOption[];
}
