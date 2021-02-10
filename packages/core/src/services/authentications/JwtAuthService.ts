/* eslint-disable no-console */
import jwtDecode from 'jwt-decode';
import { currentServiceProvider } from '../../providers/ServiceProvider';
import { IStorageService } from '../contracts';
import { IAuthService } from '../contracts';
import { SessionData, AuthenticateData } from '../../types/SessionData';
import { AuthenticateResponse } from '../../types/AuthenticateResponse';
class JwtAuthService implements IAuthService {
  configuration: any;
  sessionManager: IStorageService;
  restApi: any; //TODO create rest APi interface
  restApiWithSession: any; //TODO create rest APi interface
  constructor(configuration: any) {
    this.configuration = configuration;
    this.sessionManager = currentServiceProvider.getStorageService();
    this.restApi = currentServiceProvider.newAjaxService('accounts', '', {
      disableTokenAuthorization: true,
    });

    this.restApiWithSession = currentServiceProvider.newAjaxService('accounts', '', {
      disableTokenAuthorization: false,
    });
  }

  internalLogin = async (
    url: string,
    body: any,
    onSuccess?: (result: any) => void,
    onError?: (result: any) => void,
  ): Promise<AuthenticateData> => {
    if (!this.restApi) {
      console.error('Ajax service not setup correctly.');
      return {
        isAuthenticated: false,
        success: false,
        message: 'Ajax service not setup correctly.',
      };
    }
    try {
      let result = await this.restApi.Post({
        url: url,
        body: body,
      });
      if (result && result.succeeded !== false) {
        await this.setSession(result);

        if (onSuccess) onSuccess(result);

        return {
          isAuthenticated: true,
          success: true,
          user: result.user,
          instance: result.instance,
          menus: result.menus,
        };
      }
      return {
        isAuthenticated: false,
        success: false,
        message: result.message || 'Unhandled Error',
        code: result.code || 'Unhandled',
      };
    } catch (error) {
      console.log('error :', error);
      await this.sessionManager.resetToken();
      if (onError) {
        onError(error);
      }
      return {
        isAuthenticated: false,
        success: false,
        message: error.message,
        errorCode: error.Code,
      };
    }
  };

  login = (username: string, password: string, redirectUrl?: string): Promise<AuthenticateData> => {
    return this.internalLogin('/login', { username, password }, () => {
      //TODO add support to react navigation
      if (redirectUrl) window.location.href = redirectUrl;
    });
  };

  loginByCode = (
    code: string,
    identification: any,
    mode: 'phoneNumber',
    onSuccess?: (result: any) => void,
  ): Promise<AuthenticateData> => {
    identification = identification.replace(/\s/g, '');
    return this.internalLogin('/login/code', { code, [mode]: identification }, onSuccess);
  };

  sendCode = async (identification: any, mode = 'phoneNumber') => {
    try {
      identification = identification.replace(/\s/g, '');
      let result = await this.restApi.Get({
        url: '/sendCode',
        parameters: { [mode]: identification },
      });
      if (result && result.code === 'LOGIN_PHONE_NUMBER_TOKEN_SENT') {
        return {
          succeeded: true,
          ...result,
        };
      }
      return {
        succeeded: false,
        ...result,
      };
    } catch (error) {
      console.log('error :', error);

      return {
        succeeded: false,
        ...error,
      };
    }
  };

  register = async (user: any, registerUrl?: string): Promise<AuthenticateResponse> => {
    try {
      let result = await this.restApi.Post({
        url: registerUrl || '/register',
        body: user,
      });
      if (
        result &&
        (result.code === 'LOGIN_PHONE_NUMBER_TOKEN_SENT' ||
          result.code === 'USER_CONFIRM_EMAIL_SENT')
      ) {
        return {
          succeeded: true,
          ...result,
        };
      }
      return {
        succeeded: false,
        ...result,
      };
    } catch (error) {
      console.log('error :', error);
      return {
        succeeded: false,
        ...error,
      };
    }
  };

  saveUserProfile = async (userProfile: any): Promise<AuthenticateResponse> => {
    if (!this.restApiWithSession) {
      console.error('Ajax service not setup correctly.');
      return {
        success: false,
        message: 'Ajax service not setup correctly.',
        code: 'NoSetup',
      };
    }
    try {
      let result = await this.restApiWithSession.Put({
        url: `/profile`,
        body: userProfile,
      });
      //console.log("result :", result);
      return { success: true };
    } catch (error) {
      console.log('error :', error);
      return {
        success: false,
        message: error.message,
        code: error.Code,
      };
    }
  };

