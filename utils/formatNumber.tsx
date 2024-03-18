export const parseLargeNumberUnit = (number: number) => {
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (number >= billion) {
    return formatNumberWithUnit(number, billion, "B");
  } else if (number >= million) {
    return formatNumberWithUnit(number, million, "M");
  } else if (number >= thousand) {
    return formatNumberWithUnit(number, thousand, "K");
  } else {
    return number.toString();
  }
};

const formatNumberWithUnit = (
  number: number,
  divisor: number,
  unit: string
) => {
  const unitPart = Math.floor(number / divisor);
  const remainder = number % divisor;
  return remainder === 0
    ? unitPart + unit
    : unitPart + "." + String(remainder)[0] + unit;
};
