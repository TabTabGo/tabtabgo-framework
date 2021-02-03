import { FormInputLabelProps } from './FormInputLabel';

const FormInputLabel = ({ isRequired, ignoreLabelSuffix, label }: FormInputLabelProps) => {
  if (!ignoreLabelSuffix && isRequired && label) {
    return typeof label === 'string' ? label + ' *' : label() + ' *';
  }

  return label;
};

export default FormInputLabel;
