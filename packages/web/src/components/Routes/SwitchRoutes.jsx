import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

const routeTypes = (prop, key) => {
  return <Route path={prop.path} component={prop.component} key={key} />;
};

const SwitchRoutes = (routes) => (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.redirect) return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse && prop.views)
        return prop.views.map((prop, key) => {
          return routeTypes(prop, key);
        });
      return routeTypes(prop, key);
    })}
  </Switch>
);

SwitchRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SwitchRoutes;
