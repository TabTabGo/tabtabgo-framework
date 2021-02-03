import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { AuthenticationContext } from './providers/AuthenticationProvider';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    render() {
      return (
        <AuthenticationContext.Consumer>
          {(context) => {
            const { innerRef, ...other } = this.props;
            return <Component ref={innerRef} identity={context} {...other} />;
          }}
        </AuthenticationContext.Consumer>
      );
    }
  }

  WithAuthentication.displayName = `withAuthentication(${getDisplayName(Component)})`;
  hoistNonReactStatic(WithAuthentication, Component);
  return WithAuthentication;
};

export default withAuthentication;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
