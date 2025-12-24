import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import "./MainTitle.css";

const MainTitle = () => {
  const { amountValue, from, to, currencyNames, isReady } =
    useCurrencyFormData();

  if (!isReady) return <div className="main-title-empty-state" />;

  const formattedAmount = amountValue > 0 ? amountValue.toString() : "";

  return (
    <span className="main-title">{`${formattedAmount} ${from} to ${to} - Convert 
              ${currencyNames.from} to ${currencyNames.to}`}</span>
  );
};
export default MainTitle;
