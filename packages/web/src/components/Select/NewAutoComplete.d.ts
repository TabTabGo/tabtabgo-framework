/// <reference types="react" />
import 'isomorphic-fetch';
import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { TextFieldProps } from '@material-ui/core/TextField';
declare type AsynchronousProps<T> = Partial<AutocompleteProps<T>> & {
    loadOptions?: (inputValue: string) => Promise<T[]>;
    getOptionValue: (option: T) => any;
    textFieldProps?: TextFieldProps;
    isClearable?: boolean;
    onChange: (value: T, event?: any) => void;
    error?: boolean;
    label: string;
    helperText?: string;
    id?: string;
    name: string;
    value: T;
};
export default function Asynchronous({ loadOptions, getOptionValue, textFieldProps, isClearable, onChange, error, label, helperText, id, name, value, ...autoCompleteProps }: AsynchronousProps<any>): JSX.Element;
export {};
