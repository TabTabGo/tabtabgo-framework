import React from 'react';
import { currentServiceProvider } from '@tabtabgo/core/providers/ServiceProvider';
import FileService from '@tabtabgo/core/services/FileService';
import ExportService from '@tabtabgo/core/services/ExportService';
import { WebComponentProvider } from '@tabtabgo/web/ComponentProvider';
import Axios from '@tabtabgo/core/services/restApi/axios';
import SessionStorageService from '@tabtabgo/core/services/storages/SessionStorageService';
import LocalStorageService from "@tabtabgo/core/services/storages/LocalStorageService";
import FormInputLabel from '@tabtabgo/web/components/FormInputLabel/StarLabelRequried';
import LoadingPage from './LoadingPage';

import BoligAuthService from 'services/BoligAuthService';
var accessMenus = ['Dashboard', 'Customers', 'Tasks', 'FAQs', 'Trouble Tickets'];

export const setupServices = (dispatch: any) => {
  //Order is important
  if (currentServiceProvider) {
    currentServiceProvider
      .setDispatch(dispatch)
      .setStorageService(new SessionStorageService())
      .setRefreshTokenStorage(new LocalStorageService())
      
      .setAjaxService(new Axios(""))
      .setFileService(new FileService('files'))
      //TODO .setFileSystem(FileService)
      .setExportService(new ExportService({} as any))

      .setAuthenticationService(new BoligAuthService({ menus: accessMenus }));
      // .setResetApplication(() => {
      //   console.log('inside reset application');
      //   dispatch({ type: 'USER_LOGOUT' });
      //   //navigate("home");
      //   window.location.reload();
      // })
      // ;
  }

};

export const setupComponents = () => {
  return {
    defaultComponents: WebComponentProvider({
      formInputLabel: (props: any) => FormInputLabel(props),
    }),
    components: [
      {
        key: 'loadingPage',
        component: LoadingPage,
      },
      // {
      //   key: 'SearchBar',
      //   component: (props?: any) => <SearchBar {...props} />,
      // },
    ],
  };
};
