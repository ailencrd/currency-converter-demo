import "./CurrencySwapButton.css";
const CurrencySwapButton = ({
  disabled,
  handleOnClick,
}: {
  handleOnClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={handleOnClick}
    disabled={disabled}
    className="currency-swap-button material-symbols-outlined"
    type="button"
  >
    currency_exchange
  </button>
);
export default CurrencySwapButton;
