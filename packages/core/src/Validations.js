import { isEmpty } from './Utilities';
import moment from 'moment';
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
export const required = (value) => {
    if (isEmpty(value)) {
        return false;
    }
    return true;
};
export const regex = (rex, value) => rex.test(value);
export const ip = (value) => {
    const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm;
    return regex(ipRegex, value);
};
// function to validate email
export const email = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex(emailRex, value);
};
export const isTodayAndAfter = (value) => {
    if (!value)
        return false;
    var today = new Date().setHours(0, 0, 0, 0);
    var valueDate = moment(value).toDate().setHours(0, 0, 0, 0);
    return valueDate >= today;
};
export const isAfterToday = (value) => {
    if (!value)
        return false;
    var today = new Date().setHours(0, 0, 0, 0);
    var valueDate = moment(value).toDate().setHours(0, 0, 0, 0);
    return valueDate > today;
};
// function that verifies if a string has a length less than or equal length
export const maxLength = (length, value) => {
    if (value && value.length <= length) {
        return true;
    }
    return false;
};
// function that verifies if a string has a length more than or equal length
export const minLength = (length, value) => {
    if (value && value.length >= length) {
        return true;
    }
    return false;
};
// function that verifies if value are equal in length
export const equalLength = (length, value) => {
    if (value && value.length === Number(length)) {
        return true;
    }
    return false;
};
export const maxValue = (length, value) => {
    if (isNumber(value) && Number(value) <= length) {
        return true;
    }
    return false;
};
// function that verifies if a string has a length more than or equal length
export const minValue = (length, value) => {
    if (isNumber(value) && Number(value) >= length) {
        return true;
    }
    return false;
};
// function that verifies if value are equal in length
export const equalValue = (length, value) => {
    if (isNumber(value) && Number(value) === length) {
        return true;
    }
    return false;
};
export const range = (lengths = [0, -1], value) => {
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
export const equalTo = (string1, value) => {
    var stringValue;
    if (typeof string1 === 'function') {
        stringValue = string1();
    }
    else {
        stringValue = string1;
    }
    if (value === stringValue) {
        return true;
    }
    return false;
};
// function that verifies if value contains only numbers
export const number = (value) => {
    var numberRex = new RegExp('^[0-9]+$');
    if (numberRex.test(value)) {
        return true;
    }
    return false;
};
// verifies if value is a valid URL
export const url = (enabled, value) => {
    try {
        new URL(value);
        return true;
    }
    catch (_) {
        return false;
    }
};
