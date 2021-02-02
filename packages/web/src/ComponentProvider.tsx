import React from 'react';
import defaultInputLabel, { FormInputLabelProps } from './components/FormInputLabel/FormInputLabel';
import { ErrorModal, ErrorModalProps } from './components/ErrorModal/ErrorModal';

export type WebComponentProviderProps = {
  errorModal?: any;
  formInputLabel?: any;
};
export const WebComponentProvider = ({ errorModal, formInputLabel }: WebComponentProviderProps) => {
  return {
    getErrorModal: (props: ErrorModalProps) => {
      //("errorModel :", errorModel);
      if (errorModal) {
        return errorModal;
      }
      return <ErrorModal {...props} />;
    },

    getFormInputLabel: (props: FormInputLabelProps) => {
      if (formInputLabel) {
        return formInputLabel(props);
      }
      return defaultInputLabel(props);
    },
  };
};
