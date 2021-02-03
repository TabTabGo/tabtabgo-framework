import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import EntityDetail, { DetailEntityContext } from '@tabtabgo/web/Entity/Components/Detail';

import { InstancesActions } from '../actions';
import InstanceView from '../components/View';

import EditModal from './Edit';

class InstanceDetail extends React.Component {
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
          {(context) => <InstanceView instance={context.entity} flags={this.props.flags} />}
        </DetailEntityContext.Consumer>
      </EntityDetail>
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

export default withRouter(connect(mapStateToProps, matchActionToProps)(InstanceDetail));
