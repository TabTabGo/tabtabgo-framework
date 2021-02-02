import { isEmpty } from './Utilities';
import moment from 'moment';
const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const required = (value?: any) => {
  if (isEmpty(value)) {
    return false;
  }
  return true;
};
export const regex = (rex: RegExp, value: string) => rex.test(value);

export const ip = (value: string) => {
  const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm;
  return regex(ipRegex, value);
};
// function to validate email
export const email = (value: string) => {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex(emailRex, value);
};

export const isTodayAndAfter = (value?: Date | string) => {
  if (!value) return false;
  var today = new Date().setHours(0, 0, 0, 0);
  var valueDate = moment(value).toDate().setHours(0, 0, 0, 0);
  return valueDate >= today;
};

export const isAfterToday = (value?: Date | string) => {
  if (!value) return false;
  var today = new Date().setHours(0, 0, 0, 0);
  var valueDate = moment(value).toDate().setHours(0, 0, 0, 0);
  return valueDate > today;
};
// function that verifies if a string has a length less than or equal length
export const maxLength = (length: number, value?: string) => {
  if (value && value.length <= length) {
    return true;
  }
  return false;
};
// function that verifies if a string has a length more than or equal length
export const minLength = (length: number, value?: string) => {
  if (value && value.length >= length) {
    return true;
  }
  return false;
};
// function that verifies if value are equal in length
export const equalLength = (length: number, value?: string) => {
  if (value && value.length === Number(length)) {
    return true;
  }
  return false;
};

export const maxValue = (length: number, value?: any) => {
  if (isNumber(value) && Number(value) <= length) {
    return true;
  }
  return false;
};
// function that verifies if a string has a length more than or equal length
export const minValue = (length: number, value?: any) => {
  if (isNumber(value) && Number(value) >= length) {
    return true;
  }
  return false;
};
// function that verifies if value are equal in length
export const equalValue = (length: number, value?: any) => {
  if (isNumber(value) && Number(value) === length) {
    return true;
  }
  return false;
};

export const range = (lengths = [0, -1], value: string) => {
  if (lengths.length !== 2) {
    // eslint-disable-next-line no-console
    console.error('Lengths should be an array of two items [minLength, maxLength]');
  }
  if (value && value.length <= lengths[0] && value.length >= lengths[1]) {
    return true;
  }
  return false;
};
// function that verifies if two strings are equal
export const equalTo = (string1: any, value: any) => {
  var stringValue;
  if (typeof string1 === 'function') {
    stringValue = string1();
  } else {
    stringValue = string1;
  }
  if (value === stringValue) {
    return true;
  }
  return false;
};
// function that verifies if value contains only numbers
export const number = (value: any) => {
  var numberRex = new RegExp('^[0-9]+$');
  if (numberRex.test(value)) {
    return true;
  }
  return false;
};
// verifies if value is a valid URL
export const url = (enabled: boolean, value: string) => {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
};
