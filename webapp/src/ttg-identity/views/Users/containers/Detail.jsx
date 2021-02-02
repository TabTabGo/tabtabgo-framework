import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import EntityDetail, { DetailEntityContext } from '@tabtabgo/web/Entity/Components/Detail';

import UsersActions from '../actions';
import UserView from '../components/View.jsx';

import EditModal from './Edit';

class UserDetail extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    flags: PropTypes.object,
    classes: PropTypes.object,
    currentEntity: PropTypes.object,
  };
  render() {
    const contentButtons = [];

    return (
      <EntityDetail
        {...this.props}
        buttons={{ contentButtons }}
        openEditInNewPage={false}
        editComponent={EditModal}
        entity={this.props.currentEntity}
      >
        <DetailEntityContext.Consumer>
          {(context) => <UserView user={context.entity} flags={this.props.flags} />}
        </DetailEntityContext.Consumer>
      </EntityDetail>
    );
  }
}

const matchActionToProps = (dispatch) => {
  return { actions: bindActionCreators(new UsersActions(), dispatch) };
};

const mapStateToProps = (state) => {
  return {
    currentEntity: state.users.current.entity,
    flags: state.users.containerFlags,
  };
};

export default withRouter(connect(mapStateToProps, matchActionToProps)(UserDetail));
