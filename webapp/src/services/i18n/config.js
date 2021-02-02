export const fallback = 'en';

//import("moment/locale/ar")

export const supportedLocales = {
  en: {
    name: 'English',
    translationFileLoader: () => require('../../../assets/locales/en.json'),

    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve(),
  },
  da: {
    name: 'Danish',
    translationFileLoader: () => require('../../../assets/locales/da.json'),
    momentLocaleLoader: () => Promise.resolve(() => moment.locale('da')),
  },
};

export const defaultNamespace = 'common';

export const namespaces = ['common', 'translation', 'appDrawer', 'appBar'];
