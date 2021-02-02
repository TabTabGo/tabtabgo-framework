import { getPropertyValue } from './Utilities';
import { AppSettings } from './Appsettings';

export const camel2title = (camelCase?: string) =>
  camelCase
    ? camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .replace(/_/g, () => ' ')
    : '';

export const numberFormat = (locale?: string, decimalFixed?: number) => (value: any) => {
  if (!locale) locale = AppSettings.defaultLocale || 'en-US';
  if (decimalFixed === undefined) decimalFixed = AppSettings.decimalFixed || 2;

  return Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: decimalFixed,
  }).format(value);
};

//TODO support local format
export const amountFormat = (currency?: string, locale?: string, decimalFixed?: number) => (
  amount: string | number,
) => {
  if (!currency) currency = AppSettings.defaultCurrency || '$';
  if (!locale) locale = AppSettings.defaultLocale || 'en-US';
  if (!decimalFixed) decimalFixed = AppSettings.decimalFixed || 2;

  var value = parseFloat(amount.toString()).toFixed(decimalFixed);

  return (
    Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(Number(value)) + ` ${currency}`
  );
};

export const phoneNumberFormat = (phoneNumber: number) => {
  return phoneNumber;
};

export const genderFormat = (value: any, defaultValue: string) => {
  if (value === 'm' || value === 'male' || value === 1 || value === true) return 'Male';
  if (value === 'f' || value === 'female' || value === 0 || value === false) return 'Female';
  if (value === 'n') return 'Prefer not to say';
  return defaultValue || 'Not specified';
};

export const arrayFormat = (array: Array<any>, displayField: any, separator = ', ') => {
  if (array && Array.isArray(array)) {
    var displays =
      typeof displayField === 'function'
        ? array.map((a) => displayField(a))
        : array.map((a) => getPropertyValue(a, displayField));
    return displays.join(separator);
  }
  return '';
};
