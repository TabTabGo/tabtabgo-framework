import { FormInputLabelProps } from './components/FormInputLabel/FormInputLabel';
import { ErrorModalProps } from './components/ErrorModal/ErrorModal';
export declare type WebComponentProviderProps = {
    errorModal?: any;
    formInputLabel?: any;
};
export declare const WebComponentProvider: ({ errorModal, formInputLabel }: WebComponentProviderProps) => {
    getErrorModal: (props: ErrorModalProps) => any;
    getFormInputLabel: (props: FormInputLabelProps) => any;
};
