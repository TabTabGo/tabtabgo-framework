import * as ReactI18n from 'react-i18next';
import { AppSettings } from '../Appsettings';
export const useTranslation = (namespaces?: Array<string>) => {
  return ReactI18n.useTranslation(namespaces ?? AppSettings.translationNamespaces);
};
