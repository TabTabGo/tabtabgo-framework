/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  Slide,
  Button,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';

import ValidationForm from '../components/Validations/Form';
import ValidationButton from '../components/Validations/Button';
import update from 'immutability-helper';
import { mergeButtons } from '../components/Buttons/utilities';
import { getDisplayValue } from '@tabtabgo/core/Utilities';
import _ from 'lodash';

import editModalStyle from './styles/editModalStyle';
import EntityActionTypes from '../ActionTypes';
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export const EditEntityModalContext = React.createContext();

class EntityEditModal extends React.Component {
  static defaultProps = {
    maxWidth: 'md',
    fullWidth: false,
  };

  state = {
    entity: this.props.entity,
    changes: {},
    loading: false,
  };

  actionTypes = EntityActionTypes(this.props.namePlural);

  // TODO do really need it
  static getDerivedStateFromProps(nextProps, prevState) {
    if (_.isEqual(prevState.entity, nextProps.defaultEntity) && !_.isEmpty(nextProps.entity)) {
      //console.log("changeState");
      return { entity: nextProps.entity };
    } else return null;
  }

  async componentDidMount() {
    const { reloadEntity, service, keyField, expandProperties } = this.props;

    if (reloadEntity && service && this.props.entity[keyField]) {
      try {
        this.setState({ loading: true });
        var entity = await service.getEntity(this.props.entity[keyField], expandProperties);
        this.setState({ entity, loading: false });
      } catch (error) {
        console.log('Failed load Entity;', error);
        this.setState({ loading: false });
      }
    }
  }

  handleChangeProperty = (propName, value) => {
    var entity = update(this.state.entity, { [propName]: { $set: value } });
    var changes = update(this.state.changes, { [propName]: { $set: value } });
    this.setState({ entity, changes });
  };

  handleClose = () => {
    const { onClose, defaultEntity } = this.props;
    this.setState({ entity: defaultEntity });
    if (onClose) onClose(this.state.entity, true);
  };

  handleOnSaveSuccess = (succeededEntity, closeAfterSave) => {
    const { onClose } = this.props;
    if (closeAfterSave && onClose) onClose(succeededEntity);
    else {
      this.setState({
        entity: succeededEntity,
        originalEntity: succeededEntity,
      });
    }
  };

  handleSave = (closeAfterSave) => {
    const { onSubmit, saveProps, useSaveChanges, keyField, originalEntity } = this.props;
    const { entity, changes } = this.state;

    if (onSubmit) {
      onSubmit(entity, changes);
    } else if (useSaveChanges) {
      this.props.actions.saveEntityChanges(entity[keyField], entity, changes, originalEntity, {
        properties: saveProps,
        onSuccess: (succeededEntity) => this.handleOnSaveSuccess(succeededEntity, closeAfterSave),
      });
    } else {
      this.props.actions.saveEntity(entity, {
        properties: saveProps,
        onSuccess: (succeededEntity) => this.handleOnSaveSuccess(succeededEntity, closeAfterSave),
      });
    }
  };

