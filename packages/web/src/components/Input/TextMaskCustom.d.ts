/// <reference types="react" />
export interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
    mask: Array<string | RegExp>;
    placeholderChar: string;
}
export default function TextMaskCustom(props: TextMaskCustomProps): JSX.Element;
