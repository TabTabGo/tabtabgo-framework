import React, { useState, useEffect, useContext } from 'react';
import { AppSettings } from '../Appsettings';
import LocalStorageService from '../services/storages/LocalStorageService';
import { AuthenticationContext } from '../providers/AuthenticationProvider';
import _ from 'lodash';
import update from 'immutability-helper';
export interface RecentView {
  type: 'Info' | 'Economy' | 'Internet' | 'TV' | 'Files';
  path: string;
  id: number;
  name: string;
}
export const UserSettingsContext = React.createContext({
  recentViews: new Array<RecentView>(),
  addRecentView: (view: RecentView) => {},
  removeRecentView: (id: any) => {},
  clearRecentViews: () => {},
  showIds: false,
  setShowIDs: (value: boolean) => {},
  setSetting: (name: string, value: any) => {},
});

type RecentViewProviderProps = {
  children: any;
  [key: string]: any;
};

type UserSettings = {
  [userId: string]: UserSetting;
};

type UserSetting = {
  recentViews: Array<RecentView>;
  showIds: boolean;
  [key: string]: any;
};

const defaultUserSettings = { recentViews: [], showIds: false } as UserSetting;

export const UserSettingsProvider = ({ children }: RecentViewProviderProps) => {
  const authContext = useContext<any>(AuthenticationContext);
  var userId = authContext.user && authContext.user.id ? authContext.user.id : 'default';
  const [userSettings, setUserSettings] = useState<UserSettings>({
    [userId]: { ...defaultUserSettings },
  });
  const localStorageService = new LocalStorageService();

  useEffect(() => {
    localStorageService.getItem('userSettings').then((settings) => {
      //console.log("UserSettings :", settings);
      if (settings && !_.isEmpty(settings)) {
        setUserSettings(settings);
      }
    });
  }, []);

  useEffect(() => {
    if (userSettings && !_.isEmpty(userSettings)) {
      //console.log("userSettings :", userSettings);
      localStorageService.setItem('userSettings', userSettings);
    }
  }, [userSettings]);

  const getUserSettingProp = (propName: string) => {
    var currentSetting = { ...defaultUserSettings } as any;
    if (userSettings[userId]) {
      currentSetting = userSettings[userId] as any;
    }

    return currentSetting[propName];
  };

  const setUserSettingProp = (propName: string, value: any) => {
    let defaultSettings = { ...defaultUserSettings } as any;
    let currentSettings = userSettings;
    if (!currentSettings) {
      currentSettings = { [userId]: defaultSettings };
    }
    if (!currentSettings[userId]) {
      defaultSettings[propName] = value;
      setUserSettings(
        update(currentSettings, {
          [userId]: {
            $set: defaultSettings,
          },
        }),
      );
    } else {
      setUserSettings(
        update(userSettings, {
          [userId]: {
            [propName]: { $set: value },
          },
        }),
      );
    }
  };

  const handleSetView = (view: RecentView) => {
    let newViews = [...getUserSettingProp('recentViews')];
    if (!newViews) {
      newViews = new Array<RecentView>();
    }
    const vIndex = newViews.findIndex(
      (v) => v.id === view.id, //&& v.type === view.type
    );
    if (vIndex > -1) {
      // newViews.splice(vIndex, 1);
      newViews[vIndex] = view;
    } else {
      if (newViews.length >= AppSettings.recentViewCount) {
        newViews.pop();
      }
      newViews.unshift(view);
    }

    setUserSettingProp('recentViews', newViews);
  };

  const handleDeleteView = (id: any) => {
    let newViews = [...getUserSettingProp('recentViews')];
    if (!newViews) {
      newViews = new Array<RecentView>();
    }
    const vIndex = newViews.findIndex(
      (v) => v.id === id, //&& v.type === view.type
    );
    if (vIndex > -1) {
      // newViews.splice(vIndex, 1);
      newViews.splice(vIndex, 1);
    }

    setUserSettingProp('recentViews', newViews);
  };

  const clearRecentViews = () => {
    setUserSettingProp('recentViews', [] as RecentView[]);
  };
  const handleSetShowId = (value: boolean) => {
    setUserSettingProp('showIds', value);
  };
  const handleSetSetting = (name: string, value: any) => {
    setUserSettingProp(name, value);
  };

  let currentSettings = userSettings[userId] ? userSettings[userId] : defaultUserSettings;
  return (
    <UserSettingsContext.Provider
      value={{
        ...currentSettings,
        addRecentView: handleSetView,
        removeRecentView: handleDeleteView,
        clearRecentViews,
        setShowIDs: handleSetShowId,
        setSetting: handleSetSetting,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export const withUserSettings = (WrapperComponent: any) => (props: any) => (
  <UserSettingsContext.Consumer>
    {(state) => <WrapperComponent recentViewContext={{ ...props.context, ...state }} {...props} />}
  </UserSettingsContext.Consumer>
);
