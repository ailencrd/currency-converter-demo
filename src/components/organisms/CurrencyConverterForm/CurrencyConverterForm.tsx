import { useFormContext } from "react-hook-form";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import CurrencySwapButton from "../../atoms/CurrencySwapButton/CurrencySwapButton";
import NumberInputField from "../../molecules/NumberInputField/NumberInputField";
import SelectInputField from "../../molecules/SelectInputField/SelectInputField";
import "./CurrencyConverterForm.css";
import type { Inputs } from "../../../types/form.types";

const CurrencyConverterForm = () => {
  const { setValue, control, getValues } = useFormContext<Inputs>();
  const { currencyOptions, loading } = useCurrencyConverter();

  const to = getValues("to");
  const from = getValues("from");

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
        disabled={loading}
      />
      <SelectInputField
        label="From"
        fieldName="from"
        control={control}
        disabled={loading}
        options={currencyOptions}
      />
      <CurrencySwapButton handleOnClick={swapCurrencies} disabled={loading} />
      <SelectInputField
        label="To"
        fieldName="to"
        control={control}
        disabled={loading}
        options={currencyOptions}
      />
    </form>
  );
};

export default CurrencyConverterForm;
