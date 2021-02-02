import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, CircularProgress } from '@material-ui/core';

export default class ProgressOverlay extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  render() {
    const { open } = this.props;

    return (
      <div>
        <Dialog
          fullWidth
          keepMounted={false}
          open={open}
          disableBackdropClick
          disableEscapeKeyDown
          PaperComponent={'div'}
        >
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              padding: 32,
            }}
          >
            <CircularProgress color="primary" />
          </div>
        </Dialog>
      </div>
    );
  }
}
