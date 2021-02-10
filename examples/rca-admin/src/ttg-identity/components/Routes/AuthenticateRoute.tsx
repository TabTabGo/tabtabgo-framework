/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '@tabtabgo/core/providers/AuthenticationProvider';
type AuthenticateRouteProps = {
  [key: string]: any;
  redirectPath?: string;
};
const AuthenticateRoute = ({ redirectPath, ...resetProps }: AuthenticateRouteProps) => {
  const { isAuthenticated, user } = useContext(AuthenticationContext);
  const history = useHistory();

  // console.group('AuthenticateRoute');
  // //console.log('path', props.path);
  // console.log('isAuthenticated', isAuthenticated);
  // console.log('user :', user);
  // console.log('redirectPath :', redirectPath );
  // console.groupEnd();

  if (isAuthenticated && user) return <Route {...resetProps} />;
  else
    return (
      <Redirect
        to={{
          pathname: redirectPath ? redirectPath : '/login',
          state: { from: history.location },
        }}
      />
    );
};
export default AuthenticateRoute;
