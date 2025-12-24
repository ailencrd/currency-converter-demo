import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import { convertValue } from "../../../utils/convertValue";
import { formatAmount } from "../../../utils/formatAmount";
import SkeletonDiv from "../../atoms/Skeleton/Skeleton";
import "./ComparisonSection.css";

const ComparisonSectionLoadingState = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <SkeletonDiv style={{ height: 77, width: "80%" }} />
    <SkeletonDiv style={{ height: 20, width: "60%" }} />
  </div>
);

const ComparisonSection = () => {
  const { amountValue, to, secondaryCurrency, baseCurrency } =
    useCurrencyFormData();
  const { currencyRate, loading } = useCurrencyConverter();

  if (!currencyRate || !baseCurrency || !secondaryCurrency || loading)
    return <ComparisonSectionLoadingState />;

  return (
    <div className="container">
      <h1 className="title">
        {formatAmount(amountValue)} {baseCurrency.name} = <br />
        {formatAmount(convertValue(amountValue, to, currencyRate), 6)}{" "}
        {secondaryCurrency.name}
      </h1>
      <h2 className="detail">{`1 ${baseCurrency.symbol} = ${formatAmount(
        convertValue(1, secondaryCurrency.symbol, currencyRate),
        6
      )} ${secondaryCurrency.symbol}`}</h2>
    </div>
  );
};

export default ComparisonSection;
