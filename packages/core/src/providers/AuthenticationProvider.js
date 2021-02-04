var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { currentServiceProvider } from './ServiceProvider';
//import _ from "lodash";
import update from 'immutability-helper';
const initialAuthState = {
    isAuthenticated: false,
    isLoading: false,
    isReadingSession: true,
    isChangingInstance: false,
    isSavingProfile: false,
    error: null,
};
const initSessionData = {
    user: {
        displayName: '',
    },
    menus: null,
    instance: undefined,
};
export const AuthenticationContext = React.createContext(Object.assign(Object.assign(Object.assign({}, initialAuthState), initSessionData), { loadUserData: (instanceId) => __awaiter(void 0, void 0, void 0, function* () { }), changeInstance: (instanceId) => __awaiter(void 0, void 0, void 0, function* () { }), login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error('Function Not implemented');
    }), loginByCode: (code, identification, mode) => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error('Function Not implemented');
    }), logout: (onLogout) => __awaiter(void 0, void 0, void 0, function* () { }), sendCode: (identification, mode) => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error('Function Not implemented');
    }), updateUserProfile: (userPropName, value) => { }, saveUserProfile: (userProfile) => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error('Function Not implemented');
    }), register: (user, registerUrl) => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error('Function Not implemented');
    }), confirmEmail: (email, token) => __awaiter(void 0, void 0, void 0, function* () { }), recoverPassword: (email) => __awaiter(void 0, void 0, void 0, function* () { }), resetPassword: (email, token, newPassword) => __awaiter(void 0, void 0, void 0, function* () { }) }));
const AuthenticationProvider = ({ children, configuration, resetStore, dispose, LoadingPage, }) => {
    const authInstance = currentServiceProvider.getAuthenticationService();
    const dispatch = currentServiceProvider.getDispatch();
    const [state, setState] = useState(initialAuthState);
    const [sessionData, setSessionData] = useState(initSessionData);
    const subscribedConsumer = [];
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
    const changeInstance = (instanceId) => __awaiter(void 0, void 0, void 0, function* () {
        if (instanceId) {
            setState(Object.assign(Object.assign({}, state), { isChangingInstance: true }));
            var result = yield authInstance.changeInstance(instanceId);
            //console.log("changeInstance result :", result);
            if (!result.success) {
                setState(Object.assign(Object.assign({}, state), { isChangingInstance: false }));
            }
            else {
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
    });
    const loadUserData = () => __awaiter(void 0, void 0, void 0, function* () {
        const { isAuthenticated } = state;
        //const { user } = sessionData;
        //console.log("loadUserData :", isAuthenticated, user);
        if (!isAuthenticated) {
            setState(Object.assign(Object.assign({}, state), { isReadingSession: true }));
            let sessionAuthorization = false;
            try {
                sessionAuthorization = yield authInstance.isAuthenticated();
            }
            catch (_a) { }
            //console.log("sessionAuthorization :", sessionAuthorization);
            if (sessionAuthorization /*&& _.isEqual(user, { profile: {} })*/) {
                //Get user session data include menus.
                let userData = yield authInstance.getSessionData();
                //console.log("userData", userData);
                if (userData) {
                    setSessionData(userData);
                    setState(Object.assign(Object.assign({}, state), { isReadingSession: false, isAuthenticated: sessionAuthorization }));
                }
                else {
                    setState(Object.assign(Object.assign({}, state), { isReadingSession: false }));
                }
            }
            else {
                setState(Object.assign(Object.assign({}, state), { isReadingSession: false, isAuthenticated: sessionAuthorization }));
            }
        }
    });
    const setIdentityState = (result) => {
        if (result.isAuthenticated) {
            setSessionData({
                user: result.user,
                menus: result.menus,
                instance: result.instance,
            });
            setState(Object.assign(Object.assign({}, state), { error: null, isLoading: false, isAuthenticated: true }));
        }
        else if (result.message) {
            setSessionData({
                user: undefined,
                instance: undefined,
                menus: undefined,
            });
            setState(Object.assign(Object.assign({}, state), { error: result.message, isAuthenticated: false, isLoading: false }));
        }
    };
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        //this.setState({ isLoading: true });
        var result = yield authInstance.login(email, password);
        setIdentityState(result);
        if (resetStore) {
            resetStore();
        }
        return result;
    });
    const loginByCode = (code, identification, mode = 'phoneNumber') => __awaiter(void 0, void 0, void 0, function* () {
        var result = yield authInstance.loginByCode(code, identification, mode);
        setIdentityState(result);
        if (resetStore) {
            resetStore();
        }
        return result;
    });
    const sendCode = (identification, mode = 'phoneNumber') => __awaiter(void 0, void 0, void 0, function* () {
        setState(Object.assign(Object.assign({}, state), { isLoading: true }));
        var result = yield authInstance.sendCode(identification, mode);
        setState(Object.assign(Object.assign({}, state), { isLoading: false }));
        return result;
    });
    const logout = (onLogout) => __awaiter(void 0, void 0, void 0, function* () {
        yield authInstance.logout();
        setState(Object.assign(Object.assign({}, state), { error: null, isAuthenticated: false, isLoading: false }));
        setSessionData(Object.assign({}, initSessionData));
        if (dispose) {
            dispose();
        }
        if (onLogout) {
            onLogout(dispatch);
        }
    });
    const updateUserProfile = (userPropName, value) => {
        setSessionData(update(sessionData, {
            user: { profile: { [userPropName]: { $set: value } } },
        }));
    };
    const saveUserProfile = (userProfile) => __awaiter(void 0, void 0, void 0, function* () {
        setState(Object.assign(Object.assign({}, state), { isSavingProfile: true }));
        var result = yield authInstance.saveUserProfile(userProfile);
        setState(Object.assign(Object.assign({}, state), { isSavingProfile: false }));
        if (result.success) {
            setSessionData(update(sessionData, { user: { profile: { $set: userProfile } } }));
            return true;
        }
        else {
            setState(Object.assign(Object.assign({}, state), result));
            throw result;
        }
    });
    const providerValue = Object.assign(Object.assign(Object.assign({}, state), sessionData), { loadUserData: loadUserData, changeInstance: changeInstance, login: login, loginByCode: loginByCode, logout: logout, sendCode: sendCode, updateUserProfile: updateUserProfile, saveUserProfile: saveUserProfile, register: authInstance.register, confirmEmail: authInstance.confirmEmail, recoverPassword: authInstance.recoverPassword, resetPassword: authInstance.resetPassword });
    //console.log('sessionData :', sessionData);
    //TODO add option to wait only for user profile or just user sessions
    if (state.isReadingSession || state.isLoading) {
        if (LoadingPage)
            return _jsx(LoadingPage, {}, void 0);
        return null;
    }
    return (_jsx(AuthenticationContext.Provider, Object.assign({ value: providerValue }, { children: children }), void 0));
};
// const resetStore = () => ({ type: 'RESET_APP' });
// const dispose = () => ({ type: 'DISPOSE_APP' });
export default AuthenticationProvider;
export const AuthenticationConsumer = AuthenticationContext.Consumer;
