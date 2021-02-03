import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  CircularProgress,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import dialogStyle from './styles/dialogStyle';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConfirmDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    children: PropTypes.node,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    isBusy: PropTypes.bool,
    error: PropTypes.string,
    classes: PropTypes.any,
  };

  render() {
    const {
      open,
      title,
      message,
      cancelLabel,
      confirmLabel,
      onConfirm,
      onCancel,
      isBusy,
      classes,
      error,
    } = this.props;

    return (
      <div>
        <Dialog
          fullWidth
          TransitionComponent={Transition}
          keepMounted={false}
          open={open}
          onClose={this.handleCancel}
          aria-labelledby="confirm-dialog-title"
        >
          <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
            {this.props.children}
          </DialogContent>
          <DialogActions>
            {!isBusy && error && <div className={classes.errorContainer}>{error}</div>}
            <Button onClick={onCancel} disabled={isBusy} color="primary">
              {cancelLabel ? cancelLabel : 'Cancel'}
            </Button>

            {isBusy ? (
              <div>
                <CircularProgress style={{ margin: 8 }} size={24} />
              </div>
            ) : (
              <Button onClick={onConfirm} color="primary" disabled={isBusy}>
                {confirmLabel ? confirmLabel : 'Confirm'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(dialogStyle)(ConfirmDialog);
