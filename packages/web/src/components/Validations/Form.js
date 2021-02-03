/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

export const ValidationFormContext = React.createContext({});

export default class ValidationForm extends Component {
  static propTypes = {
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    children: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      isValid: true,
      validationErrors: [],
      validationInputs: {},
    };
  }

  registerValidationInput = (inputName, props) => {
    if (!this.state.validationInputs[inputName]) {
      let state = {
        isDirty: false,
        isValid: true,
        validationError: null,
        ...props,
      };
      //console.log(`registerValidationInput ${inputName} :`, state);
      var newValidationInputs = Object.assign(this.state.validationInputs, {
        [inputName]: state,
      });
      this.updateFormState(newValidationInputs);
    }
  };

  setValidationState = (
    inputName,
    newState = {
      isDirty: false,
      isValid: true,
      validationError: null,
    },
  ) => {
    // console.log("inputName :", inputName);
    // console.log("newState :", newState);
    // console.log(`setValidationState ${inputName} :`, this.state.validationInputs);
    if (inputName) {
      var newValidationInputs = update(this.state.validationInputs, {
        [inputName]: { $merge: newState },
      });
      this.updateFormState(newValidationInputs);
    }
  };
  /// Check is input is dirty
  isDirty = () => this.state.isDirty;
  // Check is input valid
  isValid = () => this.state.isValid;
  // Get error message if input is not Valid
  errors = () =>
    Object.keys(this.state.validationInputs)
      .filter((key) => this.state.validationInputs[key].validationError, this)
      .map((key) => this.state.validationInputs[key].validationError, this);

  getStats = () => ({
    total: Object.keys(this.state.validationInputs).length,
    dirty: Object.keys(this.state.validationInputs).filter(
      (key) => this.state.validationInputs[key].isDirty,
      this,
    ).length,
    valid: Object.keys(this.state.validationInputs).filter(
      (key) => this.state.validationInputs[key].isValid,
      this,
    ).length,
  });

  setFormState = (state, callBack) => {
    this.setState(state, () => {
      if (callBack && typeof callBack === 'function') callBack(this.state);
    });
  };

  updateFormState = (validationInputs) => {
    var stateObj = {
      isDirty: false,
      isValid: true,
      validationInputs,
    };
    //check for isDirty
    for (let key in validationInputs) {
      let inputState = validationInputs[key];
      if (inputState.isDirty) {
        stateObj.isDirty = inputState.isDirty;
        break;
      }
    }
    // check if input not valid or it is Required and not value passed
    for (let key in validationInputs) {
      let inputState = validationInputs[key];
      if (!inputState.isValid) {
        stateObj.isValid = inputState.isValid;
        break;
      }
    }

    //console.log("stateObj:" , stateObj);
    this.setState(stateObj, () => {
      if (this.props.onValidate) {
        this.props.onValidate(this.state.isValid, this.state.isDirty, this.getStats());
      }
    });
  };

  handleOnSubmit = async (event) => {
    event.persist();
    const { onSubmit } = this.props;
    await this.validate();
    if (this.state.isDirty && this.state.isValid && onSubmit) {
      onSubmit(event, () => {
        this.setState({ isDirty: false });
      });
    }
    event.preventDefault();
  };

  handleOnRest = (event) => {
    const { onReset } = this.props;
    if (this.state.isDirty) {
      //TODO add confirmation to lose data
    }
    if (onReset) {
      onReset(event);
      event.preventDefault();
    }
  };

  validate = async () => {
    var isValid = true;
    var isDirty = false;
    // check if input not valid or it is Required and not value passed
    for (let key in this.state.validationInputs) {
      let inputState = this.state.validationInputs[key];
      let validation = await inputState.validate();

      if (!validation.isValid) {
        isValid = validation.isValid;
        //break; //To validate all data
      }
      isDirty = isDirty || validation.isDirty;
    }

    this.setState({ isValid, isDirty }, () => {
      if (this.props.onValidate) {
        this.props.onValidate(this.state.isValid, this.state.isDirty, this.getStats());
      }
    });
    return { isValid, isDirty };
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { onValidate, ...rest } = this.props;

    return (
      <ValidationFormContext.Provider
        value={{
          isDirty: this.state.isDirty,
          isValid: this.state.isValid,
          validate: this.validate.bind(this),
          validationErrors: this.errors(),
          setFormState: this.setFormState.bind(this),
          setValidationState: this.setValidationState.bind(this),
          registerValidationInput: this.registerValidationInput.bind(this),
        }}
      >
        <form
          {...rest}
          onSubmit={this.handleOnSubmit.bind(this)}
          onReset={this.handleOnRest.bind(this)}
        >
          {this.props.children}
        </form>
      </ValidationFormContext.Provider>
    );
  }
}

export const ValidationFormConsumer = ValidationFormContext.Consumer;
