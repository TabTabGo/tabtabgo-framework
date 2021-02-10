// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteCloseReason,
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { TextFieldProps } from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import throttle from 'lodash/throttle';
import { InputAdornment } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {});

type AsynchronousProps<T> = Partial<AutocompleteProps<T, false, false, false>> & {
  loadOptions?: (inputValue: string) => Promise<T[]>;
  getOptionValue: (option: T) => any;
  textFieldProps?: TextFieldProps;
  isClearable?: boolean;
  onChange: (value: T, event?: any) => void;
  error?: boolean;
  label: string;
  helperText?: string;
  id?: string;
  name: string;
  value: T;
};

export default function Asynchronous({
  loadOptions,
  getOptionValue,
  textFieldProps,
  isClearable,
  onChange,
  error,
  label,
  helperText,
  id,
  name,
  value,
  ...autoCompleteProps
}: AsynchronousProps<any>) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [localOptions, setLocalOptions] = React.useState<any[]>(autoCompleteProps.options || []);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const fetchOptions = React.useMemo(
    () =>
      throttle((query: string, callBack: (results: any[]) => void) => {
        if (loadOptions) {
          setLoading(true);
          loadOptions(query)
            .then((response: any[]) => {
              callBack(response);
            })
            .catch((error: any) => {
              console.log(`Failed to load options for input ${query}:`, error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }, 200),
    [],
  );

  /// Load first 20
  React.useEffect(() => {
    let active = true;
    if (fetchOptions) {
      fetchOptions('', (results: any[]) => {
        if (active) {
          setLocalOptions(results);
        }
      });
    }
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    const valueLabel =
      autoCompleteProps && autoCompleteProps.getOptionLabel
        ? autoCompleteProps.getOptionLabel(value)
        : value;
    if (!value || valueLabel !== inputValue) {
      fetchOptions(inputValue, (results: any[]) => {
        if (active) {
          setLocalOptions(results);
        }
      });
    }

    return () => {
      active = false;
    };
  }, [inputValue, fetchOptions]);

  const handleChangeValue = (event: any, value: any) => {
    onChange(value, event);
  };
  // const getOption = async (query: string) => {

  //   if (loadOptions) {
  //     setLoading(true);
  //     try {
  //       var result = await loadOptions(query);
  //       console.log("result :", result);
  //       if (active) setLocalOptions(result);
  //     } catch (error) {}
  //     setLoading(false);
  //   }
  // };
  const validationTextFieldProps = {
    error,
    label,
    helperText,
    name,
  } as any;

  return (
    <Autocomplete
      classes={classes}
      id={id || `autocomplete_${name}`}
      getOptionSelected={(option: any, value: any) =>
        getOptionValue(option) === getOptionValue(value)
      }
      includeInputInList
      {...autoCompleteProps}
      open={open}
      onOpen={(e: React.ChangeEvent<{}>) => {
        setOpen(true);
        if (autoCompleteProps.onOpen) {
          autoCompleteProps.onOpen(e);
        }
      }}
      onClose={(e: React.ChangeEvent<{}>) => {
        setOpen(false);
        if (autoCompleteProps.onClose) {
          autoCompleteProps.onClose(e, 'toggleInput');
        }
      }}
      onChange={handleChangeValue}
      value={value}
      options={localOptions}
      loading={loading}
      autoComplete
      onInputChange={(
        e: React.ChangeEvent<{}>,
        value: string,
        reason: 'input' | 'reset' | 'clear',
      ) => {
        setInputValue(value);
        if (autoCompleteProps.onInputChange) {
          autoCompleteProps.onInputChange(e, value, reason);
        }
      }}
      renderInput={(params: AutocompleteRenderInputParams) => {
        if (autoCompleteProps.renderInput) return autoCompleteProps.renderInput(params);
        return (
          <TextField
            {...params}
            {...validationTextFieldProps}
            {...textFieldProps}
            fullWidth
            InputProps={{
              ...params.InputProps,
              ...textFieldProps?.InputProps,
              endAdornment: (
                <React.Fragment>
                  <InputAdornment position="end">
                    {loading && <CircularProgress size={16} color="secondary" />}
                  </InputAdornment>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
}