  changeInstance = async (instanceId: number, redirectUrl?: string): Promise<AuthenticateData> => {
    if (!this.restApiWithSession) {
      console.error('Ajax service not setup correctly.');
      return {
        isAuthenticated: false,
        success: false,
        message: 'Ajax service not setup correctly.',
        code: 'NoSetup',
      };
    }
    try {
      let result = await this.restApiWithSession.Put({
        url: `/instances/${instanceId}/change`,
      });
      if (result) {
        await this.setSession(result);
        if (redirectUrl) window.location.href = redirectUrl;

        return {
          success: true,
          isAuthenticated: true,
          user: result.user,
          instance: result.instance,
          menus: result.menus,
        };
      }
      return {
        isAuthenticated: false,
        success: false,
        message: 'Unhandled Error',
        code: 'Unhandled',
      };
    } catch (error) {
      console.log('error :', error);
      return {
        success: false,
        isAuthenticated: false,
        message: error.message,
        code: error.Code,
      };
    }
  };

  setSession = async (authResult: any) => {
    if (authResult && authResult.token) {
      await this.sessionManager.setTokenType('Bearer'); //TODO return from server;
      await this.sessionManager.setAccessToken(authResult.token);
      var tokenData = jwtDecode(authResult.token) as any;
      //add timeout to expire
      if (tokenData) await this.sessionManager.setTokenExpire(tokenData.exp);
      if (authResult.user)
        await this.sessionManager.setUser({
          displayName: authResult.user.displayName,
          avatar: authResult.user.avatar,
          instances: [],
          roles: [],
        });
      if (authResult.instance) await this.sessionManager.setItem('instance', authResult.instance);
    }
  };

  getSessionData = async (): Promise<SessionData> => {
    var userSession = await this.sessionManager.getUser();
    var instanceSession = await this.sessionManager.getItem('instance');
    return { user: userSession, menus: null, instance: instanceSession };
  };

  logout = async () => {
    // Clear access token and ID token from local storage
    try {
      await this.restApiWithSession.Post({ url: '/logout' });
    } catch (error) {
      console.log('error in logout:', error);
    }
    await this.sessionManager.resetToken();
  };

  recoverPassword = async (email: string) => {
    try {
      return await this.restApi.Get({
        url: '/recoverPassword',
        parameters: { email },
      });
    } catch (error) {
      return error;
    }
  };

  resetPassword = async (email: string, token: any, newPassword: string) => {
    try {
      return await this.restApi.Post({
        url: `/resetPassword`,
        parameters: { email, token: encodeURIComponent(token) },
        body: { newPassword, confirmPassword: newPassword },
      });
    } catch (error) {
      return error;
    }
  };

  isAuthenticated = async () => {
    if (!this.restApi) {
      return false;
    }
    // Check whether the current time is past the
    // access token's expiry time
    var tokenData = await this.getTokenData();

    if (!tokenData) return false;
    const isTokenExpired = await this.sessionManager.isTokenExpired();
    if (!isTokenExpired) {
      return true;
    } else {
      await this.sessionManager.resetToken();
      return false;
    }
  };

  getUserData = async () => {
    return this.restApiWithSession.Get({ url: 'me' });
  };

  getToken = async () => {
    return {
      tokenType: await this.sessionManager.getTokenType(),
      token: await this.sessionManager.getToken(),
    };
  };

  getTokenData = async () => {
    const token = await this.sessionManager.getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);

    if (!decoded) {
      return null;
    }
    return decoded;
  };

  refreshToken = async () => {
    let refreshToken = await this.sessionManager.getItem('refresh_token');
    var refresh_token = JSON.parse(refreshToken);
    if (refresh_token) {
      try {
        var tokenResponse = await this.restApi.Get({
          url: 'token/refresh',
          parameters: { token: refresh_token },
        });

        return tokenResponse;
      } catch (error) {
        console.error(`Failed to refresh Token ${error}`);
        return false;
      }
    }

    return false;
  };

  confirmEmail = async (email: string, token: any) => {
    await this.restApi.Post({
      url: '/confirm/Email',
      body: {
        email,
        token: token,
      },
    });
  };
}

export default JwtAuthService;
