import { render, screen } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import ConversionDetailAndDate from "./ConversionDetailAndDate";
import { useCurrencyFormData } from "../../../hooks/useCurrencyFormData";

vi.mock("../../../hooks/useCurrencyFormData");

const mockUseCurrencyFormData = useCurrencyFormData as Mock;

describe("ConversionDetailAndDate", () => {
  const baseCurrency = { name: "USD" };
  const secondaryCurrency = { name: "EUR" };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T14:30:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("does not render anything when isReady is false", () => {
    mockUseCurrencyFormData.mockReturnValue({
      isReady: false,
      baseCurrency: null,
      secondaryCurrency: null,
    });

    const { container } = render(<ConversionDetailAndDate />);

    expect(container.firstChild).toBeNull();
  });

  it("renders conversion detail with currencies and formatted date", () => {
    mockUseCurrencyFormData.mockReturnValue({
      isReady: true,
      baseCurrency,
      secondaryCurrency,
    });

    render(<ConversionDetailAndDate />);

    // monedas
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();

    // texto base
    expect(screen.getByText(/conversion - Last updated/i)).toBeInTheDocument();

    /**
     * No matcheamos el string completo de fecha porque:
     * - depende del timezone del entorno
     * - Intl.DateTimeFormat puede variar levemente
     */
    expect(
      screen.getByText(
        (content) => content.includes("Jan") && content.includes("2024")
      )
    ).toBeInTheDocument();
  });
});
