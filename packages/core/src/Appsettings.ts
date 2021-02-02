const config: any = require('appsettings.json');
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
let envSettings: any = {};
if (process.env.NODE_ENV) {
  envSettings = config[process.env.NODE_ENV];
}
export const AppSettings = { ...config['default'], ...envSettings } as ISettings;
