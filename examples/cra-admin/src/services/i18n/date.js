import moment from 'moment';

import * as config from './config';

const date = {
  /**
   * Load library, setting its initial locale
   *
   * @param {string} locale
   * @return Promise
   */
  init(locale) {
    console.log('locale passed to date', locale);
    return new Promise((resolve, reject) => {
      config.supportedLocales[locale.split()]
        .momentLocaleLoader()
        .then(() => {
          //this craches the app when locale is arabic!
          //moment.locale(locale);

          return resolve();
        })
        .catch((err) => reject(err));
    });
  },

  /**
   * @param {Date} date
   * @param {string} format
   * @return {string}
   */
  format(date, format) {
    return moment(date).format(format);
  },
};

export default date;
