import React from 'react';
import { InputLabelProps } from '@material-ui/core/InputLabel';

type labelFunction = (props?: any) => string;
export type FormInputLabelProps = InputLabelProps & {
  ignoreLabelSuffix?: boolean;
  isRequired: boolean;
  label: string | labelFunction;
};

export default function FormInputLabel(props: FormInputLabelProps) {
  const { ignoreLabelSuffix, isRequired, label } = props;
  if (!ignoreLabelSuffix) {
    if (!isRequired && label && typeof label === 'string') {
      return (
        <span>
          {label + ' '}
          <small>{' (Optional)'}</small>
        </span>
      );
    }
  }

  return label;
}
