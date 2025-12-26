import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import ComparisonSection from "./ComparisonSection";

// hooks
import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";

// utils
import { convertValue } from "../../../utils/convertValue";
import { formatAmount } from "../../../utils/formatAmount";

// mocks
vi.mock("../../../hooks/useCurrencyFormData");
vi.mock("../../../hooks/useCurrencyConverter");
vi.mock("../../../utils/convertValue");
vi.mock("../../../utils/formatAmount");
vi.mock("../../atoms/CurrencyRateLoadingState", () => ({
  default: () => <div data-testid="loading-state" />,
}));

const mockUseCurrencyFormData = useCurrencyFormData as Mock;
const mockUseCurrencyConverter = useCurrencyConverter as Mock;
const mockConvertValue = convertValue as Mock;
const mockFormatAmount = formatAmount as Mock;

describe("ComparisonSection", () => {
  const baseCurrency = { name: "USD", symbol: "USD" };
  const secondaryCurrency = { name: "EUR", symbol: "EUR" };

  const currencyRate = {
    base: "USD",
    rates: {
      EUR: 0.9,
      USD: 1,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when data is not ready", () => {
    mockUseCurrencyFormData.mockReturnValue({
      amountValue: 0,
      to: "EUR",
      baseCurrency: null,
      secondaryCurrency: null,
    });

    mockUseCurrencyConverter.mockReturnValue({
      currencyRate: null,
      loading: true,
    });

    render(<ComparisonSection />);

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("renders invalid conversion message when rate does not exist", () => {
    mockUseCurrencyFormData.mockReturnValue({
      amountValue: 10,
      to: "GBP",
      baseCurrency,
      secondaryCurrency,
    });

    mockUseCurrencyConverter.mockReturnValue({
      currencyRate: {
        ...currencyRate,
        rates: {},
      },
      loading: false,
    });

    render(<ComparisonSection />);

    expect(screen.getByText("Conversión inválida")).toBeInTheDocument();
  });

  it("renders message when amountValue is less than 1", () => {
    mockUseCurrencyFormData.mockReturnValue({
      amountValue: 0.5,
      to: "EUR",
      baseCurrency,
      secondaryCurrency,
    });

    mockUseCurrencyConverter.mockReturnValue({
      currencyRate,
      loading: false,
    });

    render(<ComparisonSection />);

    expect(
      screen.getByText(
        "Ingresa un número válido para convertirlo a la moneda solicitada"
      )
    ).toBeInTheDocument();
  });

  it("renders converted values correctly when all data is valid", () => {
    mockUseCurrencyFormData.mockReturnValue({
      amountValue: 10,
      to: "EUR",
      baseCurrency,
      secondaryCurrency,
    });

    mockUseCurrencyConverter.mockReturnValue({
      currencyRate,
      loading: false,
    });

    mockConvertValue
      .mockReturnValueOnce(9) // 10 USD → EUR
      .mockReturnValueOnce(0.9); // 1 USD → EUR

    mockFormatAmount.mockImplementation((value: number) => value.toString());

    render(<ComparisonSection />);

    expect(screen.getByText(/10 USD = 9 EUR/)).toBeInTheDocument();
    expect(screen.getByText("1 USD = 0.9 EUR")).toBeInTheDocument();
  });
});
