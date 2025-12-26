/**
 * sanitizeNumericInput
 * -------------------
 * Valida y sanitiza un valor numérico ingresado como string.
 *
 * Reglas de validación:
 * 1. Permite un string vacío "".
 * 2. Debe ser un número válido; de lo contrario devuelve null.
 * 3. Solo se permiten dígitos y un único punto decimal.
 * 4. La parte entera no puede superar `maxIntegers` dígitos.
 * 5. La parte decimal no puede superar `maxDecimals` dígitos.
 *
 * Parámetros:
 * @param value - El valor ingresado como string.
 * @param options - Objeto con límites:
 *    - maxIntegers: número máximo de dígitos en la parte entera.
 *    - maxDecimals: número máximo de dígitos en la parte decimal.
 *
 * Retorno:
 * - Devuelve el valor original si es válido.
 * - Devuelve null si el valor es inválido.
 *
 * Ejemplos:
 * sanitizeNumericInput("123.45", { maxIntegers: 5, maxDecimals: 2 }) // "123.45"
 * sanitizeNumericInput("123.456", { maxIntegers: 5, maxDecimals: 2 }) // null
 * sanitizeNumericInput("abc", { maxIntegers: 5, maxDecimals: 2 }) // null
 */

export const sanitizeNumericInput = (
  value: string,
  { maxIntegers, maxDecimals }: { maxIntegers: number; maxDecimals: number }
): string | null => {
  if (value === "") return value;
  
  if (isNaN(Number(value))) return null;

  // solo números y punto
  for (const char of value) {
    if (!"0123456789.".includes(char)) return null;
  }

  // un solo punto
  if (value.split(".").length > 2) {
    return null;
  }

  const dotIndex = value.indexOf(".");
  const integerPart = dotIndex === -1 ? value : value.slice(0, dotIndex);
  const decimalPart = dotIndex === -1 ? "" : value.slice(dotIndex + 1);

  if (integerPart.length > maxIntegers) return null;
  if (decimalPart.length > maxDecimals) return null;

  return value;
};
