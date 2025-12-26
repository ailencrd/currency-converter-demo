import { formatAmount } from "./formatAmount";

describe("formatAmount", () => {
  it("formats integer values with two decimals by default", () => {
    const result = formatAmount(10);
    expect(result).toBe("10.00");
  });

  it("keeps two decimals when value has decimals by default", () => {
    const result = formatAmount(10.5);
    expect(result).toBe("10.50");
  });

  it("formats using custom decimals when decimal part is not zero", () => {
    const result = formatAmount(10.1234, 3);
    expect(result).toBe("10.123");
  });

  it("forces two decimals when decimal part is zero even with custom decimals", () => {
    const result = formatAmount(10, 4);
    expect(result).toBe("10.00");
  });

  it("rounds correctly based on decimals", () => {
    const result = formatAmount(10.129, 2);
    expect(result).toBe("10.13");
  });

  it("handles values that result in zero decimal part after rounding", () => {
    const result = formatAmount(10.999, 2);
    expect(result).toBe("11.00");
  });

  it("handles small decimal values correctly", () => {
    const result = formatAmount(0.1 + 0.2, 2);
    expect(result).toBe("0.30");
  });
});
