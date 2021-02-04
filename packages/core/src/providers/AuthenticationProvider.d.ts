import React from 'react';
import { AuthenticateMode } from '../services/contracts/IAuthService';
import { SessionData, AuthenticateData } from '../types/SessionData';
import { AuthenticateResponse } from '../types/AuthenticateResponse';
declare type AuthStateProps = {
    isAuthenticated: boolean;
    isLoading: boolean;
    isReadingSession: boolean;
    isChangingInstance: boolean;
    isSavingProfile: boolean;
    error: any | null;
};
declare type AuthenticationContextActions = {
    loadUserData: (instanceId: number) => Promise<void>;
    changeInstance: (instanceId: number) => Promise<void>;
    login: (email: string, password: string) => Promise<AuthenticateData>;
    loginByCode: (code: string, identification: any, mode: AuthenticateMode) => Promise<AuthenticateData>;
    logout: (onLogout: (dispatch?: any) => void) => Promise<void>;
    sendCode: (identification: any, mode: AuthenticateMode) => Promise<AuthenticateResponse>;
    updateUserProfile: (userPropName: string, value: any) => void;
    saveUserProfile: (userProfile: any) => Promise<boolean>;
    register: (user: any, registerUrl?: string) => Promise<AuthenticateResponse>;
    confirmEmail: (email: string, token: any) => Promise<void>;
    recoverPassword: (email: string) => Promise<any>;
    resetPassword: (email: string, token: any, newPassword: string) => Promise<any>;
};
export declare type AuthenticationContextProps = SessionData & AuthStateProps & AuthenticationContextActions & {};
export declare const AuthenticationContext: React.Context<AuthenticationContextProps>;
declare type AuthenticationProviderProps = {
    children: any;
    LoadingPage: React.ElementType;
    resetStore?: () => void;
    dispose?: () => void;
    configuration?: any;
};
declare const AuthenticationProvider: ({ children, configuration, resetStore, dispose, LoadingPage, }: AuthenticationProviderProps) => JSX.Element | null;
export default AuthenticationProvider;
export declare const AuthenticationConsumer: React.Consumer<AuthenticationContextProps>;
