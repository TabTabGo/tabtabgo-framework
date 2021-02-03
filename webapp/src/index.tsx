import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppSettings } from '@tabtabgo/core/Appsettings';

import Store from './reducers/stores';
import { Provider } from 'react-redux';
import Notifier from '@tabtabgo/web/components/Notifications/Notifier';
import indexRoutes from 'routes/index';

import AuthenticationProvider from '@tabtabgo/core/providers/AuthenticationProvider';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import theme from 'assets/jss/theme';
import LoadingPage from './LoadingPage';
import { setupServices, setupComponents } from './setup';
import SwitchRoutes from 'ttg-identity/components/Routes/SwitchRoutes';
import { ErrorProvider } from '@tabtabgo/web/contexts/ErrorContext';
import { ConfirmationDialogProvider } from '@tabtabgo/web/contexts/ConfirmationContext';
import { LinearProgress } from '@material-ui/core';

import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { UserSettingsProvider } from '@tabtabgo/core/contexts/UserSettingsContext';
import ComponentProvider from '@tabtabgo/web/ComponentProvider';
import ErrorBoundary from '@tabtabgo/web/components/ErrorBoundary';

const fallbackLng = ['en'];
const availableLanguages = ['en'];

i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: false,
    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
    },
  });

const history = createBrowserHistory({ basename: AppSettings.basename });

//MomentUtils.prototype.getStartOfMonth = MomentUtils.prototype.startOfMonth;

class CustomMomentUtils extends MomentUtils {
  dateFormat = AppSettings.defaultDateFormat;
}

setupServices(Store.dispatch);
const componentToUseProps = setupComponents();

ReactDOM.render(
  <Suspense fallback={<LinearProgress />}>
    <ComponentProvider {...componentToUseProps}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={CustomMomentUtils}>
          <Provider store={Store}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <ErrorProvider>
                <ConfirmationDialogProvider>
                  <AuthenticationProvider LoadingPage={LoadingPage} configuration={{}}>
                    <UserSettingsProvider>
                      <Notifier />
                      <Router history={history}>
                        <ErrorBoundary>
                          <SwitchRoutes routes={indexRoutes}></SwitchRoutes>
                        </ErrorBoundary>
                      </Router>
                    </UserSettingsProvider>
                  </AuthenticationProvider>
                </ConfirmationDialogProvider>
              </ErrorProvider>
            </SnackbarProvider>
          </Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ComponentProvider>
  </Suspense>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
