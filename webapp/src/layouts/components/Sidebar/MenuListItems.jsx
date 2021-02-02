/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Collapse,
  Tooltip,
} from '@material-ui/core';

// eslint-disable-next-line react/display-name
const RouterNavLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

export default class MenuListItems extends Component {
  static propTypes = {
    menus: PropTypes.arrayOf(PropTypes.string),
    routes: PropTypes.array,
    classes: PropTypes.any,
    miniActive: PropTypes.bool,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isGranted: {},
    };
    this.activeRoute.bind(this);
  }

  getGrantedList = (menus, routes) => {
    var isGranted = {};
    for (const route of routes) {
      if (route.redirect) continue;

      if (route.collapse && route.views) {
        isGranted = Object.assign(isGranted, this.getGrantedList(menus, route.views));
        var grantedSubMenu = route.views.filter((r) => r.isGranted);
        if (grantedSubMenu.length > 0) {
          route.isGranted = true;
          isGranted[route.name] = true;
          continue;
        }
      }
      if (menus)
        for (const m of menus) {
          if (route.name === m) {
            route.isGranted = true;
            isGranted[route.name] = true;
            break;
          }
        }
    }
    return isGranted;
  };

  //check if routes are granted
  populateGrantedRoute = (menus, routes) => {
    let isGranted = this.getGrantedList(menus, routes);
    //console.log("isGranted :", isGranted);
    this.setState({ isGranted, isRoutesUpdated: true });
  };

  componentDidMount() {
    const { menus, routes } = this.props;
    this.populateGrantedRoute(menus, routes);
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  wrapListItem(listItem, tip) {
    const { miniActive, classes } = this.props;

    if (miniActive === true) {
      return (
        <Tooltip
          id="tooltip-bottom"
          title={tip}
          placement="right"
          classes={{ tooltip: classes.tooltip }}
        >
          {listItem}
        </Tooltip>
      );
    }

    return listItem;
  }

  render() {
    const { classes, routes, miniActive } = this.props;
    return (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }

          if (this.state.isGranted[prop.name] && prop.collapse) {
            const navLinkClasses =
              classes.itemLink +
              ' ' +
              cx({
                [' ' + classes.collapseActive]: this.activeRoute(prop.path),
              });
            const itemText =
              classes.itemText +
              ' ' +
              cx({
                [classes.itemTextMini]: miniActive,
              });
            const collapseItemText =
              classes.collapseItemText +
              ' ' +
              cx({
                [classes.collapseItemTextMini]: miniActive,
              });
            const itemIcon = classes.itemIcon;
            const caret = classes.caret;

            return (
              <ListItem key={key} className={classes.item}>
                {this.wrapListItem(
                  <div className={navLinkClasses} onClick={() => this.openCollapse(prop.state)}>
                    <ListItemIcon className={itemIcon}>
                      {typeof prop.icon === 'string' ? <Icon>{prop.icon}</Icon> : prop.icon()}
                    </ListItemIcon>
                    <ListItemText
                      primary={prop.name}
                      secondary={
                        <b
                          className={
                            caret + ' ' + (this.state[prop.state] ? classes.caretActive : '')
                          }
                        />
                      }
                      disableTypography={true}
                      className={itemText}
                    />
                  </div>,
                  prop.name,
                )}

                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={classes.list + ' ' + classes.collapseList}>
                    {prop.views.map((prop, key) => {
                      if (prop.redirect) {
                        return null;
                      }

                      if (this.state.isGranted[prop.name]) {
                        const navLinkClasses =
                          classes.collapseItemLink +
                          ' ' +
                          cx({
                            [' ' + classes.activeItem]: this.activeRoute(prop.path),
                          });
                        const collapseItemMini = classes.collapseItemMini;
                        return (
                          <ListItem key={key} className={classes.collapseItem}>
                            {this.wrapListItem(
                              <RouterNavLink to={prop.path} className={navLinkClasses}>
                                <span className={collapseItemMini}>{prop.mini}</span>
                                <ListItemText
                                  primary={prop.name}
                                  disableTypography={true}
                                  className={collapseItemText}
                                />
                              </RouterNavLink>,
                              prop.name,
                            )}
                          </ListItem>
                        );
                      }

                      return null;
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }
          if (this.state.isGranted[prop.name]) {
            const navLinkClasses =
              classes.itemLink +
              ' ' +
              cx({
                [' ' + classes.activeItem]: this.activeRoute(prop.path),
              });
            const itemText =
              classes.itemText +
              ' ' +
              cx({
                [classes.itemTextMini]: miniActive,
              });
            const itemIcon = classes.itemIcon;
            return (
              <ListItem key={key} className={classes.item}>
                {prop.menuItemComponent
                  ? prop.menuItemComponent({
                      miniActive,
                      isGranted: this.state.isGranted[prop.name],
                      classes,
                      path: prop.path,
                      name: prop.name,
                      isActiveRoute: this.activeRoute(prop.path),
                    })
                  : this.wrapListItem(
                      <RouterNavLink to={prop.path} className={navLinkClasses}>
                        <ListItemIcon className={itemIcon}>
                          {typeof prop.icon === 'string' ? <Icon>{prop.icon}</Icon> : <prop.icon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={prop.name}
                          disableTypography={true}
                          className={itemText}
                        />
                      </RouterNavLink>,
                      prop.name,
                    )}
              </ListItem>
            );
          }

          return null;
        })}
      </List>
    );
  }
}
