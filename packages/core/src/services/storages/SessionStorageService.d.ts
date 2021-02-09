import BaseStorageService from './BaseStorageService';
export default class SessionStorageService extends BaseStorageService {
    reset(key: string): Promise<void>;
    getItem(key: string): Promise<any>;
    setItem(key: string, object: any): Promise<void>;
}
