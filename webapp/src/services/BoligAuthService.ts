/* eslint-disable no-console */
import { currentServiceProvider } from '@tabtabgo/core/provider/ServiceProvider';
import { TTGError } from '@tabtabgo/core/types/TTGError';
import qs from 'qs';
import { AuthenticateData, SessionData } from '@tabtabgo/core/types/Identity/SessionData';
import { AuthenticateResponse } from '@tabtabgo/core/types/Identity/AuthenticateResponse';
import IAuthService from '@tabtabgo/core/services/IAuthService';
import {
  IStorageService,
  IRefreshTokenService,
  IBasicStorageService,
} from '@tabtabgo/core/services/StorageServices';
import INotificationService from '@tabtabgo/core/services/INotificationService';
import { AppSettings } from '@tabtabgo/core/Appsettings';
import { SessionUser } from '@tabtabgo/core/types';
//import { User } from 'types';
//TODO move to constant file
const device_token_key = 'DEVICE_NOTIFICATION_TOKEN';
export default class BoligAuthService implements IAuthService {
  configuration: any;
  sessionManager: IStorageService;
  refreshTokenStorage: IRefreshTokenService;
  notificationService: INotificationService;
  restApi: any; //TODO create interface for restAPI
  restApiWithSession: any; //TODO create interface for restAPI
  secureStorage: IBasicStorageService;
  constructor(configuration: any) {
    this.configuration = configuration;
    const secureStorage = currentServiceProvider.getSecureStorage();
    this.notificationService = currentServiceProvider.getNotificationService();
    this.sessionManager = currentServiceProvider.getStorageService();
    this.refreshTokenStorage = currentServiceProvider.getRefreshTokenStorage();
    this.secureStorage = currentServiceProvider.getSecureStorage();
    this.restApi = currentServiceProvider.newAjaxService('oauth', '', {
      disableTokenAuthorization: true,
    });

    this.restApiWithSession = currentServiceProvider.newAjaxService('user', '', {
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
        body: qs.stringify(body),
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        },
      });
      // get user data after get token
      if (result) {
        await this.setSession(result);
        var userData = await this.getUserData();
        var user = undefined;
        if (userData) {
          user = Object.assign({}, userData, {
            displayName: userData.name,
            instances: [],
            avatar: null,
          });
          await this.sessionManager.setUser(user);
        }

        if (onSuccess) onSuccess(result);
        if (
          body.grant_type === 'password' &&
          AppSettings.enableAutoLogin &&
          (await this.secureStorage?.isAvailable())
        ) {
          await this.secureStorage.setItem('username', body.username);
          await this.secureStorage.setItem('password', body.password);
        }
        return {
          isAuthenticated: true,
          success: true,
          user: user,
          instance: undefined,
          menus: this.configuration.menus,
        };
      }
      return {
        isAuthenticated: false,
        success: false,
        message: result && result.message ? result.message : 'Unhandled Error',
        code: result && result.code ? result.code : 'Unhandled',
      };
    } catch (error) {
      console.log('login error :', error);
      await this.sessionManager.resetToken();
      if (onError) {
        onError(error);
      }
      return {
        isAuthenticated: false,
        success: false,
        message: error.error_description,
        code: error.error,
      };
    }
  };

  login = async (
    username: string,
    password: string,
    redirectUrl?: string,
  ): Promise<AuthenticateData> => {
    return this.internalLogin(
      '/token',
      {
        grant_type: 'password',
        username: username,
        password: password,
      },
      () => {
        //TODO add support to react navigation
        if (redirectUrl) window.location.href = redirectUrl;
      },
    );
  };

  getToken = async () => {
    return {
      tokenType: await this.sessionManager.getTokenType(),
      token: await this.sessionManager.getToken(),
    };
  };
  // eslint-disable-next-line no-unused-vars
  loginByCode = (
    code: string,
    identification: any,
    mode = 'phoneNumber',
    onSuccess?: (result: any) => void,
  ): Promise<AuthenticateData> => {
    throw new TTGError('login by code is not Supported.');
  };

  // eslint-disable-next-line no-unused-vars
  sendCode = async (identification: any, mode = 'phoneNumber'): Promise<AuthenticateResponse> => {
    throw new TTGError('login by code is not Supported.');
  };

  // eslint-disable-next-line no-unused-vars
  register = async (user: any, registerUrl?: string): Promise<AuthenticateResponse> => {
    throw new TTGError('login by code is not Supported.');
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
      await this.restApiWithSession.Put({
        url: '',
        body: userProfile,
      });

      return { success: true };
    } catch (error) {
      console.log('saveProfile error :', error);
      return {
        success: false,
        message: error.message,
        code: error.Code,
      };
    }
  };

  // eslint-disable-next-line no-unused-vars
  changeInstance = async (instanceId: number, redirectUrl?: string) => {
    throw new TTGError('login by code is not Supported.');
  };

  setSession = async (authResult: any) => {
    //console.log("authResult", authResult);
    if (authResult && authResult['access_token']) {
      await this.sessionManager.setTokenType(authResult['token_type']);
      await this.sessionManager.setAccessToken(authResult['access_token']);
      // var tokenData = jwtDecode(authResult.token);
      //add timeout to expire
      var expiryIn = Number(authResult['expires_in']);
      var expiryAt = new Date();
      expiryAt.setSeconds(expiryAt.getSeconds() + expiryIn);
      await this.sessionManager.setTokenExpire(expiryAt.getTime());
      await this.refreshTokenStorage.setRefreshToken(authResult['refresh_token']);
    }
  };

  getSessionData = async (): Promise<SessionData> => {
    var userSession = await this.sessionManager.getUser();

    return {
      user: userSession,
      menus: this.configuration.menus,
      instance: undefined,
    };
  };

  logout = async () => {
    // Clear access token and ID token from local storage

    await this.sessionManager.resetToken();
  };

  recoverPassword = async (email: string): Promise<any> => {
    try {
      return await this.restApi.Post({
        url: '//password-reset',
        body: { email },
      });
    } catch (error) {
      return error;
    }
  };

  resetPassword = async (email: string, token: any, newPassword: string): Promise<any> => {
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

  isAuthenticated = async (): Promise<boolean> => {
    //console.log("isAuthenticated");
    if (!this.restApi) {
      return false;
    }
    // Check whether the current time is past the
    // access token's expiry time
    var accessToken = await this.getTokenData();

    if (accessToken) {
      const isTokenExpired = await this.sessionManager.isTokenExpired();

      if (!isTokenExpired) {
        return true;
      }
    }
    var refreshToken = await this.refreshTokenStorage.getRefreshToken();

    if (refreshToken) {
      var refreshResult = await this.refreshToken();
      //console.log("refreshResult", refreshResult);
      return refreshResult;
    } else {
      await this.sessionManager.resetToken();
      return false;
    }
  };

  /**
   * Get User Data
   */
  getUserData = async (): Promise<any> => {
    var userData = await this.restApiWithSession.Get({ url: '' });
    await this.sessionManager.setItem('USER-DATA', userData);
    return userData;
  };

  getTokenData = async (): Promise<any> => {
    const token = await this.sessionManager.getToken();
    if (!token) return null;
    return token;
  };

  refreshToken = async (): Promise<boolean> => {
    let refresh_Token = await this.refreshTokenStorage.getRefreshToken();
    console.log('Bolig Auth refresh_token', refresh_Token);
    if (refresh_Token) {
      var login = await this.internalLogin('/token', {
        grant_type: 'refresh_token',
        refresh_token: refresh_Token,
      });
      console.log('login result:', login);
      if (login.success) return true;

      console.log(`Failed to refresh Token ${login.message}`);
      //TODO handle error when refresh failed
      if (AppSettings.enableAutoLogin && (await this.secureStorage?.isAvailable())) {
        var username = await this.secureStorage.getItem('username');
        var password = await this.secureStorage.getItem('password');

        console.log('Auto login');
        var loginResult = await this.login(username, password);
        console.log('Auto login success');
        if (loginResult.success) return true;
        console.log('Auto login failed; ', loginResult.message);
      }
    }

    return false;
  };

  // eslint-disable-next-line no-unused-vars
  confirmEmail = async (email: string, token: any) => {
    throw new TTGError('login by code is not Supported.');
  };

  isTokenExpired = () => {
    throw new TTGError('Not Implemented function.');
  };
  confirmPhoneNumber = (phoneNumber: string, token: any) => {
    throw new TTGError('Not Implemented function.');
  };

  registerDevice = async (user: SessionUser): Promise<void> => {
    if (!user?.customerId) return;
    if (this.notificationService) {
      let token = await this.notificationService.getToken();
      var deviceToken = await this.sessionManager.getItem(device_token_key);
      var currentUser = await this.sessionManager.getUser();
      console.log('token', token, deviceToken, user.customerId);
      if (token) {
        if (
          !deviceToken ||
          !deviceToken.token ||
          deviceToken.token !== token ||
          !currentUser ||
          deviceToken.userId !== user.customerId
        ) {
          let provider = this.notificationService.getName();
          let deviceInfo = await this.notificationService.getDeviceInfo();
          //console.log('deviceInfo :', deviceInfo);
          try {
            // POST the token to your backend server from where you can retrieve it to send push notifications.
            var result = await this.restApiWithSession.Post({
              url: `//customers/${user.customerId}/mobile-devices`,
              parameters: {
                applicationName: AppSettings.applicationName,
              },
              body: {
                token: token,
                model: deviceInfo.model,
                os: deviceInfo.operatorSystem,
                osVersion: deviceInfo.version,
                appVersion: '',
                webAppVersion: '',
              },
            });
            console.log('device register result', result);
            await this.sessionManager.setItem(device_token_key, {
              token,
              userId: user.customerId,
            });
          } catch (error) {
            console.warn('error in device registration:', error);
          }
        }
      } else {
        console.warn('error in device registration:', {
          message: 'notification token is empty',
        });
      }
    } else {
      console.warn('error in device registration:', {
        message: 'notification Service is not setup correctly.',
      });
    }
  };

  unregisterDevice = async (user: SessionUser): Promise<void> => {
    var deviceToken = await this.sessionManager.getItem(device_token_key);

    if (deviceToken && deviceToken.token) {
      try {
        await this.restApiWithSession.Delete({
          url: `//customers/${user.customerId}/mobile-devices/${deviceToken.token}`,
        });
        await this.sessionManager.reset(device_token_key);
      } catch (error) {
        console.warn('error in unlink user from device:', error);
      }
    }
  };
}
