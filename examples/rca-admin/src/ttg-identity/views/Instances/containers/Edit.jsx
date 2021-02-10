import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import EntityEdit, { EditEntityModalContext } from '@tabtabgo/web/Entity/Components/EditModal';

import { InstancesActions } from '../actions';
import InstanceForm from '../components/Form';

class InstanceEdit extends React.Component {
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
              <InstanceForm
                instance={context.entity}
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
  return { actions: bindActionCreators(InstancesActions, dispatch) };
};

const mapStateToProps = (state) => {
  return {
    currentEntity: state.instances.current.entity,
    flags: state.instances.containerFlags,
  };
};

export default withRouter(connect(mapStateToProps, matchActionToProps)(InstanceEdit));
