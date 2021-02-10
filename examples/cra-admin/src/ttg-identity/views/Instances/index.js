import React from 'react';
import { Route, Switch } from 'react-router-dom';

import InstanceDetail from './containers/Detail';
import InstanceEdit from './containers/Edit';
import InstancesList from './containers/List';

class Instances extends React.Component {
  renderList = (props) => {
    return <InstancesList {...props} />;
  };
  renderDetail = (props) => {
    return <InstanceDetail {...props} />;
  };

  renderEdit = (mode = 'edit', props) => {
    return <InstanceEdit {...props} mode={mode} />;
  };

  render() {
    let props = {
      namePlural: 'instances',
      nameSingular: 'instance',
      namePluralText: 'Instances',
      nameSingularText: 'Instance',
      subTitle: '',
      defaultEntity: {},
      displayField: 'name',
      displayFormat: null,
      keyField: 'instanceId',
    };

    //TODO if User fo not have access route to Dashbaord
    return (
      <div>
        <Switch>
          <Route key={1} exact path="/instances" component={this.renderList.bind(this, props)} />
          <Route
            key={4}
            exact
            path="/instances/add"
            component={this.renderEdit.bind(this, 'add', props)}
          />
          <Route
            key={2}
            exact
            path="/instances/:id"
            component={this.renderDetail.bind(this, props)}
          />
          <Route
            key={3}
            exact
            path="/instances/:id/edit"
            component={this.renderEdit.bind(this, 'edit', props)}
          />
        </Switch>
      </div>
    );
  }
}

export default Instances;
