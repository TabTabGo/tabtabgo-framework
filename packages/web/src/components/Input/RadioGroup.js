import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
} from '@material-ui/core';

const style = (theme) => {
  return {
    formGroup: {
      flexDirection: 'row',
    },
    formControl: {
      marginTop: theme.spacing(2),

      '& legend': {
        fontSize: '13px',
        fontWeight: 400,
        marginBottom: 'unset',
      },
    },
  };
};

class ValidationRedioGroup extends Component {
  static propTypes = {
    classes: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.node,
      }),
    ).isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
  };

  render() {
    const { classes, options, label, error, helperText, ...rest } = this.props;

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" style={{ color: error ? 'red' : 'inherit' }}>
          {label}
        </FormLabel>
        <RadioGroup className={classes.formGroup} {...rest}>
          {options.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              label={item.label}
              control={<Radio color="primary" />}
              labelPlacement="end"
            />
          ))}
        </RadioGroup>
        {error && helperText && (
          <FormHelperText error={error} style={{ marginTop: 0 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
export default withTheme(withStyles(style)(ValidationRedioGroup));
