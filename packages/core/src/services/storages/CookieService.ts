/* eslint-disable no-console */
import BaseStorageService from "./BaseStorageService";
import Cookies  from "universal-cookie";
export default class CookieStorageService extends BaseStorageService {
  private cookies : Cookies;
  constructor() {
    super();
    this.cookies= new Cookies();
  }
  
 async reset(key: string) : Promise<void>{
    return new Promise((resolve) => {
      if (key)
       this.cookies.remove(key);
      resolve();
    });
  }

 async getItem(key: string): Promise<any>{
    return new Promise((resolve) => {
      var strToken = this.cookies.get(key);
      if (strToken) return resolve(JSON.parse(strToken));
      return resolve(null);
    });
  }

  async setItem(key: string, object? : any ) : Promise<void>{
    return new Promise((resolve) => {
      this.cookies.set(key, JSON.stringify(object));
      resolve();
    });
  }
}
