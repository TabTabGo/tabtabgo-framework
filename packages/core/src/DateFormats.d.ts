import moment from 'moment';
export declare const camel2title: (camelCase?: string | undefined) => string;
export declare const durationFormat: (timeInSeconds: string) => string;
export declare const datetimeFormat: (format?: string | undefined) => (date: Date | string) => string;
export declare const calculateDateTime: (timeSpan?: string | number | undefined) => string | null;
export declare const calculateDateTimeInMilliseconds: (timeSpan?: string | number | undefined) => string | null;
export declare const dateFormat: (date?: string | Date | undefined) => string;
export declare const timeFormat: (format?: string | undefined) => (dateTime: Date | string) => string;
export declare const timeStampFormat: (format?: string | undefined) => (timestamp?: number | undefined) => string | number | undefined;
export declare const toDateTimeObject: (date?: string | Date | undefined) => {
    date: string;
    time: string;
};
export declare const dateTimeObjectToMoment: (dateTimeObj?: any) => moment.Moment | null;
export declare const today: () => string;
