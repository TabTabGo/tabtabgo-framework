export declare const camel2title: (camelCase?: string) => string;
export declare const numberFormat: (locale?: string, decimalFixed?: number) => (value: any) => string;
export declare const amountFormat: (currency?: string, locale?: string, decimalFixed?: number) => (amount: string | number) => string;
export declare const phoneNumberFormat: (phoneNumber: number) => number;
export declare const genderFormat: (value: any, defaultValue: string) => string;
export declare const arrayFormat: (array: Array<any>, displayField: any, separator?: string) => string;
