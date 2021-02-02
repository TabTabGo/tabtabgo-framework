/* eslint-disable react/prop-types */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from './actions';
import { withError } from '../../contexts/ErrorContext';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const DismissButton = withStyles({
  root: {
    color: '#fff',
    marginLeft: 32,
    fontWeight: 500,
  },
})(Button);

class Notifier extends React.Component {
  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;

    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }

    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach((notification) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      //console.log('notification', notification);
      const isError = notification.options?.variant === 'error';
      const error = notification.options?.error;
      this.props.enqueueSnackbar(notification.message, {
        ...notification.options,
        action: isError ? (
          <DismissButton onClick={() => this.props.context.showError(error)}>Details</DismissButton>
        ) : null,
        onClose: (event, reason, key) => {
          if (notification?.options?.onClose) {
            notification.options.onClose(event, reason, key);
          }
          // Dispatch action to remove snackbar from redux store
          this.props.removeSnackbar(key);
        },
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      //this.props.removeSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (store) => ({
  notifications: store.notifications.notifications,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeSnackbar }, dispatch);

export default withError(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notifier)));
