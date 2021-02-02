import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { ValidationFormContext } from './Form';

const withValidation = (Component) => {
  class WithValidation extends React.Component {
    render() {
      return (
        <ValidationFormContext.Consumer>
          {(context) => {
            const { innerRef, ...other } = this.props;
            return <Component ref={innerRef} validation={context} {...other} />;
          }}
        </ValidationFormContext.Consumer>
      );
    }
  }

  WithValidation.displayName = `withValidation(${getDisplayName(Component)})`;
  hoistNonReactStatic(WithValidation, Component);
  return WithValidation;
};

export default withValidation;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
