import moment from 'moment';
const date_format = 'DD/MM/YYYY';
const time_format = 'HH:mm:ss';
const date_time_format = `${date_format} ${time_format}`;
export const camel2title = (camelCase) => camelCase
    ? camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .replace(/_/g, () => ' ')
    : '';
export const durationFormat = (timeInSeconds) => {
    var sec_num = parseInt(timeInSeconds, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    var strHours = hours.toString();
    if (hours < 10) {
        strHours = '0' + hours;
    }
    var strMinutes = minutes.toString();
    if (minutes < 10) {
        strMinutes = '0' + minutes;
    }
    var strSeconds = seconds.toString();
    if (seconds < 10) {
        strSeconds = '0' + seconds;
    }
    return strHours + ':' + strMinutes + ':' + strSeconds;
};
//#region  Date Time format
export const datetimeFormat = (format) => (date) => {
    return date ? moment.parseZone(date).format(format || date_time_format) : '';
};
export const calculateDateTime = (timeSpan) => {
    if (timeSpan && typeof timeSpan === 'number') {
        var t = new Date();
        t.setSeconds(t.getSeconds() - timeSpan);
        return datetimeFormat()(t);
    }
    if (timeSpan && typeof timeSpan === 'string') {
        return datetimeFormat()(timeSpan);
    }
    return null;
};
export const calculateDateTimeInMilliseconds = (timeSpan) => {
    if (timeSpan && typeof timeSpan === 'number') {
        var t = new Date();
        t.setMilliseconds(t.getMilliseconds() - timeSpan);
        return datetimeFormat()(t);
    }
    if (timeSpan && typeof timeSpan === 'string') {
        return datetimeFormat()(timeSpan);
    }
    return null;
};
export const dateFormat = (date) => {
    return date ? moment.parseZone(date).format(date_format) : '';
};
export const timeFormat = (format) => (dateTime) => {
    return dateTime ? moment.parseZone(dateTime).format(format || time_format) : '';
};
export const timeStampFormat = (format) => (timestamp) => {
    if (timestamp) {
        var date = new Date(timestamp * 1000);
        return timeFormat(format)(date);
    }
    return timestamp;
};
export const toDateTimeObject = (date) => {
    return {
        date: moment(date).format('DD/MM/YYYY'),
        time: moment(date).format('HH:mm:00'),
    };
};
export const dateTimeObjectToMoment = (dateTimeObj) => {
    if (dateTimeObj)
        return moment(moment(dateTimeObj.date).format('DD/MM/YYYY') + 'T' + dateTimeObj.time);
    return null;
};
export const today = () => moment().format(date_format);
//#endregion
