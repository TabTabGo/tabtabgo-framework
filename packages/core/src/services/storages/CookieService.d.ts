import BaseStorageService from './BaseStorageService';
export default class CookieStorageService extends BaseStorageService {
    private cookies;
    constructor();
    reset(key: string): Promise<void>;
    getItem(key: string): Promise<any>;
    setItem(key: string, object?: any): Promise<void>;
}
