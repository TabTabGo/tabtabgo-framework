/// <reference types="react" />
import { TextFieldProps } from '@material-ui/core/TextField';
import './styles.less';
import './flags.png';
declare type CountrySelectProps = TextFieldProps & {
    value?: string;
    disabled?: boolean;
    defaultValue?: string;
    onChange: (country: Country) => void;
};
export default function CountrySelect({ value, onChange, disabled, defaultValue, ...textFieldProps }: CountrySelectProps): JSX.Element;
interface Country {
    name: string;
    regions: Array<string>;
    iso2: string;
    dialCode: string;
    format?: string;
    order?: number;
    areaCodes?: Array<string>;
}
export {};
