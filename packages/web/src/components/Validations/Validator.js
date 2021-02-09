/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as StandardValidations from '@tabtabgo/core/Validations.js';
import * as StandardValidationsErrors from '@tabtabgo/core/ValidationErrors.js';
import withValidation from './withValidation';
import { withComponentProvider } from '../../ComponentProvider';
import { getInputValue, isEmpty, getFriendlyString } from '@tabtabgo/core/Utilities';
import _ from 'lodash';

class Validator extends Component {
  static propTypes = {
    classes: PropTypes.object,
    styles: PropTypes.object,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.string,
    validation: PropTypes.shape({
      isDirty: PropTypes.bool,
      isValid: PropTypes.bool,
      validationErrors: PropTypes.array,
      setValidationState: PropTypes.func,
      registerValidationInput: PropTypes.func,
    }),
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
    componentProvider: PropTypes.shape({
      getFormInputLabel: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    let initState = {
      originalValue: null,
      validations: {},
      validationErrors: {},
      isValid: true,
      isDirty: false,
      isTouched: false,
      validationError: '',
    };
    this.isRegisteredToForm = false;
    this.state = this.setInitValidationState(initState, props);
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(state.originalValue, props.originalValue)) {
      return {
        originalValue: props.originalValue,
      };
    }

    return null;
  }

  async componentDidUpdate(prevProps) {
    const {
      name,
      validation: { setValidationState },
      isRequired,
    } = this.props;
    let newValue = this.getValue(this.props);
    let oldValue = this.getValue(prevProps);
    if (!_.isEqual(newValue, oldValue)) {
      //console.log("validation :", name, newValue, oldValue);
      await this.validateInput(newValue, name, setValidationState, isRequired);
    }
    //Logically not required
    if (!_.isEqual(prevProps.originalValue, this.props.originalValue)) {
      let newState = {
        isDirty: !_.isEqual(this.props.originalValue, newValue),
        originalValue: this.props.originalValue,
      };
      // console.group("componentDidUpdate");
      // console.log("value", newValue);
      // console.log("original", this.props.originalValue);
      // console.log("newState :", newState);
      // console.groupEnd();
      this.setState(newState);
    }
  }

  componentDidMount() {
    const {
      name,
      id,
      isRequired,
      validation: { registerValidationInput },
      inputComponentRef,
    } = this.props;

    if (registerValidationInput) {
      registerValidationInput(name ? name : id, {
        isRequired,
        validate: async () => {
          const { name, isRequired } = this.props;
          const value = this.getValue(this.props);
          //console.log("Run input Validate", value);
          return await this.validateInput(value, name, null, isRequired);
        },
      });
    }

    if (inputComponentRef) {
      inputComponentRef(this);
    }
  }
  /*
  Get the Value passed to input and can be set directly or by InputProps
  */
  getValue = (props) => {
    const { value } = props;
    return value;
  };

  getPlaceholder = (props) => {
    const { name, id } = props;

    //if (placeholder) return placeholder;
    if (name) return getFriendlyString(name);
    if (id) getFriendlyString(id);

    return 'This ';
  };

  parseValidations = (props) => {
    var newValidations = {};
    const { validations, isRequired } = props;

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

  parseValidationErrors = (props) => {
    var newValidationsErrors = {};
    const { validations, validationErrors, isRequired } = props;

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
                this.getPlaceholder(this.props),
              );
            } else {
              newValidationsErrors[key] = StandardValidationsErrors[key](
                this.getPlaceholder(this.props),
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
        required: StandardValidationsErrors.required(this.getPlaceholder(props)),
      };
    }
    return newValidationsErrors;
  };

  setInitValidationState = (state, props) => {
    let validations = this.parseValidations(props);
    let validationErrors = this.parseValidationErrors(props);
    return Object.assign({}, state, { validations, validationErrors });
  };

  handleChange = (newValue, event) => {
    const { onChange } = this.props;
    if (onChange) onChange(event ? event : newValue);
  };
  //TODO should validate onBlur first time when value is empty only ?.
  handleBlur = async (newValue, event, name) => {
    const {
      onBlur,
      isRequired,
      validation: { setValidationState },
    } = this.props;

    await this.validateInput(newValue, name, setValidationState, isRequired);
    if (onBlur) {
      onBlur(event ? event : newValue);
    }

    return true;
  };

