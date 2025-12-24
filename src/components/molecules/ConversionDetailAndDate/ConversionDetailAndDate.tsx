import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import "./ConversionDetailAndDate.css";

const ConversionDetailAndDate = () => {
  const { isReady, baseCurrency, secondaryCurrency } = useCurrencyFormData();

  if (!isReady) return;

  const now = new Date();

  const formatted = new Intl.DateTimeFormat("en-AR", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    // timeZone: "UTC",
    timeZoneName: "short",
  }).format(now);

  return (
    <span className="conversion-and-detail">
      <span className="underline-text">{baseCurrency?.name}</span> to{" "}
      <span className="underline-text">{secondaryCurrency?.name}</span>{" "}
      conversion - Last updated {formatted}
    </span>
  );
};
export default ConversionDetailAndDate;
