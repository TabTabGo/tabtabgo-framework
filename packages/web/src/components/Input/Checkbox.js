import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, Checkbox, Typography } from '@material-ui/core';

const style = (theme) => {
  return {
    checkboxFormControl: {
      marginTop: theme.spacing(4),
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

class ValidationCheckbox extends Component {
  static propTypes = {
    classes: PropTypes.object,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
  };

  render() {
    const { classes, label, error, helperText, ...rest } = this.props;

    return (
      <FormControl component="fieldset" className={classes.checkboxFormControl}>
        <FormControlLabel
          style={{ marginTop: -2, color: error ? 'red' : 'inherit' }}
          control={<Checkbox {...rest} />}
          label={label}
        />
        {error && helperText && <Typography variant="caption">{helperText}</Typography>}
      </FormControl>
    );
  }
}
export default withTheme(withStyles(style)(ValidationCheckbox));
