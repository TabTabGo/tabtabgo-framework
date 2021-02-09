/// <reference types="react" />
import NumberFormat, { NumberFormatProps } from 'react-number-format';
export interface NumberFormatCustomProps extends Partial<NumberFormatProps> {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: {
        target: {
            value: string;
        };
    }) => void;
}
export default function NumberFormatCustom(props: NumberFormatCustomProps): JSX.Element;
