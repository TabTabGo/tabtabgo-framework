import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import EntityList from '@tabtabgo/web/Entity/Components/List';
import { dateFormat } from '@tabtabgo/core/Formats';

import { InstancesActions } from '../actions';
import EditModal from './Edit';

class InstancesList extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    actions: PropTypes.object,
  };

  go = (path) => {
    this.props.history.push(this.props.location.pathname + path);
  };

  handleViewDetailModal(row) {
    this.props.actions.selectEntity(row);
    this.go(`/${row.instanceId}`);
  }

  titleNameFormat = (cell, row) => {
    return (
      <h3 className="text-clickable" onClick={this.handleViewDetailModal.bind(this, row)}>
        {cell}
      </h3>
    );
  };

  publicationDate = (cell) => {
    if (cell) {
      if (Number.isInteger(cell))
        if (Number(cell) > 0) return cell;
        else return dateFormat(cell);
    }
    return '';
  };

  render() {
    const props = this.props;

    const searchKeys = []; //TODO add search Keys

    const filters = []; //TODO add search Keys

    const columns = [
      {
        label: 'ID',
        field: 'instanceId',
        dataAlign: 'center',
        isKey: true,
        hide: true,
        width: '10%',
      },
      {
        label: 'Code',
        field: 'code',
        dataAlign: 'left',
      },
      {
        label: 'Name',
        field: 'name',
        dataAlign: 'left',
      },

      //Add Columns
      {
        label: 'Updated Date',
        field: 'updatedDate',
        dataAlign: 'center',
        dataFormat: dateFormat,
      },
    ];
    return (
      <EntityList
        {...props}
        searchKeys={searchKeys}
        filters={filters}
        columns={columns}
        disableAutoLoad={false}
        searchOptions={{
          order: 'desc',
          orderBy: 'UpdatedDate',
        }}
        keyField="instanceId"
        EditComponent={EditModal}
        openEditInNewPage={false}
      />
    );
  }
}

const matchActionToProps = (dispatch) => {
  return { actions: bindActionCreators(InstancesActions, dispatch) };
};

const mapStateToProps = (state) => {
  return {
    currentEntity: state.instances.current.entity,
    searchResult: state.instances.searchResults,
    flags: state.instances.containerFlags,
  };
};

export default withRouter(connect(mapStateToProps, matchActionToProps)(InstancesList));
