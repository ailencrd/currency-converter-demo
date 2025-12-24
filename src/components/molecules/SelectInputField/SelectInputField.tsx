import { Controller, type FieldValues } from "react-hook-form";
import type { ISelectInputFieldProps } from "../../../types/form.types";
import FormFieldContainer from "../../atoms/FormFieldContainer/FormFieldContainer";
import Label from "../../atoms/Label/Label";
import "./SelectInputField.css";

const SelectInputField = <T extends FieldValues = FieldValues>({
  disabled,
  control,
  fieldName,
  label,
  options,
}: ISelectInputFieldProps<T>) => (
  <Controller
    name={fieldName}
    control={control}
    render={({ field }) => (
      <FormFieldContainer>
        <Label htmlFor={fieldName} text={label} />
        <div className="select-wrapper">
          <select {...field} className="select" disabled={disabled}>
            {options.map((option) => (
              <option key={option.symbol} value={option.symbol}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </FormFieldContainer>
    )}
  />
);
export default SelectInputField;
