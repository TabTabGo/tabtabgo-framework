import React, { useContext } from 'react';
import { ValidationFormContext } from './Form';
import { Subtract } from 'utility-types';

export interface ValidationComponent {
  validation?: any;
}

function withValidation<T extends ValidationComponent>(Component: React.ComponentType<T>) {
  const context = useContext(ValidationFormContext);
  return class extends React.Component<Subtract<T, ValidationComponent>> {
    render() {
      return <Component validation={context} {...(this.props as T)} />;
    }
  };
}

export default withValidation;
