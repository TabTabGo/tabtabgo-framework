import { AppSettings } from './Appsettings';
import qs from 'qs';
import _ from 'lodash';
export const getImageUrl = (mediaFileId, imageSize = 'Provided') => {
    return `${AppSettings.baseApiUrl}/mediaFiles/Image/${mediaFileId}/${imageSize}`;
};
export const isEqual = (value, other) => {
    // Get the value type
    var type = Object.prototype.toString.call(value);
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other))
        return false;
    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0)
        return false;
    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen)
        return false;
    // Compare two items
    var compare = (item1, item2) => {
        // Get the object type
        var itemType = Object.prototype.toString.call(item1);
        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2))
                return false;
        }
        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2))
                return false;
            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString())
                    return false;
            }
            else {
                if (item1 !== item2)
                    return false;
            }
        }
    };
    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false)
                return false;
        }
    }
    else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false)
                    return false;
            }
        }
    }
    // If nothing failed, return true
    return true;
};
export const camelCase = (str) => {
    if (str && str.length > 1) {
        return str.slice(0, 1).toLowerCase() + str.slice(1);
    }
    return str;
};
export const parseDataUrl = (url) => {
    const regex = /data:([\w,/]+);(\w+),(.*)/g;
    let m = regex.exec(url);
    if (m) {
        return {
            mediaType: m[1],
            base64: m[2] === 'base64',
            data: m[3],
        };
    }
    return { data: url };
};
export const hexToRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 0, b: 0 };
};
export const getInputValue = (e) => {
    if (e && e.target) {
        //console.log('e.type', e.type);
        switch (e.target.type) {
            case 'radio':
                return e.target.value;
            case 'checkbox':
                return e.target.checked;
            default:
                return e.target.value;
        }
    }
    return e;
};
export const arrayUnique = (array, equalCompare) => {
    var a = array.concat();
    if (!equalCompare)
        equalCompare = (a, b) => isEqual(a, b);
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (equalCompare(a[i], a[j]))
                a.splice(j--, 1);
        }
    }
    return a;
};
export const getPropertyValue = (entity, propertyPath) => {
    if (entity && propertyPath) {
        let properties = propertyPath.split('.');
        let value = entity;
        properties.forEach((prop) => {
            value = value ? value[prop] : '';
        });
        return value;
    }
    return '';
};
export const getDisplayValue = (entity, displayField) => {
    if (displayField) {
        if (typeof displayField == 'function') {
            return displayField(entity);
        }
        else {
            return getPropertyValue(entity, displayField);
        }
    }
    else {
        return '';
    }
};
export const getPersonName = (entity) => {
    if (entity && entity.person && (entity.person.firstName || entity.person.lastName)) {
        return `${entity.person.title ? entity.person.title + ' ' : ''}${entity.person.firstName || ''} ${entity.person.lastName || ''}`;
    }
    return '';
};
export const getPersonInitials = (entity) => {
    if (entity && entity.person && entity.person.firstName && entity.person.lastName) {
        return `${entity.person.firstName
            .substring(0, 1)
            .toUpperCase()}${entity.person.lastName.substring(0, 1).toUpperCase()}`;
    }
    if (entity && entity.person && entity.person.displayName) {
        const names = entity.person.displayName.split(' ');
        if (names.length > 1) {
            return `${names[0].substring(0, 1).toUpperCase()}${names[names.length - 1]
                .substring(0, 1)
                .toUpperCase()}`;
        }
        if (names.length === 1) {
            return names[0].substring(0, 1).toUpperCase();
        }
    }
    return 'U';
};
/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object, base) {
    function changes(object, base) {
        return _.transform(object, function (result, value, key) {
            if (!_.isEqual(value, base[key])) {
                result[key] =
                    _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}
export function getToken(hash) {
    const regex = /token=(.+)$/gm;
    let group = regex.exec(hash);
    let token = null;
    if (group && group.length > 1) {
        token = group[1];
    }
    return token;
}
export function getSearchParams(query) {
    return qs.parse(query);
}
export function isEmpty(value) {
    if (_.isDate(value) && value)
        return false;
    if (typeof value === 'object' && _.isEmpty(value))
        return true;
    if (value === null || value === undefined || value === '')
        return true;
    return false;
}
export function populatePageList(result, map) {
    if ((result === null || result === void 0 ? void 0 : result.items) && result.items.length > 0) {
        return result.items.flatMap(map);
    }
    return [];
}
export const getFriendlyString = (word) => {
    var splitWords = word.split(/(?=[A-Z])/);
    let result = '';
    splitWords.forEach((word, index) => {
        if (index === 0) {
            result = word.charAt(0).toUpperCase() + word.slice(1);
        }
        else {
            result += word.toLowerCase();
        }
        if (index < splitWords.length - 1) {
            result += ' ';
        }
    });
    return result;
};
export const getUniqueId = (index) => {
    let date = new Date();
    let timestamp = date.getTime();
    let idNumber = timestamp;
    if (index) {
        idNumber += index;
    }
    return idNumber.toString(16);
};
export const getJsonPatchDocument = (originalValue, newValue, path) => {
    if (originalValue !== newValue) {
        if (newValue) {
            return {
                op: originalValue ? 'replace' : 'add',
                path: path,
                value: newValue,
            };
        }
        else {
            return {
                op: 'remove',
                path: path,
                value: undefined,
            };
        }
    }
    return null;
};
