/* eslint-disable no-console */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as StandardValidations from '@tabtabgo/core/Validations.js';
import * as StandardValidationsErrors from '@tabtabgo/core/ValidationErrors.js';
import withValidation from './withValidation';
import { ValidationFormContext } from './Form';
import { ComponentContext } from '@tabtabgo/core';
import { getInputValue, isEmpty, getFriendlyString } from '@tabtabgo/core/Utilities';
import _ from 'lodash';

const iniValidatorState = {
  originalValue: undefined,
  value: undefined,
  validations: {},
  validationErrors: {},
  isValid: true,
  isDirty: false,
  isTouched: false,
  validationError: '',
}

function Validator(props) {
  const [state, setState] = useState(setInitValidationState(initState, props));
  const validationCtx = useContext(ValidationFormContext);
  const componentContext = useContext(ComponentContext);
  useEffect(() => {
    if (!_.isEqual(state.originalValue, props.originalValue)) {
      setState({ ...state, originalValue: props.originalValue });
    }
  }, [props.originalValue]);

  useEffect(() => {
    onComponentUpdated();
  }, [props, props.name, props.isRequired])

  useEffect(() => {
    const {
      name,
      id,
      isRequired,
      inputComponentRef,
    } = props;

    if (validationCtx?.registerValidationInput) {
      validationCtx.registerValidationInput(name ? name : id, {
        isRequired,
        validate: async () => {
          const { name, isRequired } = props;
          const value = getValue(props);
          //console.log("Run input Validate", value);
          return await validateInput(value, name, null, isRequired);
        },
      });
    }

    if (inputComponentRef) {
      inputComponentRef(this);
    }
  }, [])

  const onComponentUpdated = async () => {
    const {
      name,
      isRequired,
    } = props;
    let newValue = getValue(props);
    let oldValue = getValue(state);
    if (!_.isEqual(newValue, oldValue)) {
      //console.log("validation :", name, newValue, oldValue);
      await validateInput(newValue, name, validationCtx.setValidationState, isRequired);
    }
    //Logically not required
    if (!_.isEqual(state.originalValue, props.originalValue)) {
      let newState = {
        isDirty: !_.isEqual(props.originalValue, newValue),
        originalValue: props.originalValue,
      };
      // console.group("componentDidUpdate");
      // console.log("value", newValue);
      // console.log("original", props.originalValue);
      // console.log("newState :", newState);
      // console.groupEnd();
      setState(newState);
    }
  }
  /*
  Get the Value passed to input and can be set directly or by InputProps
  */
  const getValue = (privateProps) => {
    const { value } = privateProps;
    return value;
  };

  const getPlaceholder = (privateProps) => {
    const { name, id } = privateProps;

    //if (placeholder) return placeholder;
    if (name) return getFriendlyString(name);
    if (id) getFriendlyString(id);

    return 'This ';
  };

  const parseValidations = (privateProps) => {
    var newValidations = {};
    const { validations, isRequired } = privateProps;

    if (validations)
      for (let key in validations) {
        if (validations[key]) {
          var validation = validations[key];
          if (typeof validation === 'function') {
            newValidations[key] = validation;
          } else if (StandardValidations[key]) {
            if (typeof validation === 'boolean' && validation === true) {
              newValidations[key] = StandardValidations[key].bind(this);
            } else if (typeof validation !== 'boolean') {
              newValidations[key] = StandardValidations[key].bind(this, validation);
            }
          } else {
            console.error(
              `${key} is not valid validator please pass valid standard validation or set validation function`,
            );
          }
        }
      }
    if (isRequired && !newValidations.required) {
      newValidations = {
        ...newValidations,
        required: StandardValidations.required,
      };
    }

    return newValidations;
  };

  const parseValidationErrors = (privateProps) => {
    var newValidationsErrors = {};
    const { validations, validationErrors, isRequired } = privateProps;

    if (validations) {
      for (let key in validations) {
        if (validations[key]) {
          var validation = validations[key];

          if (validationErrors && validationErrors[key])
            newValidationsErrors[key] = validationErrors[key];
          else {
            if (typeof validation !== 'boolean') {
              newValidationsErrors[key] = StandardValidationsErrors[key](
                validation,
                getPlaceholder(props),
              );
            } else {
              newValidationsErrors[key] = StandardValidationsErrors[key](
                getPlaceholder(props),
              );
            }
          }
        }
      }
    }

    if (isRequired && validationErrors && validationErrors.required) {
      newValidationsErrors = {
        ...newValidationsErrors,
        required: validationErrors.required,
      };
    } else {
      newValidationsErrors = {
        ...newValidationsErrors,
        required: StandardValidationsErrors.required(getPlaceholder(props)),
      };
    }
    return newValidationsErrors;
  };

  const setInitValidationState = (internalState, internalProps) => {
    let validations = parseValidations(internalProps);
    let validationErrors = parseValidationErrors(internalProps);
    return Object.assign({}, internalState, { validations, validationErrors });
  };

  const handleChange = (newValue, event, sname) => {
    const { onChange } = props;
    if (onChange) onChange(event ? event : newValue);
  };
  //TODO should validate onBlur first time when value is empty only ?.
  const handleBlur = async (newValue, event, sName) => {
    const {
      onBlur,
      isRequired
    } = props;

    await validateInput(newValue, sName, validationCtx.setValidationState, isRequired);
    if (onBlur) {
      onBlur(event ? event : newValue);
    }

    return true;
  };

  const validateInput = async (newValue, sName, setFormState, isRequired = false, dirtyState = null) => {
    let newState = dirtyState || {
      isDirty: !_.isEqual(state.originalValue, newValue),
      isValid: true,
      validationError: '',
    };

    //if (newState.isDirty === true)
    //{
    if (props.error === true) {
      newState = Object.assign({}, newState, {
        isValid: false,
        validationError: props.helperText,
      });
    } else {
      let validationResult = await validate(newValue, sName, isRequired);

      newState = Object.assign({}, newState, validationResult);
    }
    //}

    // if (name === "chargeAfterDate") {
    //   console.group("validateInput");
    //   console.log("input Name", name);
    //   console.log("value", newValue);
    //   console.log("original", state.originalValue);
    //   console.log("newState", newState);
    //   console.groupEnd();
    // }

    // set new inputIsValid
    setState(newState);
    //Update form isDirty and isValidate
    if (setFormState) {
      setFormState(name, newState);
    }
    return newState;
  };

  /// Check is input is dirty
  const isDirty = () => state.isDirty;
  // Check is input valid
  const isValid = () => state.isValid;
  // Get error message if input is not Valid
  const error = () => state.error;
  const validatingInput = (result, newState, validationError) => {
    if (result) {
      newState.isValid = true;
      newState.validationError = null;
    } else {
      newState.isValid = false;
      newState.validationError = validationError;
    }
    //console.log("validatingInput :", newState);
    return newState;
  };

  //Validate value based on register validation
  const validate = async (newValue, name, isRequired) => {
    let newState = {
      isValid: true,
      validationError: '',
    };
    let validations = state.validations;
    let validationErrors = state.validationErrors;
    if (props.ignoreRegisteredValidation) {
      validations = parseValidations(props);
      validationErrors = parseValidationErrors(props);
    }

    for (let key in validations) {
      if (validations[key]) {
        var validation = validations[key];
        if (validation && !isEmpty(newValue)) {
          let validationResult = validation(newValue);

          if (validationResult.then) {
            try {
              newState.isValid = false;
              newState.validationError = 'Validating...';
              let result = await validationResult;
              newState = validatingInput(result, newState, validationErrors[key]);
              if (newState.isValid === false) {
                break;
              }
            } catch (error) {
              //TODO should failed
              newState.isValid = false;
              newState.validationError = validationErrors[key];
              //console.log("Failed to validate error :", error);
            }
          } else {
            newState = validatingInput(validationResult, newState, validationErrors[key]);
            if (newState.isValid === false) {
              break;
            }
          }
        } else if (isRequired && isEmpty(newValue)) {
          newState.isValid = false;
          newState.validationError = StandardValidationsErrors.required(
            getPlaceholder(props),
          );
          break;
        }
      }
    }
    //console.log("newState :", name, newValue,  newState);
    if (props.onValidate) {
      props.onValidate(newState.isValid, newState.validationError);
    }

    return newState;
  };

  const getLabel = (internalProps) => {
    const { label, textFieldProps } = internalProps;
    let strLabel = label;

    if (textFieldProps && textFieldProps.label) {
      strLabel = componentContext.getFormInputLabel({
        isRequired,
        ignoreLabelSuffix,
        label: textFieldProps.label,
      });
    } else if (label) {
      strLabel = componentContext.getFormInputLabel({
        isRequired,
        ignoreLabelSuffix,
        label,
      });
    }
    return strLabel;
  }

  const render = (internalProps) => {
    const {
      name,
      id,
      component,
      // eslint-disable-next-line no-unused-vars
      originalValue,
      // eslint-disable-next-line no-unused-vars
      validations,
      // eslint-disable-next-line no-unused-vars
      validationErrors,
      textFieldProps,
      // eslint-disable-next-line no-unused-vars
      form,
      // eslint-disable-next-line no-unused-vars
      inputComponentRef,
      helperText,
      label,
      ignoreLabelSuffix,
      // eslint-disable-next-line no-unused-vars
      ignoreRegisteredValidation,
      ...rest
    } = internalProps;


    const Component = component;
    const finalLabel = getLabel(internalProps);

    //Set validator props
    let validatorProps = {};
    if (!isEmpty(textFieldProps)) {
      validatorProps.textFieldProps = { ...textFieldProps, label: finalLabel };
    }

    // console.log("name :", name);
    // console.log("state.isValid :", state.isValid);
    // console.log("state.isDirty :", state.isValid);
    // console.log("state.validationError :", state.validationError);
    return (
      <Component
        {...rest}
        //success={state.isValid && state.isDirty}
        error={!state.isValid}
        label={getLabel()}
        helperText={state.validationError ? state.validationError : helperText}
        id={id}
        name={name}
        onChange={(event) => handleChange(getInputValue(event), event, name ? name : id)}
        value={getValue(internalProps)}
        onBlur={(event) => handleBlur(getInputValue(event), event, name ? name : id)}
        {...validatorProps}
      //onFocus={event => handleFocus(event, name ? name : id)}
      >
        {internalProps.children}
      </Component>
    );
  }

  return render();
}

Validator.propTypes = {
  classes: PropTypes.object,
  styles: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,
  onValidate: PropTypes.func,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  originalValue: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  form: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node,
  textFieldProps: PropTypes.object,
  ignoreLabelSuffix: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inputComponentRef: PropTypes.func,
  ignoreRegisteredValidation: PropTypes.bool,
};

export default Validator;
