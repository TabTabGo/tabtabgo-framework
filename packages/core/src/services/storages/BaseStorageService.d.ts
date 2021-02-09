import { IStorageService, IRefreshTokenService } from '../contracts';
import { SessionUser } from '../../types/SessionUser';
declare abstract class BaseStorageService implements IStorageService, IRefreshTokenService {
    protected token_name: string;
    protected token_type: string;
    protected token_expired: string;
    protected user_info: string;
    protected refresh_token: string;
    protected token_header_key: string;
    setToken: (accessToken: any, tokenType: string, tokenExpired?: number) => Promise<void>;
    setTokenType: (tokenType: string) => Promise<void>;
    setAccessToken: (accessToken: any) => Promise<void>;
    setTokenExpire: (tokenExpired: number) => Promise<void>;
    setRefreshToken: (refreshToken: any, user?: SessionUser) => Promise<void>;
    setTokenHeaderKey: (headerKey: string) => Promise<void>;
    setUser: (user: SessionUser) => Promise<void>;
    getToken: () => Promise<any>;
    getTokenType: () => Promise<any>;
    getTokenHeaderKey: () => Promise<any>;
    getUser: () => Promise<SessionUser>;
    getRefreshToken: (user?: SessionUser) => Promise<any>;
    isTokenExpired: () => Promise<boolean>;
    resetToken: () => Promise<void>;
    abstract reset(key: string): Promise<void>;
    abstract getItem(key: string): Promise<any>;
    abstract setItem(key: string, object: any): Promise<void>;
}
export default BaseStorageService;
