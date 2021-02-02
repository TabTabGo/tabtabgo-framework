import React, { useState, useEffect } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { allCountries } from './country_data';
import './styles.less';
import './flags.png';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  autoComplete: {
    width: '100%',
  },
});

type CountrySelectProps = TextFieldProps & {
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange: (country: Country) => void;
};

const getCountryByCode = (value?: string) => {
  var country = value
    ? allCountries.find((c: any) => c.iso2.toLowerCase() === value.toLowerCase())
    : null;
  //console.log('value', value, country);
  return country;
};

export default function CountrySelect({
  value,
  onChange,
  disabled,
  defaultValue,
  ...textFieldProps
}: CountrySelectProps) {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState<Country>(getCountryByCode(value));

  useEffect(() => {
    //console.log('value', value)
    if (typeof value === 'string' && selectedCountry?.iso2?.toUpperCase() !== value.toUpperCase()) {
      setSelectedCountry(getCountryByCode(value));
    }
  }, [value]);

  return (
    <Autocomplete
      id="country-select"
      options={allCountries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      disabled={disabled}
      getOptionLabel={(option) => option?.name || ''}
      renderOption={(option) => (
        <React.Fragment>
          <span className={`flag ${option?.iso2} margin`} />
          {`${option?.name} (${option?.iso2.toUpperCase()})`}
        </React.Fragment>
      )}
      className={classes.autoComplete}
      value={selectedCountry}
      onChange={(event: any, newValue?: any) => {
        setSelectedCountry(newValue);
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          fullWidth={true}
          inputProps={{
            ...params.inputProps,
            ...textFieldProps.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          InputProps={{
            ...params.InputProps,
            ...textFieldProps.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <div
                  className={`flag ${selectedCountry?.iso2} selected`}
                  style={{
                    marginTop: '-18px',
                    marginLeft: '10px',
                    /** TODO for some reason styles.less is not updated */
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

interface Country {
  name: string;
  regions: Array<string>;
  iso2: string;
  dialCode?: string;
  priority?: string;
  format?: string;
  hasAreaCodes?: boolean;
}
