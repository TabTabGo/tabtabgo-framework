import { AuthenticateResponse } from '../../types/AuthenticateResponse';
import { SessionData, AuthenticateData } from '../../types/SessionData';

export type AuthenticateMode = 'phoneNumber';

export interface IAuthService {
  login: (username: string, password: string, redirectUrl?: string) => Promise<AuthenticateData>;
  loginByCode: (
    code: string,
    identification: any,
    mode: AuthenticateMode,
    onSuccess?: (result: any) => void,
  ) => Promise<AuthenticateData>;

  sendCode: (identification: any, mode: AuthenticateMode) => Promise<AuthenticateResponse>;

  register: (user: any, registerUrl?: string) => Promise<AuthenticateResponse>;

  saveUserProfile: (userProfile: any) => Promise<AuthenticateResponse>;

  changeInstance: (instanceId: number, redirectUrl?: string) => Promise<AuthenticateData>;

  setSession: (authResult: any) => Promise<void>;

  getSessionData: () => Promise<SessionData>;

  logout: () => Promise<void>;

  recoverPassword: (email: string) => Promise<any>; // define response

  resetPassword: (email: string, token: any, newPassword: string) => Promise<any>; // define response

  isAuthenticated: () => Promise<boolean>;

  getUserData: () => Promise<any>;

  getTokenData: () => Promise<any>;

  getToken: () => Promise<any>;

  refreshToken: () => Promise<boolean>;

  confirmEmail: (email: string, token: any) => Promise<void>;
}
