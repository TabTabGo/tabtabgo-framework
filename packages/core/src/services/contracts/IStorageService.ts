import { SessionUser } from '../../../types/SessionUser';

export interface IStorageService {
  setToken: (
    accessToken: string,
    tokenType: string,
    tokenExpired?: number,
    refresh?: string,
  ) => Promise<void>;
  setTokenType: (tokenType: string) => Promise<void>;
  setAccessToken: (accessToken: any) => Promise<void>;
  setTokenExpire: (tokenExpired: number) => Promise<void>;
  setTokenHeaderKey: (headerKey: string) => Promise<void>;
  setUser: (user: SessionUser) => Promise<void>;

  getToken: () => Promise<any>;
  getTokenType: () => Promise<string>;
  getTokenHeaderKey: () => Promise<string>;
  getUser: () => Promise<SessionUser>;

  resetToken: () => Promise<void>;

  reset(key: string): Promise<void>;
  getItem(key: string): Promise<any>;
  setItem(key: string, object: any): Promise<void>;

  isTokenExpired: () => Promise<boolean>;
}
