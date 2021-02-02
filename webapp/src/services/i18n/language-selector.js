import * as Localization from 'expo-localization';

import { currentServiceProvider } from '@tabtabgo/core/providers/ServiceProvider';
const languageSelector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    // We will get back a string like "en-US". We
    // return a string like "en" to match our language
    // files.
    const storage = currentServiceProvider.getStorageService();
    await storage.getItem('selectedLocale').then((value) => {
      if (value == null) {
        callback(Localization.locale.split(/[\-|_]/gm)[0]);
      } else {
        callback(value.split(/[\-|_]/gm)[0]);
      }
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default languageSelector;
