import React from 'react';
// root Route where add special routes such as login auth and etc
import Pages from 'layouts/Pages.jsx';
import Main from 'layouts/Main.jsx';

import theme from 'assets/jss/theme.jsx';

import pageRoutes from './pages.jsx';
import footerRoutes from './footer.jsx';
import mainRoutes from './main.jsx';
import userRoutes from './user.jsx';

import { MuiThemeProvider } from '@material-ui/core';
import brand from 'brand';

const customizedPage = (props) => (
  <MuiThemeProvider theme={theme}>
    <Pages {...props} brand={brand} pageRoutes={pageRoutes} footerRoutes={footerRoutes} />
  </MuiThemeProvider>
);

const customizedMain = (props) => (
  <MuiThemeProvider theme={theme}>
    <Main
      {...props}
      brand={{ ...brand, link: null }}
      mainRoutes={mainRoutes}
      userRoutes={userRoutes}
      footerRoutes={footerRoutes}
    />
  </MuiThemeProvider>
);

//import Auth from "ttg-identity/web/routes.js";
var indexRoutes = [
  { path: '/login', name: 'Login', component: customizedPage },
  {
    path: '/',
    name: 'Home',
    component: customizedMain,
    requiredAuthorization: ['Admin'],
    redirectPath: '/login',
  },
];

export default indexRoutes;
