/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomButton from 'components/CustomButtons/Button';
import { Button, CircularProgress } from '@material-ui/core';
import { ValidationFormConsumer } from './Form';

export default class ValidationButton extends Component {
  static propTypes = {
    ignoreDirty: PropTypes.bool,
    ignoreValidation: PropTypes.bool,
    isBusy: PropTypes.bool,
    round: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.any,
    ignoreValidationOnSubmit: PropTypes.bool,
  };

  render() {
    let {
      ignoreDirty,
      ignoreValidation,
      isBusy,
      round,
      ignoreValidationOnSubmit,
      ...rest
    } = this.props;
    if (ignoreDirty === undefined) ignoreDirty = false;
    if (ignoreValidation === undefined) ignoreValidation = false;

    const ButtonComponent = round === true ? CustomButton : Button;

    return (
      <ValidationFormConsumer>
        {({ isDirty, isValid, validate, setFormState }) => {
          //refactor round code out to a custom button
          const buttonProps = round ? { round, ...rest } : { ...rest };

          if (this.props.isBusy) {
            return (
              <div className={this.props.className}>
                <CircularProgress style={{ margin: 8 }} size={30} />;
              </div>
            );
          }
          // console.log("Validation Button",
          //   {
          //     disable: this.props.disabled,
          //     isBusy,
          //     ignoreDirty,
          //     isDirty,
          //     ignoreValidation,
          //     isValid
          //   }
          // );
          return (
            <ButtonComponent
              {...buttonProps}
              disabled={
                isBusy ||
                this.props.disabled ||
                !(ignoreDirty || isDirty) ||
                !(ignoreValidation || isValid)
              }
              onClick={async (e) => {
                e.persist();
                var validationState = {
                  isDirty: true,
                  isValid: true,
                };
                if (!ignoreValidationOnSubmit) {
                  validationState = await validate();
                }

                // console.log(
                //   "validate",
                //   validationState.isDirty,
                //   validationState.isValid
                // );
                if (
                  (ignoreDirty || validationState.isDirty) &&
                  (ignoreValidation || validationState.isValid)
                ) {
                  const { onClick } = this.props;
                  if (onClick) onClick(e, () => setFormState({ isDirty: false }));
                }
              }}
              className={this.props.className}
            >
              {this.props.children}
            </ButtonComponent>
          );
        }}
      </ValidationFormConsumer>
    );
  }
}
