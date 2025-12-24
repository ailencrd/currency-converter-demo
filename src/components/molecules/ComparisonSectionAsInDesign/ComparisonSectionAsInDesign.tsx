import { useState } from "react";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import { getRateByCurrency } from "../../../services/currency.services";
import type { ICurrencyOption } from "../../../types/currency.types";
import { convertValue } from "../../../utils/convertValue";
import { formatAmount } from "../../../utils/formatAmount";
import SkeletonDiv from "../../atoms/Skeleton/Skeleton";
import "./ComparisonSectionAsInDesign.css";

const ComparisonSectionLoadingState = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <SkeletonDiv style={{ height: 77, width: "80%" }} />
    <SkeletonDiv style={{ height: 20, width: "60%" }} />
  </div>
);

const DetailText = ({
  referenceCurrency,
  secondaryCurrency,
}: {
  referenceCurrency: ICurrencyOption;
  secondaryCurrency: ICurrencyOption;
}) => {
  const [message, setMessage] = useState<string>("");

  const getCurrencyRateForDetail = () => {
    getRateByCurrency(referenceCurrency.symbol)
      .then((res) => {
        const value = convertValue(1, secondaryCurrency.symbol, res);
        setMessage(
          `1 ${referenceCurrency.symbol} = ${formatAmount(value, 6)} ${
            secondaryCurrency.symbol
          }`
        );
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("Unknown error", err);
        }
      });
  };

  getCurrencyRateForDetail();

  return <h2 className="detail">{message}</h2>;
};

const ComparisonSectionAsInDesign = () => {
  const { amountValue, to, secondaryCurrency, baseCurrency, isReady } =
    useCurrencyFormData();
  const { currencyRate, loading } = useCurrencyConverter();

  if (!isReady || !currencyRate || loading)
    return <ComparisonSectionLoadingState />;

  return (
    <div className="container">
      <h1 className="title">
        {formatAmount(amountValue)} {baseCurrency?.name} = <br />
        {formatAmount(convertValue(amountValue, to, currencyRate), 6)}{" "}
        {secondaryCurrency?.name}
      </h1>
      {baseCurrency && secondaryCurrency && (
        <DetailText
          referenceCurrency={secondaryCurrency}
          secondaryCurrency={baseCurrency}
        />
      )}
    </div>
  );
};

export default ComparisonSectionAsInDesign;
