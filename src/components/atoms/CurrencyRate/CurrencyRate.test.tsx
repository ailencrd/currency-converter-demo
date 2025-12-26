import { render, screen } from "@testing-library/react";
import CurrencyRate from "./CurrencyRate";

describe("CurrencyRate component", () => {
  const titleText = "USD/EUR";
  const detailText = "1 USD = 0.92 EUR";

  test("renders without crashing", () => {
    render(<CurrencyRate title={titleText} detail={detailText} />);
  });

  test("displays the title correctly", () => {
    render(<CurrencyRate title={titleText} detail={detailText} />);
    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
    expect(titleElement).toHaveClass("title");
  });

  test("displays the detail correctly", () => {
    render(<CurrencyRate title={titleText} detail={detailText} />);
    const detailElement = screen.getByText(detailText);
    expect(detailElement).toBeInTheDocument();
    expect(detailElement.tagName).toBe("H2");
    expect(detailElement).toHaveClass("detail");
  });

  test("renders ReactNode props correctly", () => {
    const complexTitle = <span>💵 USD/EUR</span>;
    const complexDetail = <strong>1 USD = 0.92 EUR</strong>;
    render(<CurrencyRate title={complexTitle} detail={complexDetail} />);

    expect(screen.getByText("💵 USD/EUR")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 0.92 EUR")).toBeInTheDocument();
  });

  test("container has the correct class", () => {
    render(<CurrencyRate title={titleText} detail={detailText} />);
    const container = screen.getByText(titleText).parentElement;
    expect(container).toHaveClass("container");
  });
});
