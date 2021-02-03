//https://github.com/JedWatson/react-select/blob/master/src/Async.js
import React, { Component } from 'react';
import Select from 'react-select';
import { handleInputChange } from 'react-select/lib/utils';

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
};

export default class Async extends Component {
  static defaultProps = defaultProps;

  constructor(props) {
    super();
    this.optionsCache = {};
    this.state = {
      defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
      inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
      isLoading: props.defaultOptions === true ? true : false,
      loadedOptions: [],
      passEmptyOptions: false,
    };
  }
  componentDidMount() {
    this.mounted = true;
    const { defaultOptions } = this.props;
    const { inputValue } = this.state;
    if (defaultOptions === true) {
      this.loadOptions(inputValue, this.handleSetOptions);
    }
  }
  componentDidUpdate(prevProps) {
    // if the cacheOptions prop changes, clear the cache
    if (prevProps.cacheOptions !== this.props.cacheOptions) {
      this.optionsCache = {};
    }
    if (prevProps.defaultOptions !== this.props.defaultOptions) {
      this.setState({
        defaultOptions: Array.isArray(this.props.defaultOptions)
          ? this.props.defaultOptions
          : undefined,
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  focus() {
    this.select.focus();
  }
  blur() {
    this.select.blur();
  }

  loadOptions(inputValue, callback = this.handleSetOptions) {
    const { loadOptions } = this.props;
    if (!loadOptions) return callback();
    if (!this.state.isLoading) this.setState({ isLoading: true });

    const loader = loadOptions(inputValue, callback);
    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback());
    }
  }
  handleSetOptions = (options) => {
    if (!this.mounted) return;
    const isLoading = !!this.lastRequest;
    this.setState({ defaultOptions: options || [], isLoading });
  };

  handleInputChange = (newValue, actionMeta) => {
    const { cacheOptions, onInputChange } = this.props;
    // TODO
    const inputValue = handleInputChange(newValue, actionMeta, onInputChange);

    if (!inputValue) {
      delete this.lastRequest;
      this.setState({
        inputValue: '',
        loadedInputValue: '',
        loadedOptions: [],
        isLoading: false,
        passEmptyOptions: false,
      });
      return;
    }

    if (cacheOptions && this.optionsCache && this.optionsCache[inputValue]) {
      this.setState({
        inputValue,
        loadedInputValue: inputValue,
        loadedOptions: this.optionsCache[inputValue],
        isLoading: false,
        passEmptyOptions: false,
      });
    } else {
      const request = (this.lastRequest = {});
      this.setState(
        {
          inputValue,
          isLoading: true,
          passEmptyOptions: !this.state.loadedInputValue,
        },
        () => {
          this.loadOptions(inputValue, (options) => {
            if (!this.mounted) return;
            if (options) {
              this.optionsCache[inputValue] = options;
            }
            if (request !== this.lastRequest) return;
            delete this.lastRequest;
            this.setState({
              isLoading: false,
              loadedInputValue: inputValue,
              loadedOptions: options || [],
              passEmptyOptions: false,
            });
          });
        },
      );
    }
    return inputValue;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { value, cacheOptions, loadOptions, selectRef, ...props } = this.props;
    let { getOptionValue } = this.props;
    const {
      defaultOptions,
      inputValue,
      isLoading,
      loadedInputValue,
      loadedOptions,
      passEmptyOptions,
    } = this.state;
    const options = passEmptyOptions
      ? []
      : inputValue && loadedInputValue
      ? loadedOptions
      : defaultOptions || [];
    getOptionValue = getOptionValue ? getOptionValue : (option) => option.value;

    let optionValue = options.find((o) => getOptionValue(o) === value);

    return (
      <Select
        {...props}
        ref={(ref) => {
          this.select = ref;
          if (selectRef) selectRef(ref);
        }}
        options={options}
        onMenuClose={() => this.setState({ menuIsOpen: false })}
        onMenuOpen={() => this.setState({ menuIsOpen: true })}
        menuIsOpen={this.state.menuIsOpen}
        value={optionValue}
        inputValue={inputValue}
        isLoading={isLoading}
        onInputChange={this.handleInputChange}
      />
    );
  }
}
