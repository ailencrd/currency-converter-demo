import "./NumberInput.css";

const NumberInput = ({
  disabled,
  min,
  max,
  customClassName = "",
  ...props
}: {
  disabled: boolean;
  min?: string;
  max?: string;
  customClassName?: string;
}) => (
  <input
    className={`number-input ${customClassName}`}
    type="number"
    inputMode="decimal" // TODO ver si sirve de algo
    disabled={disabled}
    min={min}
    max={max}
    {...props}
  />
);
export default NumberInput;
