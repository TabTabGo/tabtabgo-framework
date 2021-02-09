/// <reference types="react" />
declare type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: (e?: any) => void;
    onConfirm: (e?: any) => void;
    title: string;
    text: string;
    namespace?: string;
};
declare const ConfirmationModal: ({ isOpen, onClose, onConfirm, title, text }: ConfirmationModalProps) => JSX.Element;
export default ConfirmationModal;
