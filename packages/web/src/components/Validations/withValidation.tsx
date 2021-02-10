import React, { useContext } from 'react';
import { ValidationFormContext } from './Form';
import { Subtract } from 'utility-types';

export interface ValidationComponent {
  validation?: any;
}

function withValidation<T extends ValidationComponent>(Component: React.ComponentType<T>) {
  return function (props: Subtract<T, ValidationComponent>) {
    const context = useContext(ValidationFormContext);
    return <Component validation={context} {...(props as T)} />;
  };
}

export default withValidation;
