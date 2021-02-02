import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

const style = (theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(1),
    marginBottom: 0,
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
});

class FieldSet extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object,
    gutterBottom: PropTypes.bool,
    children: PropTypes.array,
  };

  static defaultProps = {
    gutterBottom: true,
  };

  render() {
    const { classes, theme, gutterBottom, children } = this.props;

    const rootClassName = gutterBottom ? classes.root + ' ' + classes.gutterBottom : classes.root;

    return (
      <Grid container className={rootClassName} spacing={2}>
        {children}
      </Grid>
    );
  }
}

export default withStyles(style, { withTheme: true })(FieldSet);
