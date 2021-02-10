import React, { useContext } from 'react';

import { AuthenticationContext, AuthenticationContextProps } from './providers/AuthenticationProvider';
import { Subtract } from 'utility-types';
export interface AuthenticationComponent {
  identity?: AuthenticationContextProps;
}

function withAuthentication<T extends AuthenticationComponent>(
  Component: React.ComponentType<T>
) {
  const authContex = useContext(AuthenticationContext);
  return class extends React.Component<Subtract<T, AuthenticationComponent>> {
    render() {
      return <Component {...(this.props as T)} identity={authContex} />;
    }
  };
}

export default withAuthentication;
