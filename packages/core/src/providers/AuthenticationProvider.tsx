/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import { currentServiceProvider } from './ServiceProvider';
//import _ from "lodash";
import update from 'immutability-helper';
import { AuthenticateMode } from '../services/contracts/IAuthService';
import { SessionData, AuthenticateData } from '../../types/SessionData';
import { AuthenticateResponse } from '../../types/AuthenticateResponse';

type AuthStateProps = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isReadingSession: boolean;
  isChangingInstance: boolean;
  isSavingProfile: boolean;
  error: any | null;
};
type AuthenticationContextActions = {
  loadUserData: (instanceId: number) => Promise<void>;
  changeInstance: (instanceId: number) => Promise<AuthenticateData>;
  login: (email: string, password: string) => Promise<AuthenticateData>;
  loginByCode: (
    code: string,
    identification: any,
    mode: AuthenticateMode,
  ) => Promise<AuthenticateData>;
  logout: (onLogout: (dispatch?: any) => void) => Promise<void>;
  sendCode: (identification: any, mode: AuthenticateMode) => Promise<AuthenticateResponse>;
  updateUserProfile: (userPropName: string, value: any) => void;
  saveUserProfile: (userProfile: any) => Promise<boolean>;
  register: (user: any, registerUrl?: string) => Promise<AuthenticateResponse>;
  confirmEmail: (email: string, token: any) => Promise<void>;
  recoverPassword: (email: string) => Promise<any>;
  resetPassword: (email: string, token: any, newPassword: string) => Promise<any>;
};
export type AuthenticationContextProps = SessionData &
  AuthStateProps &
  AuthenticationContextActions & {};
const initialAuthState: AuthStateProps = {
  isAuthenticated: false,
  isLoading: false,
  isReadingSession: true,
  isChangingInstance: false,
  isSavingProfile: false,
  error: null,
};
const initSessionData: SessionData = {
  user: {
    displayName: '',
  },
  menus: null,
  instance: undefined,
} as SessionData;

export const AuthenticationContext = React.createContext<AuthenticationContextProps>({
  ...initialAuthState,
  ...initSessionData,
  loadUserData: async (instanceId: number) => {},
  changeInstance: async (instanceId: number): Promise<AuthenticateData> => {
    throw new Error('Function Not implemented');
  },
  login: async (email: string, password: string): Promise<AuthenticateData> => {
    throw new Error('Function Not implemented');
  },
  loginByCode: async (code: string, identification: any, mode: AuthenticateMode) => {
    throw new Error('Function Not implemented');
  },
  logout: async (onLogout: (dispatch?: any) => void) => {},
  sendCode: async (identification: any, mode: AuthenticateMode): Promise<AuthenticateResponse> => {
    throw new Error('Function Not implemented');
  },
  updateUserProfile: (userPropName: string, value: any) => {},
  saveUserProfile: async (userProfile: any) => {
    throw new Error('Function Not implemented');
  },
  register: async (user: any, registerUrl?: string): Promise<AuthenticateResponse> => {
    throw new Error('Function Not implemented');
  },
  confirmEmail: async (email: string, token: any) => {},
  recoverPassword: async (email: string) => {},
  resetPassword: async (email: string, token: any, newPassword: string) => {},
});

type AuthenticationProviderProps = {
  children: any;
  LoadingPage: React.ElementType;
  resetStore?: () => void;
  dispose?: () => void;
  configuration?: any;
};

