import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

const style = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(1.5),
    },
    selectedFilter: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: theme.shape.borderRadius,
    },
  };
};

class FilterButtonGroup extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  handleChange(event, value) {
    if (this.props.onChange) {
      this.props.onChange(event, value);
    }
  }

  render() {
    const { value, filters, classes, disabled } = this.props;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange.bind(this)}
        showLabels
        className={classes.root}
      >
        {filters &&
          filters.map((filter) => (
            <BottomNavigationAction
              disabled={disabled}
              key={filter.value}
              label={filter.label}
              value={filter.value}
              classes={{ selected: classes.selectedFilter }}
            />
          ))}
      </BottomNavigation>
    );
  }
}

export default withTheme(withStyles(style)(FilterButtonGroup));
