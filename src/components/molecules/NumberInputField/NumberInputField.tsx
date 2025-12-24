import { Controller, type FieldValues } from "react-hook-form";
import type { INumberInputFieldProps } from "../../../types/form.types";
import FieldErrorMessage from "../../atoms/FieldErrorMessage/FieldErrorMessage";
import FormFieldContainer from "../../atoms/FormFieldContainer/FormFieldContainer";
import Label from "../../atoms/Label/Label";
import NumberInput from "../../atoms/NumberInput/NumberInput";
import "./NumberInputField.css";

const NumberInputField = <T extends FieldValues = FieldValues>({
  disabled,
  control,
  fieldName,
  label,
}: INumberInputFieldProps<T>) => (
  <Controller
    name={fieldName}
    control={control}
    rules={{
      required: "El campo es requerido.",
      validate: {
        positive: (v) => v > 0 || "El valor debe ser mayor a 0.",
      },
    }}
    render={({ field, fieldState: { error } }) => (
      <FormFieldContainer>
        <Label htmlFor={fieldName} text={label} />
        <div className="currency-input-wrapper">
          <span className="input-prefix">$</span>
          <NumberInput
            {...field}
            disabled={disabled}
            min="0"
            max="100000000"
            customClassName="currency-input"
          />
        </div>
        {error?.message && <FieldErrorMessage message={error.message} />}
      </FormFieldContainer>
    )}
  />
);

export default NumberInputField;
