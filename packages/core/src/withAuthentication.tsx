import React, { useContext } from 'react';

import {
  AuthenticationContext,
  AuthenticationContextProps,
} from './providers/AuthenticationProvider';
import { Subtract } from 'utility-types';
export interface AuthenticationComponent {
  identity?: AuthenticationContextProps;
}

function withAuthentication<T extends AuthenticationComponent>(Component: React.ComponentType<T>) {
  return function (props: Subtract<T, AuthenticationComponent>) {
    const authContex = useContext(AuthenticationContext);
    return <Component {...(props as T)} identity={authContex} />;
  };
}

export default withAuthentication;
