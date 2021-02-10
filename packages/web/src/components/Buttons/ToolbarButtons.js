/* eslint-disable no-console */
import React, { Component } from 'react';
//import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Button, IconButton, Tooltip } from '@material-ui/core';

import { getTooltip, getLabel } from './utilities';

class ToolbarButtons extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    nameSingularText: PropTypes.string,
    namePluralText: PropTypes.string,
    buttons: PropTypes.object,
    defaultColor: PropTypes.string,
    selected: PropTypes.any,
    data: PropTypes.any,
  };

  getButton(icon, label, button, onClick, disabled, className, color) {
    const { classes } = this.props;

    let isDisabled = typeof disabled === 'function' ? disabled(this.props) : disabled;
    if (label) {
      const labelText = getLabel(button, this.props);
      return (
        <Button
          aria-label={labelText}
          className={`${classes.button} ${className}`}
          disabled={isDisabled}
          color={color}
          startIcon={icon}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(this.props, e);
          }}
        >
          {labelText}
        </Button>
      );
    }

    if (icon) {
      return (
        <IconButton
          className={`${classes.iconButton} ${className}`}
          aria-label={getLabel(button, this.props)}
          disabled={isDisabled}
          color={color}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(this.props, e);
          }}
        >
          {icon && typeof icon === 'function' ? icon(this.props) : icon}
        </IconButton>
      );
    }

    return <div />;
  }

  render() {
    const { classes, buttons, defaultColor } = this.props;
    //console.log('buttons :', buttons);
    return (
      <div className={classes.buttons}>
        {buttons &&
          Object.keys(buttons).map((aKey, key) => {
            let button = buttons[aKey];
            const { component, icon, label, onClick, disabled, hide, className } = button;
            if (
              hide &&
              ((typeof hide === 'function' && hide(this.props)) ||
                (typeof hide === 'boolean' && hide === true))
            ) {
              return null;
            }
            if (component) return component(this.props, key);
            return (
              <Tooltip title={getTooltip(button, this.props)} key={key}>
                {this.getButton(
                  icon,
                  label && getLabel(button, this.props),
                  button,
                  onClick,
                  disabled,
                  className,
                  button.color || defaultColor,
                )}
              </Tooltip>
            );
          }, this)}
      </div>
    );
  }
}

const toolbarButtonsStyles = () => ({
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '1 0 25%',
    textAlign: 'right',
  },
  button: {},
  iconButton: {},
});

export default withStyles(toolbarButtonsStyles)(ToolbarButtons);
