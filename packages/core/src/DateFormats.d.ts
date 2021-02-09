import moment from 'moment';
export declare const camel2title: (camelCase?: string) => string;
export declare const durationFormat: (timeInSeconds: string) => string;
export declare const datetimeFormat: (format?: string) => (date: Date | string) => string;
export declare const calculateDateTime: (timeSpan?: number | string) => string;
export declare const calculateDateTimeInMilliseconds: (timeSpan?: number | string) => string;
export declare const dateFormat: (date?: Date | string) => string;
export declare const timeFormat: (format?: string) => (dateTime: Date | string) => string;
export declare const timeStampFormat: (format?: string) => (timestamp?: number) => string | number;
export declare const toDateTimeObject: (date?: Date | string) => {
    date: string;
    time: string;
};
export declare const dateTimeObjectToMoment: (dateTimeObj?: any) => moment.Moment;
export declare const today: () => string;
