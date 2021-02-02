/* eslint-disable no-console */
import BaseStorageService from "./BaseStorageService";
export default class LocalStorageService extends BaseStorageService {
  async reset(key: string): Promise<void> {
    return new Promise(resolve => {
      if (key) localStorage.removeItem(key);
      else localStorage.clear();
      resolve();
    });
  }

  async getItem(key: string): Promise<any> {
    var strToken = localStorage.getItem(key);
    return new Promise(resolve => {
      if (strToken) {
        const item = JSON.parse(strToken);
        const now = new Date();
        if (item?.$expiry === undefined) {
          return resolve(item);
        }
        if (item.$expiry === -1 || now.getTime() <= item.$expiry) {
          return resolve(item.value);
        } else {
          localStorage.removeItem(key);
        }
      }
      return resolve(null);
    });
  }

  /**
   * Store object in local storage
   * @param key storage key
   * @param object object to store
   * @param ttl time to live in milliseconds
   */
  async setItem(key: string, object: any, ttl?: number): Promise<void> {
    //console.log('key', key, object);
    return new Promise(resolve => {
      const now = new Date();
      const item = {
        value: object,
        $expiry: ttl ? now.getTime() + ttl : -1
      }
      localStorage.setItem(key, JSON.stringify(item));
      resolve();
    });
  }
}
