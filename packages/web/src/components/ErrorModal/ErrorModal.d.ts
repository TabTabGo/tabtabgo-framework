/// <reference types="react" />
import { TTGError } from '@tabtabgo/core/build/types/TTGError';
export declare type ErrorModalProps = {
    isError: boolean;
    onClose: (e?: any) => void;
    error?: TTGError;
};
export declare const ErrorModal: ({ isError, onClose, error }: ErrorModalProps) => JSX.Element;
