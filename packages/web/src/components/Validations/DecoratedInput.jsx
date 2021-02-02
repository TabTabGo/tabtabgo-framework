import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

import decoratedInputStyle from './jss/decoratedInputStyle.jsx';

class DecoratedInput extends React.Component {
  render() {
    const { classes, icon, input } = this.props;

    return (
      <div className={classes.decoratedInputContainer}>
        <div className={classes.detachedAdornmentContainer}>{icon}</div>
        {input}
      </div>
    );
  }
}

DecoratedInput.propTypes = {
  classes: PropTypes.object,
  icon: PropTypes.element,
  input: PropTypes.element.isRequired,
};

export default withTheme(withStyles(decoratedInputStyle)(DecoratedInput));
