import React, { useState } from 'react';

import { TTGError } from 'ttg-react/core/types/TTGError';
import { ErrorModal } from '../components/ErrorModal/ErrorModal';
const ErrorContext = React.createContext({
  showError: (error: TTGError) => {},
  isError: false,
});

type ErrorProviderProps = {
  children: React.ReactElement;
};
export const ErrorProvider = (props: ErrorProviderProps) => {
  const [error, setError] = useState<TTGError>();
  const [showErrorFlag, setShowError] = useState(false);

  const showError = (error: TTGError) => {
    setError(error);
    setShowError(true);
  };

  const closeModal = (e: any) => {
    setError(undefined);
    setShowError(false);
  };

  const { children } = props;

  return (
    <ErrorContext.Provider
      value={{
        showError: showError,
        isError: showErrorFlag,
      }}
    >
      <ErrorModal error={error} isError={showErrorFlag} onClose={closeModal} />
      {children}
    </ErrorContext.Provider>
  );
};

export const withError = (WrapperComponent: any) => (props: any) => (
  <ErrorContext.Consumer>
    {(state) => <WrapperComponent context={{ ...props.context, ...state }} {...props} />}
  </ErrorContext.Consumer>
);
