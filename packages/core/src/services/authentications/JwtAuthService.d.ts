import { IStorageService } from '../contracts';
import { IAuthService } from '../contracts';
import { SessionData, AuthenticateData } from '../../types/SessionData';
import { AuthenticateResponse } from '../../types/AuthenticateResponse';
declare class JwtAuthService implements IAuthService {
    configuration: any;
    sessionManager: IStorageService;
    restApi: any;
    restApiWithSession: any;
    constructor(configuration: any);
    internalLogin: (url: string, body: any, onSuccess?: (result: any) => void, onError?: (result: any) => void) => Promise<AuthenticateData>;
    login: (username: string, password: string, redirectUrl?: string) => Promise<AuthenticateData>;
    loginByCode: (code: string, identification: any, mode: 'phoneNumber', onSuccess?: (result: any) => void) => Promise<AuthenticateData>;
    sendCode: (identification: any, mode?: string) => Promise<any>;
    register: (user: any, registerUrl?: string) => Promise<AuthenticateResponse>;
    saveUserProfile: (userProfile: any) => Promise<AuthenticateResponse>;
    changeInstance: (instanceId: number, redirectUrl?: string) => Promise<AuthenticateData>;
    setSession: (authResult: any) => Promise<void>;
    getSessionData: () => Promise<SessionData>;
    logout: () => Promise<void>;
    recoverPassword: (email: string) => Promise<any>;
    resetPassword: (email: string, token: any, newPassword: string) => Promise<any>;
    isAuthenticated: () => Promise<boolean>;
    getUserData: () => Promise<any>;
    getToken: () => Promise<{
        tokenType: string;
        token: any;
    }>;
    getTokenData: () => Promise<unknown>;
    refreshToken: () => Promise<any>;
    confirmEmail: (email: string, token: any) => Promise<void>;
}
export default JwtAuthService;
