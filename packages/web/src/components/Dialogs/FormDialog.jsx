import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Hidden,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import dialogStyle from './styles/dialogStyle';
import ValidationForm from 'ttg-react/web/components/Validations/Form';
import FormButton from 'ttg-react/web/components/Validations/Button';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FormDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    isBusy: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.node,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmLabel: PropTypes.string,
    contentText: PropTypes.string,
    classes: PropTypes.any,
  };

  state = {
    open: true,
  };

  handleConfirm = () => {
    this.props.onConfirm();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  getContentView() {
    const { isBusy, error, classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.contentText}</DialogContentText>
          {this.props.children}
        </DialogContent>
        <DialogActions>
          {!isBusy && error && <div className={classes.errorContainer}>{error}</div>}
          <Button onClick={this.handleCancel} color="primary" disabled={isBusy}>
            Cancel
          </Button>
          <FormButton onClick={this.handleConfirm} color="primary" isBusy={isBusy}>
            {this.props.confirmLabel ? this.props.confirmLabel : 'Add'}
          </FormButton>
        </DialogActions>
      </React.Fragment>
    );
  }

  render() {
    const { open } = this.props;

    const dialogProps = {
      TransitionComponent: Transition,
      keepMounted: false,
      open: open,
      onClose: this.handleCancel,
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
      'aria-labelledby': 'form-dialog-title',
    };

    return (
      <div>
        <ValidationForm onSubmit={this.handleConfirm}>
          <Hidden smDown>
            <Dialog fullWidth maxWidth="md" {...dialogProps}>
              {this.getContentView()}
            </Dialog>
          </Hidden>
          <Hidden mdUp>
            <Dialog fullScreen {...dialogProps}>
              {this.getContentView()}
            </Dialog>
          </Hidden>
        </ValidationForm>
      </div>
    );
  }
}
export default withStyles(dialogStyle)(FormDialog);
