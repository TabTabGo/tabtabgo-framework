import BaseStorageService from './BaseStorageService';
export default class LocalStorageService extends BaseStorageService {
    reset(key: string): Promise<void>;
    getItem(key: string): Promise<any>;
    /**
     * Store object in local storage
     * @param key storage key
     * @param object object to store
     * @param ttl time to live in milliseconds
     */
    setItem(key: string, object: any, ttl?: number): Promise<void>;
}
