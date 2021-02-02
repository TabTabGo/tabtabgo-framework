/* eslint-disable no-console */
import React from 'react';

import PropTypes from 'prop-types';

import ContentWrapper from 'layouts/components/Content/ContentWrapper';
import { mergeButtons, ToolbarButtons } from 'ttg-react/web/components/Buttons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import { getDisplayValue } from '../../../core/utilities';
import { LinearProgress } from '@material-ui/core';
import { withConfirmation } from '../../contexts/ConfirmationContext';
export const DetailEntityContext = React.createContext();

class EntityDetail extends React.Component {
  state = {
    openEditModal: false,
    isEntityLoaded: false,
  };

  defaultButtons = {
    edit: {
      onClick: (props) => this.handleOpenEntityModal(props),
      tooltip: (props) => {
        var display = this.getDisplayName(props);
        return `Edit ${display}`;
      },
      className: 'btn-third mb',
      icon: <EditIcon />,
      disabled: false,
    },
    print: {
      tooltip: 'Print',
      onClick: this.handlePrint.bind(this),
      className: 'mb',
      icon: <PrintIcon />,
    },
    delete: {
      tooltip: 'Delete',
      onClick: this.handleDelete.bind(this),
      className: 'btn-danger mb',
      icon: <DeleteIcon />,
    },
  };

  componentDidMount() {
    const {
      match,
      keyField,
      disableAutoLoad,
      forceLoad,
      flags,
      entity,
      expandProperties,
      actions: { getEntity },
    } = this.props;
    let id = match.params ? match.params.id : '0';
    console.log('id', id);
    if (
      forceLoad ||
      (!isNaN(id) &&
        !disableAutoLoad &&
        !flags.loading &&
        (!entity[keyField] || entity[keyField].toString() !== id.toString()))
    ) {
      console.log(`load entity ${id}. Current entity ${entity[keyField]?.toString()}`);
      getEntity(
        id,
        (entity) => {
          if (this.props.onEntityLoaded) {
            this.props.onEntityLoaded(entity);
          }
          this.setState({ isEntityLoaded: true });
        },
        expandProperties,
      );
    }
  }

  handleGoBack() {
    if (this.props.history) {
      this.props.history.goBack();
    }
  }

  handleEdit() {
    const { history, location } = this.props;
    history.push(location.pathname + '/edit');
  }

  handleDelete() {
    this.props.confirmationContext.confirmAction(
      `Delete ${this.props.nameSingularText ?? this.props.nameSingular} ${this.getDisplayName(
        this.props,
      )}`,
      `Are you sure you want to delete ${
        this.props.nameSingularText ?? this.props.nameSingular
      } ${this.getDisplayName(this.props)}?`,
      () => {
        this.props.actions.deleteEntity(this.props.entity);
      },
    );
  }

  handlePrint() {
    this.props.actions.printEntity(this.props.entity);
  }

  getPageButtons = (buttons) => {
    return <ToolbarButtons {...this.props} buttons={buttons} />;
  };

  handleOnSortChange = (property) => {
    const { searchResult } = this.props;
    const orderBy = property;
    let order = 'desc';

    if (searchResult.orderBy === property && searchResult.order === 'desc') {
      order = 'asc';
    }

    this.search({ order, orderBy });
  };

  handleOpenEntityModal = ({ data }) => {
    this.setState({
      openEditModal: true,
      selectedEntity: data,
    });
  };

  handleCloseEntityModal = () => {
    this.setState({ openEditModal: false });
  };

  getDisplayName = (props) => {
    let { displayField, entity } = props;
    return getDisplayValue(entity, displayField);
  };

  render() {
    let {
      namePlural,
      nameSingular,
      namePluralText,
      nameSingularText,
      buttons: { contentButtons },
      enableBack,
      flags,
      title,
      subtitle,
      entity,
      editComponent,
      forceLoad,
      useCustomProgress,
    } = this.props;
    let { EditComponent } = this.props;
    if (editComponent) EditComponent = editComponent;
    if (!namePluralText) namePluralText = namePlural;
    if (!nameSingularText) nameSingularText = nameSingular;
    const { loading } = flags;
    const displayText = this.getDisplayName(this.props);

    const pageButtons = mergeButtons(contentButtons, this.defaultButtons);

    title = title || nameSingular;
    for (const key in pageButtons) {
      if (pageButtons[key]) {
        const button = pageButtons[key];
        button.disabled = button.disabled || loading;
        //button.hide = button.hide || loading; only in case of loading disable button
      }
    }

    let computedTitle = nameSingular;
    let computedSubtitle = undefined;

    if (typeof title == 'function') {
      computedTitle = title(entity);
    } else if (title) {
      computedTitle = title;
    }

    if (typeof subtitle == 'function') {
      computedSubtitle = subtitle(entity);
    } else if (subtitle) {
      computedSubtitle = subtitle;
    }

    //enable/disable buttons for loading

    return (
      <ContentWrapper
        title={displayText ? displayText : computedTitle}
        subtitle={computedSubtitle ? computedSubtitle : displayText ? computedTitle : undefined}
        enableBack={enableBack}
        actionComponent={this.getPageButtons(pageButtons)}
        showHeader={false}
      >
        {!useCustomProgress && (loading || (forceLoad && !this.state.isEntityLoaded)) ? (
          <LinearProgress style={{ marginTop: -4 }} />
        ) : null}
        <DetailEntityContext.Provider value={{ entity, flags }}>
          {this.props.children}
        </DetailEntityContext.Provider>

        {!loading && EditComponent && this.state.openEditModal ? (
          <EditComponent
            {...this.props}
            open={this.state.openEditModal}
            entity={entity}
            onClose={this.handleCloseEntityModal.bind(this)}
            mode={this.state.mode}
            reloadEntity={false}
          />
        ) : null}
      </ContentWrapper>
    );
  }
}

EntityDetail.propTypes = {
  namePlural: PropTypes.string.isRequired,
  nameSingular: PropTypes.string.isRequired,
  namePluralText: PropTypes.string,
  nameSingularText: PropTypes.string,
  displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  actions: PropTypes.object,
  buttons: PropTypes.object,
  enableBack: PropTypes.bool,
  flags: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  entity: PropTypes.object,
  expandProperties: PropTypes.string,
  EditComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  editComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.any,
  history: PropTypes.object,
  location: PropTypes.object,
  searchResult: PropTypes.object,
  match: PropTypes.object,
  keyField: PropTypes.string,
  disableAutoLoad: PropTypes.bool,
  forceLoad: PropTypes.bool,
  useCustomProgress: PropTypes.bool,
  onEntityLoaded: PropTypes.func,
  confirmationContext: PropTypes.any,
};
export default withConfirmation(EntityDetail);
