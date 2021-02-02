import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import EntityEdit, { EditEntityModalContext } from '@tabtabgo/web/Entity/Components/EditModal';

import UsersActions from '../actions';
import UserForm from '../components/Form';

class UserEdit extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    flags: PropTypes.object,
    classes: PropTypes.object,
  };
  render() {
    const buttons = {};

    return (
      <EntityEdit {...this.props} buttons={buttons}>
        <EditEntityModalContext.Consumer>
          {(context) => {
            return (
              <UserForm
                user={context.entity}
                onChangeProperty={context.changeProperty}
                flags={this.props.flags}
                classes={this.props.classes}
              />
            );
          }}
        </EditEntityModalContext.Consumer>
      </EntityEdit>
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

export default withRouter(connect(mapStateToProps, matchActionToProps)(UserEdit));
