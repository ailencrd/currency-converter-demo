import { useState } from "react";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import { getRateByCurrency } from "../../../services/currency.services";
import type { ICurrencyOption } from "../../../types/currency.types";
import { convertValue } from "../../../utils/convertValue";
import { formatAmount } from "../../../utils/formatAmount";
import CurrencyRate from "../../atoms/CurrencyRate/CurrencyRate";
import CurrencyRateLoadingState from "../../atoms/CurrencyRateLoadingState";
import "./ComparisonSectionAsInDesign.css";

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
  const { amountValue, to, secondaryCurrency, baseCurrency } =
    useCurrencyFormData();
  const { currencyRate, loading } = useCurrencyConverter();

  if (!currencyRate || !baseCurrency || !secondaryCurrency || loading)
    return <CurrencyRateLoadingState />;

  // Algunas monedas presentes en currencyOptions no están en los rates, por eso se agrega esta validación
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (currencyRate.rates[to] === undefined)
    return (
      <CurrencyRate
        title="Conversión inválida"
        detail="Las monedas que estás intentando comparar no tienen relación, por
          favor intentá con otras monedas"
      />
    );

  if (amountValue < 1)
    return (
      <CurrencyRate
        title={
          <>
            {baseCurrency.name} to {secondaryCurrency.name}
          </>
        }
        detail="Ingresa un número válido para convertirlo a la moneda solicitada"
      />
    );

  return (
    <CurrencyRate
      title={
        <>
          {formatAmount(amountValue)} {baseCurrency.name} = <br />
          {formatAmount(convertValue(amountValue, to, currencyRate), 6)}{" "}
          {secondaryCurrency.name}
        </>
      }
      detail={
        <DetailText
          referenceCurrency={secondaryCurrency}
          secondaryCurrency={baseCurrency}
        />
      }
    />
  );
};

export default ComparisonSectionAsInDesign;
