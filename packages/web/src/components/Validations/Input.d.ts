/// <reference types="react" />
export declare type ValidationInputProps = {
    id?: string;
    name?: string;
    label: string;
    namespace?: string;
    type?: string;
    margin?: string;
    inputProps?: any;
    InputProps?: any;
    isRequired?: boolean;
    validations?: object;
    validationErrors?: object;
    value: any;
    originalValue?: any;
    onChange?: any;
    onBlur?: any;
    children?: any;
    [key: string]: any;
};
declare const ValidationInput: (props: ValidationInputProps) => JSX.Element;
export default ValidationInput;
