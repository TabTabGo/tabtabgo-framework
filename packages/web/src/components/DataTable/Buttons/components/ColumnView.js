import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

import {
  Popover,
  IconButton,
  Checkbox,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Tooltip,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  spacer: {},
  actions: {},
  title: {},
});

class ColumnViewAction extends Component {
  static propTypes = {
    classes: PropTypes.object,
    columns: PropTypes.array,
    changeColumnProperties: PropTypes.func,
  };
  state = {
    anchorEl: null,
  };

  handleChangeColumnDisplay = (columnName) => (e) => {
    //console.log("this.props.changeColumnProperties :", this.props.changeColumnProperties);
    if (this.props.changeColumnProperties) {
      this.props.changeColumnProperties(columnName, 'hide', !e.target.checked);
    }
  };
  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { columns, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return [
      <Tooltip title="View Columns" key={0}>
        <IconButton
          onClick={this.handlePopoverOpen.bind(this)}
          aria-owns={open ? 'columnViewPopover' : undefined}
          aria-haspopup="true"
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>,

      <Popover
        id="columnViewPopover"
        key={1}
        anchorEl={anchorEl}
        open={open}
        onClose={this.handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Columns</FormLabel>
            <FormGroup>
              {columns &&
                columns.map((c, key) => {
                  if (!c.isFixed) {
                    return (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            checked={!c.hide}
                            onChange={this.handleChangeColumnDisplay(c.name)}
                            value={c.name}
                          />
                        }
                        label={c.label}
                      />
                    );
                  }
                  return null;
                })}
            </FormGroup>
            {/*<FormHelperText />*/}
          </FormControl>
        </div>
      </Popover>,
    ];
  }
}
export default withStyles(styles)(ColumnViewAction);
