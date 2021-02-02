import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserDetail from './containers/Detail';
import UserEdit from './containers/Edit';
import UsersList from './containers/List';
import { getPersonName } from '@tabtabgo/core/utilities';

class Users extends React.Component {
  renderList = (props) => {
    return <UsersList {...props} />;
  };
  renderDetail = (props) => {
    return <UserDetail {...props} />;
  };

  renderEdit = (mode = 'edit', props) => {
    return <UserEdit {...props} mode={mode} />;
  };

  render() {
    let props = {
      namePlural: 'users',
      nameSingular: 'user',
      namePluralText: 'Users',
      nameSingularText: 'User',
      subTitle: '',
      defaultEntity: {},
      displayField: getPersonName,
      displayFormat: null,
      keyField: 'id',
    };

    //TODO if User fo not have access route to Dashbaord
    return (
      <div>
        <Switch>
          <Route key={1} exact path="/users" component={this.renderList.bind(this, props)} />
          <Route
            key={4}
            exact
            path="/users/add"
            component={this.renderEdit.bind(this, 'add', props)}
          />
          <Route key={2} exact path="/users/:id" component={this.renderDetail.bind(this, props)} />
          <Route
            key={3}
            exact
            path="/users/:id/edit"
            component={this.renderEdit.bind(this, 'edit', props)}
          />
        </Switch>
      </div>
    );
  }
}

export default Users;
