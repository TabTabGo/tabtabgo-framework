/* eslint-disable no-console */
import BaseStorageService from './BaseStorageService';
export default class SessionStorageService extends BaseStorageService {
  async reset(key: string): Promise<void> {
    return new Promise((resolve) => {
      if (key) sessionStorage.removeItem(key);
      else sessionStorage.clear();
      resolve();
    });
  }

  async getItem(key: string): Promise<any> {
    var strToken = sessionStorage.getItem(key);
    return new Promise((resolve) => {
      if (strToken) return resolve(JSON.parse(strToken));
      return resolve(null);
    });
  }

  async setItem(key: string, object: any): Promise<void> {
    return new Promise((resolve) => {
      sessionStorage.setItem(key, JSON.stringify(object));
      resolve();
    });
  }
}
