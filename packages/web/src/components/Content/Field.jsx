import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

class Field extends React.Component {
  static propTypes = {
    fullWidth: PropTypes.bool,
    stacked: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  };

  render() {
    const { label, value, stacked, fullWidth } = this.props;

    let computedValue =
      typeof value === 'function' ? value() : <Typography variant="body1">{value}</Typography>;

    if (stacked === true) {
      const stackedGridProps = {
        xs: fullWidth ? 12 : 8,
        sm: fullWidth ? 12 : 6,
        md: fullWidth ? 12 : 4,
      };

      return (
        <Grid item {...stackedGridProps}>
          <Typography variant="body1">
            <strong>{label}</strong>
          </Typography>
          <div style={{ marginTop: 8, marginBottom: 8 }}>{computedValue}</div>
        </Grid>
      );
    }

    return (
      <React.Fragment>
        <Grid item xs={4} sm={3} md={2}>
          <Typography variant="body1">
            <strong>{label}</strong>
          </Typography>
        </Grid>
        <Grid item xs={8} sm={fullWidth === true ? 9 : 3} md={fullWidth === true ? 10 : 4}>
          {computedValue}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Field;
