import { DOLLAR_STRING_FORMAT } from "./constants";

declare global {
  interface String {
    format(...replacements: string[]): string;
  }
}

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
      ;
  });
};

const formatMoney = (number: number | null): string => {
  const roundedNumber = number ? Number(number?.toFixed(2)) : 0;
  return DOLLAR_STRING_FORMAT.format(roundedNumber?.toString())
}

export { formatMoney };