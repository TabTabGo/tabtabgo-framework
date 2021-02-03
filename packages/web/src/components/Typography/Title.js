/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

import titleStyle from './titleStyle';

class Title extends React.Component {
  render() {
    const { classes, title, subtitle, gutterBottom } = this.props;

    return (
      <React.Fragment>
        <h2 className={classes.title}>
          {title}
          {subtitle && <small>{subtitle}</small>}
        </h2>
        {gutterBottom === true && <br />}
      </React.Fragment>
    );
  }
}

Title.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  theme: PropTypes.object,
  gutterBottom: PropTypes.bool,
};

export default withTheme(withStyles(titleStyle)(Title));