const AuthenticationProvider = ({
  children,
  configuration,
  resetStore,
  dispose,
  LoadingPage,
}: AuthenticationProviderProps) => {
  const authInstance = currentServiceProvider.getAuthenticationService();
  const dispatch = currentServiceProvider.getDispatch();
  const [state, setState] = useState<AuthStateProps>(initialAuthState);
  const [sessionData, setSessionData] = useState<SessionData>(initSessionData);
  const subscribedConsumer: any[] = [];

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (subscribedConsumer && subscribedConsumer.length > 0) {
      subscribedConsumer.forEach((consumer) => {
        consumer.forceUpdate();
      });
    }
  }, [subscribedConsumer]);

  const changeInstance = async (instanceId: number) => {
    if (instanceId) {
      setState({ ...state, isChangingInstance: true });

      var result = await authInstance.changeInstance(instanceId);
      //console.log("changeInstance result :", result);
      if (!result.success) {
        setState({ ...state, isChangingInstance: false });
      } else {
        let currentLocation = `${window.location.protocol}//${window.location.host}/`;
        window.location.href = currentLocation;

        // Need to have cancellation request logic implement to cancel all request before reload new instance
        //   if (this.props.dispatch) {
        //     window.location = currentLocation + "#/";
        //     this.props.dispatch({ type: "RESET_APP" });
        //   } else {
        //     window.location = currentLocation;
        //   }
        // this.setState({ isChangingInstance: false, ...result });
      }
      return result;
    }
    return null;
  };

  const loadUserData = async () => {
    const { isAuthenticated } = state;
    //const { user } = sessionData;
    //console.log("loadUserData :", isAuthenticated, user);

    if (!isAuthenticated) {
      setState({ ...state, isReadingSession: true });

      let sessionAuthorization = false;
      try {
        sessionAuthorization = await authInstance.isAuthenticated();
      } catch {}

      //console.log("sessionAuthorization :", sessionAuthorization);
      if (sessionAuthorization /*&& _.isEqual(user, { profile: {} })*/) {
        //Get user session data include menus.
        let userData = await authInstance.getSessionData();
        //console.log("userData", userData);
        if (userData) {
          setSessionData(userData);
          setState({
            ...state,
            isReadingSession: false,
            isAuthenticated: sessionAuthorization,
          });
        } else {
          setState({ ...state, isReadingSession: false });
        }
      } else {
        setState({
          ...state,
          isReadingSession: false,
          isAuthenticated: sessionAuthorization,
        });
      }
    }
  };

  const setIdentityState = (result: AuthenticateData) => {
    if (result.isAuthenticated) {
      setSessionData({
        user: result.user,
        menus: result.menus,
        instance: result.instance,
      });
      setState({
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: true,
      });
    } else if (result.message) {
      setSessionData({
        user: undefined,
        instance: undefined,
        menus: undefined,
      });
      setState({
        ...state,
        error: result.message,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    //this.setState({ isLoading: true });
    var result = await authInstance.login(email, password);
    setIdentityState(result);
    if (resetStore) {
      resetStore();
    }
    return result;
  };

  const loginByCode = async (
    code: string,
    identification: any,
    mode: AuthenticateMode = 'phoneNumber',
  ) => {
    var result = await authInstance.loginByCode(code, identification, mode);
    setIdentityState(result);
    if (resetStore) {
      resetStore();
    }
    return result;
  };

  const sendCode = async (identification: any, mode: AuthenticateMode = 'phoneNumber') => {
    setState({ ...state, isLoading: true });
    var result = await authInstance.sendCode(identification, mode);
    setState({ ...state, isLoading: false });
    return result;
  };

  const logout = async (onLogout: (dispatch?: any) => void) => {
    await authInstance.logout();

    setState({
      ...state,
      error: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setSessionData({ ...initSessionData });
    if (dispose) {
      dispose();
    }
    if (onLogout) {
      onLogout(dispatch);
    }
  };

  const updateUserProfile = (userPropName: string, value: any) => {
    setSessionData(
      update(sessionData, {
        user: { profile: { [userPropName]: { $set: value } } },
      }),
    );
  };

  const saveUserProfile = async (userProfile: any) => {
    setState({ ...state, isSavingProfile: true });
    var result = await authInstance.saveUserProfile(userProfile);
    setState({ ...state, isSavingProfile: false });
    if (result.success) {
      setSessionData(update(sessionData, { user: { profile: { $set: userProfile } } }));
      return true;
    } else {
      setState({ ...state, ...result });
      throw result;
    }
  };

  const providerValue = {
    ...state,
    ...sessionData,
    loadUserData: loadUserData,
    changeInstance: changeInstance,
    login: login,
    loginByCode: loginByCode,
    logout: logout,
    sendCode: sendCode,
    updateUserProfile: updateUserProfile,
    saveUserProfile: saveUserProfile,
    register: authInstance.register,
    confirmEmail: authInstance.confirmEmail,
    recoverPassword: authInstance.recoverPassword,
    resetPassword: authInstance.resetPassword,
  } as AuthenticationContextProps;
  //console.log('sessionData :', sessionData);
  //TODO add option to wait only for user profile or just user sessions
  if (state.isReadingSession || state.isLoading) {
    if (LoadingPage) return <LoadingPage />;
    return null;
  }

  return (
    <AuthenticationContext.Provider value={providerValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

// const resetStore = () => ({ type: 'RESET_APP' });
// const dispose = () => ({ type: 'DISPOSE_APP' });

export default AuthenticationProvider;
export const AuthenticationConsumer = AuthenticationContext.Consumer;
