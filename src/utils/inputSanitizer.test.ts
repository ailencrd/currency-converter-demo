import { sanitizeNumericInput } from "./inputSanitizer";

describe("sanitizeNumerictInput", () => {
  const options = {
    maxIntegers: 5,
    maxDecimals: 2,
  };

  describe("valid inputs", () => {
    it("accepts integer values", () => {
      expect(sanitizeNumericInput("123", options)).toBe("123");
    });

    it("accepts decimal values", () => {
      expect(sanitizeNumericInput("123.45", options)).toBe("123.45");
    });

    it("accepts value with decimal point but no decimals", () => {
      expect(sanitizeNumericInput("123.", options)).toBe("123.");
    });

    it("accepts value starting with decimal point", () => {
      expect(sanitizeNumericInput(".5", options)).toBe(".5");
    });

    it("accepts empty string", () => {
      expect(sanitizeNumericInput("", options)).toBe("");
    });
  });

  describe("invalid numeric formats", () => {
    it("returns null for non-numeric strings", () => {
      expect(sanitizeNumericInput("abc", options)).toBeNull();
    });

    it("returns null for alphanumeric values", () => {
      expect(sanitizeNumericInput("12a", options)).toBeNull();
    });

    it("returns null for multiple dots", () => {
      expect(sanitizeNumericInput("12.3.4", options)).toBeNull();
    });

    it("returns null for special characters", () => {
      expect(sanitizeNumericInput("12,34", options)).toBeNull();
      expect(sanitizeNumericInput("12-34", options)).toBeNull();
    });
  });

  describe("integer and decimal limits", () => {
    it("returns null when integer part exceeds maxIntegers", () => {
      expect(
        sanitizeNumericInput("123456", options)
      ).toBeNull();
    });

    it("returns null when decimal part exceeds maxDecimals", () => {
      expect(
        sanitizeNumericInput("123.456", options)
      ).toBeNull();
    });

    it("allows integer part equal to maxIntegers", () => {
      expect(
        sanitizeNumericInput("12345", options)
      ).toBe("12345");
    });

    it("allows decimal part equal to maxDecimals", () => {
      expect(
        sanitizeNumericInput("12.34", options)
      ).toBe("12.34");
    });
  });
});
