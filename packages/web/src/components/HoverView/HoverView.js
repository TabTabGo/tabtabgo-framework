import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import hoverViewStyle from './hoverViewStyle';

class HoverView extends React.Component {
  render() {
    const { classes, children, hoverContent } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>{children}</div>
        <div className={classes.hoverContent}>{hoverContent}</div>
      </div>
    );
  }
}

HoverView.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  hoverContent: PropTypes.node,
};

export default withStyles(hoverViewStyle)(HoverView);
