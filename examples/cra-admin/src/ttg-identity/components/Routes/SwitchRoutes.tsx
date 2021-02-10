import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthenticateRoute from './AuthenticateRoute';
import AuthorizeRoute from './AuthorizeRoute';
import { RouteItem } from '@tabtabgo/core/types/Route';

const routeTypes = (prop: RouteItem, key: any) => {
  if (prop.requiredAuthorization)
    return <AuthorizeRoute key={key} roles={prop.requiredAuthorization} {...prop} />;
  if (prop.requiredAuthentication) return <AuthenticateRoute key={key} {...prop} />;
  return <Route path={prop.path} component={prop.component} key={key} />;
};

type SwitchRoutesProps = {
  routes: Array<RouteItem>;
};
const SwitchRoutes = ({ routes }: SwitchRoutesProps) => {
  var homeRoute = routes.find((r) => r.isHomeRoute === true);

  return (
    <Switch>
      {homeRoute ? routeTypes({ ...homeRoute, path: '/' }, 0) : null}
      {routes.map((route, key) => {
        if (route.redirect)
          return <Redirect from={route.path} to={route.pathTo ? route.pathTo : ''} key={key} />;
        if (route.collapse && route.views)
          return route.views.map((route, key) => {
            return routeTypes(route, key);
          });
        return routeTypes(route, key);
      })}
    </Switch>
  );
};

export default SwitchRoutes;
