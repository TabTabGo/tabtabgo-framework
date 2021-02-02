import React from 'react';
import MaskedInput from 'react-text-mask';

export interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  mask: Array<string | RegExp>;
  placeholderChar: string;
}

export default function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={props.mask}
      placeholderChar={props.placeholderChar}
      showMask
    />
  );
}
