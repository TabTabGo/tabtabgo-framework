/* eslint-disable no-console */
import React, { useContext } from 'react';

import { TextField } from '@material-ui/core';
import Validator from './Validator';
import { makeStyles } from '@material-ui/core/styles';
import { ValidationFormContext } from './Form';
import { useTranslation } from 'react-i18next';
import { AppSettings } from '@tabtabgo/core/Appsettings';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme: any) => ({
  textArea: {
    ...theme.custom.styles.textField,
    width: (props: any) => props.width,
  },
}));

export type ValidationInputProps = {
  id?: string;
  name?: string;
  label: string;
  namespace?: string;
  type?: string;
  margin?: string;
  inputProps?: any; //TODO Create props for input
  InputProps?: any; //TODO Create props for input
  isRequired?: boolean;
  validations?: object;
  validationErrors?: object;
  value: any;
  originalValue?: any;
  onChange?: any; //TODO PropTypes.func.isRequired,
  onBlur?: any; //TODO PropTypes.func;
  children?: any; //TODO reach children
  [key: string]: any;
};

const ValidationInput = (props: ValidationInputProps) => {
  const classes = useStyles(props);
  const context = useContext(ValidationFormContext);
  const { t } = useTranslation(
    AppSettings && AppSettings.translationNamespaces
      ? AppSettings && AppSettings.translationNamespaces
      : ['common'],
  );
  /*
  Get the Value passed to input and can be set directly or by InputProps
  */
  const getValue = (props: ValidationInputProps) => {
    const { value, inputProps, InputProps } = props;
    let currentValue = value;
    if (!currentValue && inputProps && inputProps.value !== undefined)
      currentValue = inputProps.value;
    if (!currentValue && InputProps && InputProps.value !== undefined)
      currentValue = InputProps.value;
    return currentValue;
  };

  const {
    name,
    type,
    id,
    label,
    inputProps,
    margin,
    isRequired,
    validations,
    onChange,
    onBlur,
    originalValue,
    namespace,
    ...rest
  } = props;

  let currentValue = getValue(props);
  let inputType = type;
  if (inputProps && inputProps.type) {
    inputType = inputProps.type;
  }
  let inputComponent: any;
  let inputDefaultProps = {} as any;
  switch (inputType) {
    case 'phone':
      //inputComponent = TextField;
      break;
    case 'date':
      inputComponent = KeyboardDatePicker;
      //inputDefaultProps.autoOk = true;
      if (inputProps && inputProps.format) {
        inputDefaultProps.format = inputProps.format;
      }
      //inputDefaultProps.disableToolbar = true;
      //console.log('currentValue :',name, currentValue);
      break;
    case 'textArea':
      inputComponent = TextField;
      inputDefaultProps.multiline = true;
      inputDefaultProps.className = classes.textArea;
      inputDefaultProps.type = 'text';
      break;
    default:
      inputComponent = TextField;
      inputDefaultProps.type = inputType || 'text';
      break;
  }

  return (
    <Validator
      {...inputDefaultProps}
      {...rest}
      id={id}
      name={name}
      label={t(`${namespace || 'common'}:${label}`)}
      onChange={onChange}
      value={currentValue}
      originalValue={originalValue}
      onBlur={onBlur}
      isRequired={isRequired}
      validations={validations}
      margin={margin || 'normal'}
      inputProps={{
        ...inputProps,
      }}
      component={inputComponent}
      validation={context}
    >
      {props.children}
    </Validator>
  );
};

export default ValidationInput;
