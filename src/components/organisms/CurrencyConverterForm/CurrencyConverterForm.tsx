import { useFormContext } from "react-hook-form";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import CurrencySwapButton from "../../atoms/CurrencySwapButton/CurrencySwapButton";
import NumberInputField from "../../molecules/NumberInputField/NumberInputField";
import SelectInputField from "../../molecules/SelectInputField/SelectInputField";
import "./CurrencyConverterForm.css";
import type { Inputs } from "../../../types/form.types";

const CurrencyConverterForm = () => {
  const { setValue, control, getValues } = useFormContext<Inputs>();
  const { currencyOptions, loading, error } = useCurrencyConverter();

  const to = getValues("to");
  const from = getValues("from");
  const disabled = loading || !currencyOptions.length;

  const swapCurrencies = () => {
    setValue("from", to);
    setValue("to", from);
  };

  return (
    <form className="fields-container">
      <NumberInputField
        fieldName="value"
        control={control}
        label="Amount"
        disabled={disabled || error !== null}
      />
      <SelectInputField
        label="From"
        fieldName="from"
        control={control}
        disabled={disabled}
        options={currencyOptions}
      />
      <CurrencySwapButton handleOnClick={swapCurrencies} disabled={disabled || error !== null} />
      <SelectInputField
        label="To"
        fieldName="to"
        control={control}
        disabled={disabled}
        options={currencyOptions}
      />
    </form>
  );
};

export default CurrencyConverterForm;
