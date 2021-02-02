/* eslint-disable no-console */
/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AsyncSelect from 'react-select/async';
import { withStyles, Typography, TextField, Paper, Chip, MenuItem } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import autoCompleteStyle from './autoCompleteStyle';

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      margin="normal"
      fullWidth
      error={props.selectProps ? props.selectProps.error : false}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
      onChange={(e) => {
        //console.log('combo text', e.target.value)
      }}
      helperText={
        props.selectProps && props.selectProps.helperText
          ? props.selectProps.helperText
          : props.selectProps.textFieldProps
          ? props.selectProps.textFieldProps.helperText
          : undefined
      }
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  //console.log("placeholder props", props);
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
      onBlur={(event) => event.preventDefault()}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      style={{ height: 24 }}
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  if (props.disabled) return null;
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class AutoComplete extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  handleBlur = (e) => {
    const { onBlur, value } = this.props;
    if (onBlur) {
      onBlur(value, e);
    }
  };

  render() {
    const {
      classes,
      theme,
      placeholder,
      onChange,
      value,
      className,
      selectComponent,
      selectRef,
      // eslint-disable-next-line no-unused-vars
      textFieldProps,
      defaultOptions,
      cacheOptions,
      disabled,
      ...rest
    } = this.props;

    let SelectComponent = selectComponent ? selectComponent : AsyncSelect;

    const selectStyles = {
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
      dropdownIndicator: (base) => ({
        ...base,
        paddingBottom: 4,
        paddingRight: 4,
        cursor: 'pointer',
      }),
      clearIndicator: (base) => ({
        ...base,
        paddingBottom: 4,
        cursor: 'pointer',
      }),
      indicatorSeparator: (base) => ({ ...base, visibility: 'collapse' }),
    };

    if (textFieldProps) {
      textFieldProps.value = value || '';

      textFieldProps.InputLabelProps = {
        shrink: placeholder !== '',
      };
    }

    return (
      <SelectComponent
        {...rest}
        ref={(ref) => {
          if (selectRef) selectRef(ref);
        }}
        isDisabled={disabled}
        textFieldProps={textFieldProps}
        className={className}
        classes={classes}
        styles={selectStyles}
        components={components}
        value={value}
        defaultOptions={defaultOptions === undefined ? true : defaultOptions}
        cacheOptions={cacheOptions === undefined ? true : cacheOptions}
        menuPortalTarget={document.body}
        menuPosition={'absolute'}
        menuPlacement={'bottom'}
        onChange={onChange}
        onBlur={this.handleBlur.bind(this)}
        placeholder={placeholder}
      />
    );
  }
}
export default withStyles(autoCompleteStyle, { withTheme: true })(AutoComplete);