  render() {
    let {
      header,
      footer,
      displayField,
      nameSingular,
      nameSingularText,
      title,
      mode,
      flags,
      fullScreen,
      classes,
      buttons: { editButtons },
    } = this.props;

    title = title || nameSingularText;
    const saving =
      flags.saving || mode === 'Edit'
        ? flags[this.actionTypes.update]
        : flags[this.actionTypes.add];
    const error = flags.error
      ? mode === 'Edit'
        ? flags.error[this.actionTypes.update]
        : flags.error[this.actionTypes.add]
      : null;
    const defaultButtons =
      mode === 'Edit'
        ? {
            cancel: {
              label: 'Cancel',
              color: 'default',
              alignment: 'left',
              component: Button,
              onClick: this.handleClose.bind(this),
            },
            save: {
              label: 'Save',
              color: 'primary',
              alignment: 'right',
              component: ValidationButton,
              onClick: this.handleSave.bind(this, false),
            },
            saveAndClose: {
              label: 'Save and Close',
              color: 'primary',
              alignment: 'right',
              type: 'submit',
              component: ValidationButton,
              onClick: this.handleSave.bind(this, true),
            },
          }
        : {
            cancel: {
              label: 'Cancel',
              color: 'default',
              alignment: 'left',
              component: Button,
              onClick: this.handleClose.bind(this),
            },
            saveAndClose: {
              label: `Add ${title}`,
              color: 'primary',
              alignment: 'right',
              type: 'submit',
              component: ValidationButton,
              onClick: this.handleSave.bind(this, true),
            },
          };

    let buttons = mergeButtons(editButtons, defaultButtons);

    const actionButtons = Object.keys(buttons).map((buttonKey, key) => {
      let button = buttons[buttonKey];
      if (button) {
        let ButtonComponent = button.component || Button;
        return (
          <ButtonComponent
            key={key}
            onClick={button.onClick}
            color={button.color}
            type={button.type || 'button'}
            disabled={saving || flags.loading}
            //isBusy={saving}
          >
            {button.label}
          </ButtonComponent>
        );
      }
      return null;
    });

    const { entity } = this.state;
    let displayText = getDisplayValue(entity, displayField);

    const errorContainer = !saving && error && (
      <div className={classes.errorContainer}>
        <strong>{`Error ${mode === 'Add' ? 'adding' : 'saving'} ${nameSingularText}`}</strong>
        {error && error.message && ` ${error.message}`}
      </div>
    );
    //disabled={submitting || !dirty}
    if (footer) {
      footer = footer({
        onClose: this.handleClose.bind(this),
        onSave: this.handleSave.bind(this),
        ...this.props,
      });
    } else {
      if (!fullScreen) {
        footer = (
          <DialogActions>
            {errorContainer}
            {actionButtons}
            {saving && (
              <div className={classes.progressWrapper}>
                <CircularProgress size={24} />
              </div>
            )}
          </DialogActions>
        );
      } else {
        footer = <DialogActions>{errorContainer}</DialogActions>;
      }
    }

    const dialogTitle =
      mode === 'Edit'
        ? `Edit ${title} ${displayText && displayText !== '' ? `(${displayText})` : ''}`
        : `Add New ${title} ${displayText && displayText !== '' ? '(' + displayText + ')' : ''}`;

    if (header) {
      header = header({
        onClose: this.handleClose.bind(this),
        onSave: this.handleSave.bind(this),
        ...this.props,
      });
    } else {
      if (fullScreen) {
        header = (
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose.bind(this)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.fullScreenTitle}>
                {dialogTitle}
              </Typography>
              {actionButtons}
              {saving && (
                <div className={classes.progressWrapper}>
                  <CircularProgress size={24} color="secondary" />
                </div>
              )}
            </Toolbar>
          </AppBar>
        );
      } else {
        header = (
          <DialogTitle id={`${mode}-${nameSingular}-dialog-title`}>{dialogTitle}</DialogTitle>
        );
      }
    }

    title = title || nameSingularText;

    return (
      <Dialog
        fullWidth={this.props.fullWidth}
        maxWidth={this.props.maxWidth}
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        TransitionComponent={Transition}
        disableEscapeKeyDown
        disableBackdropClick
        fullScreen={fullScreen}
      >
        <ValidationForm onValidate={this.props.onValidate}>
          {header}
          <DialogContent className={classes.dialogContent}>
            <EditEntityModalContext.Provider
              value={{
                entity: this.state.entity,
                loading: this.state.loading,
                changeProperty: this.handleChangeProperty,
              }}
            >
              {this.props.children}
            </EditEntityModalContext.Provider>
          </DialogContent>
          {footer}
        </ValidationForm>
      </Dialog>
    );
  }
}

EntityEditModal.defaultProps = {
  resetOnCancel: true,
  mode: 'Edit',
};

EntityEditModal.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  mode: PropTypes.oneOf(['Edit', 'Add']),
  open: PropTypes.bool,
  title: PropTypes.string,
  entity: PropTypes.object.isRequired,
  namePlural: PropTypes.string.isRequired,
  nameSingular: PropTypes.string.isRequired,
  displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  keyField: PropTypes.string.isRequired,
  originalEntity: PropTypes.object,
  defaultEntity: PropTypes.object,
  namePluralText: PropTypes.string,
  nameSingularText: PropTypes.string,
  actions: PropTypes.object,
  flags: PropTypes.object,
  header: PropTypes.func,
  footer: PropTypes.func,
  onValidate: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  buttons: PropTypes.object,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  reloadEntity: PropTypes.bool,
  service: PropTypes.object,
  saveProps: PropTypes.object,
  useSaveChanges: PropTypes.bool,
  expandProperties: PropTypes.string,
};

export default withStyles(editModalStyle)(EntityEditModal);
