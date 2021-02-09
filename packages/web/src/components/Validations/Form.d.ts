export const ValidationFormContext: React.Context<{}>;
export default class ValidationForm extends React.Component<any, any, any> {
    static propTypes: {
        onValidate: PropTypes.Requireable<(...args: any[]) => any>;
        onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        onReset: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Requireable<any>;
    };
    constructor(props: any);
    registerValidationInput: (inputName: any, props: any) => void;
    setValidationState: (inputName: any, newState?: {
        isDirty: boolean;
        isValid: boolean;
        validationError: any;
    }) => void;
    isDirty: () => boolean;
    isValid: () => boolean;
    errors: () => any[];
    getStats: () => {
        total: number;
        dirty: number;
        valid: number;
    };
    setFormState: (state: any, callBack: any) => void;
    updateFormState: (validationInputs: any) => void;
    handleOnSubmit: (event: any) => Promise<void>;
    handleOnRest: (event: any) => void;
    validate: () => Promise<{
        isValid: boolean;
        isDirty: boolean;
    }>;
}
export const ValidationFormConsumer: React.Consumer<{}>;
import React from "react";
import PropTypes from "prop-types";
