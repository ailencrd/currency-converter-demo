import { Controller, type FieldValues } from "react-hook-form";
import type { INumberInputFieldProps } from "../../../types/form.types";
import FieldErrorMessage from "../../atoms/FieldErrorMessage/FieldErrorMessage";
import FormFieldContainer from "../../atoms/FormFieldContainer/FormFieldContainer";
import Label from "../../atoms/Label/Label";
import "./NumberInputField.css";
import { sanitizeNumericInput } from "../../../utils/inputSanitizer";

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
          <input
            {...field}
            disabled={disabled}
            inputMode="decimal"
            className="number-input"
            onChange={(e) => {
              const nextValue = sanitizeNumericInput(e.target.value, {
                maxIntegers: 15,
                maxDecimals: 2,
              });

              if (nextValue !== null) {
                field.onChange(nextValue);
              }
            }}
          />
        </div>
        {error?.message && <FieldErrorMessage message={error.message} />}
      </FormFieldContainer>
    )}
  />
);

export default NumberInputField;
