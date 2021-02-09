/// <reference types="react" />
import { DialogProps } from '@material-ui/core/Dialog';
declare type ModalAction = {
    requireValidation?: boolean;
    ignoreDirty?: boolean;
    disabled?: boolean;
    label: string;
    function?: (item: any) => any;
    [key: string]: any;
    component?: (props: any) => any;
};
declare type BaseModalProps = DialogProps & {
    loading?: boolean;
    title: string;
    actions?: Array<ModalAction>;
    children: any;
    onSubmit?: (event: any, callback?: () => void) => void;
    formRef?: (ref: any) => void;
};
declare const BaseModal: ({ title, actions, children, loading, onSubmit, formRef, ...dialogProps }: BaseModalProps) => JSX.Element;
export default BaseModal;
