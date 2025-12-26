import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import { convertValue } from "../../../utils/convertValue";
import { formatAmount } from "../../../utils/formatAmount";
import CurrencyRate from "../../atoms/CurrencyRate/CurrencyRate";
import CurrencyRateLoadingState from "../../atoms/CurrencyRateLoadingState";

const ComparisonSection = () => {
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
      detail={`1 ${baseCurrency.symbol} = ${formatAmount(
        convertValue(1, secondaryCurrency.symbol, currencyRate),
        6
      )} ${secondaryCurrency.symbol}`}
    />
  );
};

export default ComparisonSection;
