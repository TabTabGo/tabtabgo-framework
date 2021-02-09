/// <reference types="react" />
import { InputLabelProps } from '@material-ui/core/InputLabel';
declare type labelFunction = (props?: any) => string;
export declare type FormInputLabelProps = InputLabelProps & {
    ignoreLabelSuffix?: boolean;
    isRequired: boolean;
    label: string | labelFunction;
};
export default function FormInputLabel(props: FormInputLabelProps): string | JSX.Element | labelFunction;
export {};
