import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import EntityList from '@tabtabgo/web/Entity/Components/List';
import { dateFormat, phoneNumberFormat } from '@tabtabgo/core/Formats';

import UsersActions from '../actions';
import EditModal from './Edit';

class UsersList extends React.Component {
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
    this.go(`/${row.id}`);
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
        field: 'id',
        dataAlign: 'center',
        isKey: true,
        hide: true,
        width: '10%',
      },
      //Add Columns
      {
        label: 'Name',
        field: 'displayName',
        dataAlign: 'left',
      },
      {
        label: 'Email',
        field: 'email',
        dataAlign: 'left',
      },
      {
        label: 'Phone Number',
        field: 'phoneNumber',
        dataAlign: 'left',
        dataFormat: phoneNumberFormat,
      },

      {
        label: 'Updated Date',
        field: 'updatedDate',
        dataAlign: 'left',
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
        keyField="id"
        EditComponent={EditModal}
        openEditInNewPage={false}
      />
    );
  }
}

const matchActionToProps = (dispatch) => {
  var actions = new UsersActions();
  return { actions: bindActionCreators(actions, dispatch) };
};

const mapStateToProps = (state) => {
  return {
    currentEntity: state.users.current.entity,
    searchResult: state.users.searchResults,
    flags: state.users.containerFlags,
  };
};

export default withRouter(connect(mapStateToProps, matchActionToProps)(UsersList));
