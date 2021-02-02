import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  Button,
  CircularProgress,
} from '@material-ui/core';

import DataTable from './DataTable';
import { mergeButtonSections } from '../components/Buttons';
//import update from "immutability-helper";
// class Transition extends React.Component {
//   return() {
//     return <Slide direction="up" {...this.props} />;
//   }
// }

class ListModal extends Component {
  state = {
    selectedEntities: [],
  };

  handleSave = (closeModal) => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this.state.selectedEntities, closeModal);
    }
  };

  handleOnRowSelectionChange = (selections) => {
    this.setState({ selectedEntities: selections });
  };

  render() {
    const {
      open,
      fullWidth,
      maxWidth,
      onClose,
      title,
      flags,
      buttonsOptions,
      rowOptions,
      ...rest
    } = this.props;
    const { loading, saving } = flags;
    const { selectedEntities } = this.state;
    //console.log('flags :', flags);
    //select row options
    // TODO to add selected item to state instead of redux
    let rowSelectionProps = {
      mode: 'checkbox',
      className: 'info',
      ...rowOptions,
    };
    let dataTableButtons = {
      rowButtons: { view: false, edit: false },
      headerButtons: {
        download: false,
        print: false,
        pdf: false,
        viewColumn: true,
        add: false,
        search: true,
        filter: true,
        refresh: true,
      },
      selectionButtons: {
        download: false,
        print: false,
        pdf: false,
        delete: false,
      },
      dialogButtons: {
        cancel: {
          label: 'Cancel',
          color: 'default',
          alignment: 'left',
          component: Button,
          onClick: onClose,
          disabled: loading || saving,
        },
        save: {
          label: 'Save',
          color: 'primary',
          alignment: 'right',
          component: Button,
          onClick: this.handleSave.bind(this, false),
          disabled: selectedEntities.length === 0 || saving,
        },
        saveAndClose: {
          label: 'Save and Close',
          color: 'primary',
          alignment: 'right',
          type: 'submit',
          component: (props) => (
            <Button {...props}>{saving ? <CircularProgress size={24} /> : props.children}</Button>
          ),
          onClick: this.handleSave.bind(this, true),
          disabled: selectedEntities.length === 0 || saving,
        },
      },
    };
    if (buttonsOptions) {
      dataTableButtons = mergeButtonSections(buttonsOptions, dataTableButtons);
    }
    //console.log('dataTableButtons :', dataTableButtons);
    if (rest.enableSelection) {
      rowSelectionProps.onRowSelectionChange = this.handleOnRowSelectionChange;
    }
    const dataTableTitle = title || this.props.namePluralText || this.props.namePlural;
    //disabled={submitting || !dirty}

    return (
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
        scroll={'paper'}
        TransitionComponent={Fade}
      >
        <DialogContent>
          <DataTable
            {...rest}
            title={dataTableTitle}
            flags={flags}
            buttonsOptions={dataTableButtons}
            rowOptions={rowSelectionProps}
          />
        </DialogContent>
        <DialogActions>
          {Object.keys(dataTableButtons.dialogButtons).map((buttonKey, key) => {
            let button = dataTableButtons.dialogButtons[buttonKey];
            if (button) {
              let ButtonComponent = button.component || Button;
              let disabled = false;
              if (typeof button.disabled === 'function') {
                disabled = button.disabled(this.state);
              } else {
                disabled = button.disabled;
              }

              return (
                <ButtonComponent
                  key={key}
                  onClick={button.onClick}
                  color={button.color}
                  type={button.type || 'button'}
                  disabled={disabled}
                >
                  {button.label}
                </ButtonComponent>
              );
            }
            return null;
          })}
        </DialogActions>
      </Dialog>
    );
  }
}

ListModal.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  dataTableTitle: PropTypes.string,
  openEditInNewPage: PropTypes.bool,
  classes: PropTypes.any,
  styles: PropTypes.any,
  searchKeys: PropTypes.array.isRequired,
  searchOptions: PropTypes.shape({
    searchUrl: PropTypes.string,
    expand: PropTypes.string,
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
  }),
  filters: PropTypes.array,
  filterOptions: PropTypes.shape({}),
  // Entity Props
  keyField: PropTypes.string.isRequired,
  displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  namePlural: PropTypes.string.isRequired,
  namePluralText: PropTypes.string,
  nameSingular: PropTypes.string.isRequired,
  nameSingularText: PropTypes.string,
  // reducer props
  searchResult: PropTypes.shape({}),
  flags: PropTypes.object.isRequired,
  actions: PropTypes.shape({}),
  // extra options
  tableOptions: PropTypes.object,

  buttonsOptions: PropTypes.shape({
    headerButtons: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    rowButtons: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    selectionButtons: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    contentButtons: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    dialogButtons: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  selectRowOptions: PropTypes.object,

  exportsService: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.any),
    fileName: PropTypes.string,
    pageTitle: PropTypes.string,
    namePlural: PropTypes.string,
  }),
  open: PropTypes.bool,
  fullWidth: PropTypes.any,
  maxWidth: PropTypes.any,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  scroll: PropTypes.oneOf(['paper', 'body']),
  ignoreFormValidation: PropTypes.bool,
  rowOptions: PropTypes.any,
};

export default ListModal;
