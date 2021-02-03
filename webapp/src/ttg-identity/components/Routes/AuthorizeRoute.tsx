/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { AuthenticationContext } from '@tabtabgo/core/providers/AuthenticationProvider';
import { SessionUser } from '@tabtabgo/core/types/SessionUser';
type AuthorizeRouteProps = {
  [key: string]: any;
  roles: string | Array<string>;
  redirectPath?: string;
};

const AuthorizeRoute = ({ roles, redirectPath, ...resetProps }: AuthorizeRouteProps) => {
  const { isAuthenticated, user } = useContext(AuthenticationContext);
  const history = useHistory();

  const hasRole = (user: SessionUser) => {
    if (user && user.roles && Array.isArray(user.roles)) {
      if (!roles) return false;
      if (Array.isArray(roles)) {
        for (let index = 0; index < roles.length; index++) {
          const role = roles[index];
          let userRole = user.roles.find((r) => r === role);

          if (userRole !== undefined) return true;
        }
        return false;
      } else {
        return user.roles.find((r) => r === roles) !== undefined;
      }
    }
    return false;
  };
  // console.group("AuthorizeRoute");
  // //console.log("path", this.props.path);
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("user :", user);
  // console.log("redirectPath :", redirectPath ? redirectPath : "/");

  if (user) {
    let isAuthorized = hasRole(user);
    //console.log("isAuthorized :", isAuthorized);
    if (isAuthenticated && user && isAuthorized) {
      // console.groupEnd();
      return <Route {...resetProps} />;
    }
  }
  // console.groupEnd();
  return (
    <Redirect
      to={{
        pathname: redirectPath ? redirectPath : '/',
        state: { from: history.location },
      }}
    />
  );
};

export default AuthorizeRoute;
