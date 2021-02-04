export interface ISettings {
    baseApiUrl?: string;
    basename?: string;
    excludeCredential: boolean;
    allowRefreshToken: true;
    translationNamespaces?: Array<string>;
    defaultCurrency?: string;
    defaultLocale?: string;
    decimalFixed?: number;
    defaultDateFormat?: string;
    [key: string]: any;
}
export declare const AppSettings: ISettings;
