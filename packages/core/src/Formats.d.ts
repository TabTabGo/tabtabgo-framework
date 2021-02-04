export declare const camel2title: (camelCase?: string | undefined) => string;
export declare const numberFormat: (locale?: string | undefined, decimalFixed?: number | undefined) => (value: any) => string;
export declare const amountFormat: (currency?: string | undefined, locale?: string | undefined, decimalFixed?: number | undefined) => (amount: string | number) => string;
export declare const phoneNumberFormat: (phoneNumber: number) => number;
export declare const genderFormat: (value: any, defaultValue: string) => string;
export declare const arrayFormat: (array: Array<any>, displayField: any, separator?: string) => string;
