import React from 'react';
import LoginPage from './pages/Login/LoginPage';
import Logout from './pages/Logout';
//import RegisterPage from "views/Pages/RegisterPage";
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecoveryPage';
import ResetPassword from './pages/ResetPassword/ResetPasswordPage';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
// @material-ui/icons
//import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from '@material-ui/icons/Fingerprint';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Lock from '@material-ui/icons/Lock';

const authRoutes = (authProps = {}) => {
  const customizedLogin = (props) => <LoginPage {...props} {...authProps.login} />;
  return [
    {
      path: (authProps.basename || '') + '/login',
      name: 'Login Page',
      short: 'Login',
      mini: 'LP',
      icon: ExitToApp,
      component: customizedLogin,
      showButton: true,
    },
    {
      path: (authProps.basename || '') + '/logout',
      name: 'Logout',
      short: 'Logout',
      mini: 'LO',
      icon: ExitToApp,
      component: Logout,
      showButton: false,
    },
    {
      path: (authProps.basename || '') + '/auth/resetPassword',
      name: 'Reset Password',
      short: 'reset',
      mini: 'RS',
      icon: Lock,
      component: ResetPassword,
      showButton: false,
    },
    {
      path: (authProps.basename || '') + '/auth/passwordRecovery',
      name: 'Password Recovery',
      short: 'recovery',
      mini: 'PR',
      icon: Lock,
      component: PasswordRecovery,
      showButton: false,
    },
    {
      path: (authProps.basename || '') + '/auth/confirmEmail',
      name: 'Confirm Email Page',
      short: 'Confirm Email',
      mini: 'CE',
      icon: Fingerprint,
      component: EmailConfirmation,
      showButton: false,
    },
  ];
};

export default authRoutes;
