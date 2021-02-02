import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { InputAdornment } from '@material-ui/core';
import ValidationInput from '../components/Validations/Input';

import passwordInputStyle from './styles/passwordInputStyle';
import { Tooltip, Typography, Hidden } from '@material-ui/core';

class PasswordInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    showRequirements: PropTypes.bool,
    InputProps: PropTypes.object,
  };

  static defaultProps = {
    showRequirements: false,
  };

  state = {
    showPassword: false,
  };

  getContentView() {
    // eslint-disable-next-line no-unused-vars
    const { classes, InputProps, showRequirements, ...rest } = this.props;

    return (
      <ValidationInput
        {...rest}
        type={this.state.showPassword ? 'text' : 'password'}
        InputProps={{
          ...InputProps,
          autoComplete: 'off',
          classes: { input: classes.inputWithEndAdornment },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() =>
                  this.setState((state) => ({
                    showPassword: !state.showPassword,
                  }))
                }
                className={classes.inputAdornmentIconButton}
              >
                {this.state.showPassword ? (
                  <VisibilityOff className={classes.inputAdornmentIcon} />
                ) : (
                  <Visibility className={classes.inputAdornmentIcon} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  getRequirements(color) {
    return (
      <div>
        <Typography variant="caption" color={color}>
          Must be at least 6 characters long
          <br />
          Must include at least one number
          <br />
          Must include at least one uppercase character
          <br />
          Must include at least one non-alphanumeric character
        </Typography>
      </div>
    );
  }

  render() {
    if (this.props.showRequirements) {
      return (
        <React.Fragment>
          <Hidden smDown>
            <Tooltip title={this.getRequirements('inherit')} placement="top">
              {this.getContentView()}
            </Tooltip>
          </Hidden>
          <Hidden mdUp>
            {this.getContentView()}
            {this.getRequirements('black')}
          </Hidden>
        </React.Fragment>
      );
    }

    return this.getContentView();
  }
}

export default withStyles(passwordInputStyle)(PasswordInput);
