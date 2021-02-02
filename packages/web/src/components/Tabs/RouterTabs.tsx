import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import StyledTabs from './Tabs';
import StyledTab from './Tab';
import { useHistory, useRouteMatch, Switch, Route, Redirect, useParams } from 'react-router-dom';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {},
  padding: {
    padding: theme.spacing(3),
  },
}));
export interface ITab {
  route: string;
  label: string;
  component: React.ReactElement;
}

type RouterTabProps = {
  tabs: Array<ITab>;
  className?: string;
  subRouteName?: string;
  routeParameters?: any /** route parameters order is important */;
};
const RouterTab = ({ className = '', tabs, subRouteName, routeParameters }: RouterTabProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);
  const history = useHistory();
  const match = useRouteMatch<any>();

  const [routePath, setRoutePath] = useState('');
  /**
   * To get the base route
   */
  useEffect(() => {
    if (subRouteName || routeParameters) {
      let path = match.path;
      if (subRouteName) {
        path = path.replace(`/:${subRouteName}`, '');
      }
      if (routeParameters) {
        Object.keys(routeParameters).forEach((pKey) => {
          path = path.replace(
            `:${pKey}`,
            match?.params && match.params[pKey] ? match.params[pKey] : '',
          );
        });
        //path += '/' + Object.values(routeParameters).join('/');
      }
      setRoutePath(path);      
    } else {
      setRoutePath(match.url);
    }
  }, [subRouteName, routeParameters, match.params]);

  // To select tab from route ( base on tab route )
  useEffect(() => {    
    if (subRouteName && match.params) {
      var subRouteValue = (match.params as any)[subRouteName];
      //console.log('subRouteValue', subRouteValue, tabs, match.params as any, routePath);
      if (subRouteName) {
        var index = tabs.findIndex((t) => t.route === subRouteValue);
        //console.log('index', index);
        setValue(index > -1 ? index : 0);
      }
    }
  }, [match, match.params]);

  const handleChange = (newValue?: any) => {
    if (!subRouteName) setValue(newValue || 0);

    history.push(`${routePath}/${tabs[newValue].route}`);
  };

  return (
    <div className={classes.root + ' ' + className}>
      <div>
        <StyledTabs
          value={value}
          onChange={(e: any, newValue?: any) => handleChange(newValue)}
          aria-label="styled tabs"
        >
          {tabs.map((tab, index) => (
            <StyledTab key={index} label={tab.label} />
          ))}
        </StyledTabs>
      </div>

      <Switch>
        {tabs.map((tab, index) => {
          return (
            <Route key={index} path={`${routePath}/${tab.route}`}>
              {tab.component}
            </Route>
          );
        })}

        {/* cause loop call {routePath && <Redirect to={`${routePath}/${tabs[0].route}`} />} */}
      </Switch>
    </div>
  );
};

export default RouterTab;
