import React from 'react';
import authRoutes from 'ttg-identity/routes.js';
import LoginPage from 'ttg-identity/pages/Login/LoginPage';
import { arrayUnique } from '@tabtabgo/core/Utilities';

//TODO convert route to object so be easily to merge and override
var authRoutesArray = authRoutes('/');
var loginRoute = authRoutesArray.find((r) => r.path.endsWith('/login'));
//var logoutRoute = authRoutes.find(r => r.path==="/login");
const customizedLogin = (props) => (
  <LoginPage
    {...props}
    title="Admin Portal"
    canRegister={false}
    canRecoverPassword={true}
    loginType="usernamePassword"
  />
);

const pagesRoutes = [
  {
    ...loginRoute,
    showButton: false,
    component: customizedLogin,
  },

  // TODO add error pages ( 404 and 500)
];
export default arrayUnique(pagesRoutes.concat(authRoutesArray), (a, b) => a.path === b.path);