  validateInput = async (newValue, name, setFormState, isRequired = false, dirtyState = null) => {
    let newState = dirtyState || {
      isDirty: !_.isEqual(this.state.originalValue, newValue),
      isValid: true,
      validationError: '',
    };

    //if (newState.isDirty === true)
    //{
    if (this.props.error === true) {
      newState = Object.assign({}, newState, {
        isValid: false,
        validationError: this.props.helperText,
      });
    } else {
      let validationResult = await this.validate(newValue, name, isRequired);

      newState = Object.assign({}, newState, validationResult);
    }
    //}

    // if (name === "chargeAfterDate") {
    //   console.group("validateInput");
    //   console.log("input Name", name);
    //   console.log("value", newValue);
    //   console.log("original", this.state.originalValue);
    //   console.log("newState", newState);
    //   console.groupEnd();
    // }

    // set new inputIsValid
    this.setState(newState);
    //Update form isDirty and isValidate
    if (setFormState) {
      setFormState(name, newState);
    }
    return newState;
  };

  /// Check is input is dirty
  isDirty = () => this.state.isDirty;
  // Check is input valid
  isValid = () => this.state.isValid;
  // Get error message if input is not Valid
  error = () => this.state.error;
  validatingInput = (result, newState, validationError) => {
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
  validate = async (newValue, name, isRequired) => {
    let newState = {
      isValid: true,
      validationError: '',
    };
    let validations = this.state.validations;
    let validationErrors = this.state.validationErrors;
    if (this.props.ignoreRegisteredValidation) {
      validations = this.parseValidations(this.props);
      validationErrors = this.parseValidationErrors(this.props);
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
              newState = this.validatingInput(result, newState, validationErrors[key]);
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
            newState = this.validatingInput(validationResult, newState, validationErrors[key]);
            if (newState.isValid === false) {
              break;
            }
          }
        } else if (isRequired && isEmpty(newValue)) {
          newState.isValid = false;
          newState.validationError = StandardValidationsErrors.required(
            this.getPlaceholder(this.props),
          );
          break;
        }
      }
    }
    //console.log("newState :", name, newValue,  newState);
    if (this.props.onValidate) {
      this.props.onValidate(newState.isValid, newState.validationError);
    }

    return newState;
  };

  render() {
    const {
      name,
      id,
      component,
      // eslint-disable-next-line no-unused-vars
      isRequired,
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
      componentProvider,
      ...rest
    } = this.props;

    let currentValue = this.getValue(this.props);
    const Component = component;

    if (currentValue === undefined) {
      //console.log("name of undefined value", name);
    }

    let handleChange = (event) => this.handleChange(getInputValue(event), event, name ? name : id);
    let handleBlur = (event) => this.handleBlur(getInputValue(event), event, name ? name : id);

    let finalLabel = label;

    if (textFieldProps && textFieldProps.label) {
      finalLabel = componentProvider.getFormInputLabel({
        isRequired,
        ignoreLabelSuffix,
        label: textFieldProps.label,
      });
    } else if (label) {
      finalLabel = componentProvider.getFormInputLabel({
        isRequired,
        ignoreLabelSuffix,
        label,
      });
    }

    //Set validator props
    let validatorProps = {};
    if (!isEmpty(textFieldProps)) {
      validatorProps.textFieldProps = { ...textFieldProps, label: finalLabel };
    }

    // console.log("name :", name);
    // console.log("this.state.isValid :", this.state.isValid);
    // console.log("this.state.isDirty :", this.state.isValid);
    // console.log("this.state.validationError :", this.state.validationError);
    return (
      <Component
        {...rest}
        //success={this.state.isValid && this.state.isDirty}
        error={!this.state.isValid}
        label={finalLabel}
        helperText={this.state.validationError ? this.state.validationError : helperText}
        id={id}
        name={name}
        onChange={handleChange}
        value={currentValue}
        onBlur={handleBlur}
        {...validatorProps}
        //onFocus={event => this.handleFocus(event, name ? name : id)}
      >
        {this.props.children}
      </Component>
    );
  }
}

export default withValidation(withComponentProvider(Validator));
