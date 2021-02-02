import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// @material-ui/core components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Icon,
  Collapse,
} from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import FileService from '@tabtabgo/core/Services/FileService';
import { getPersonInitials } from 'ttg-identity/views/Users/node_modules/ttg-identity/pages/ResetPassword/node_modules/@tabtabgo/core/utilities';

// eslint-disable-next-line react/display-name
const RouterNavLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

export default class UserMenuList extends Component {
  static propTypes = {
    classes: PropTypes.object,
    miniActive: PropTypes.bool,
    user: PropTypes.object.isRequired,
    userRoutes: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
    };
    this.fileService = new FileService();
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
    const { classes, miniActive, userRoutes, user } = this.props;

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
    const userWrapperClass = classes.user;
    const itemIcon = classes.collapseItemIcon;
    const caret = classes.caret;
    const collapseItemMini = classes.collapseItemMini;
    const photo = classes.photo;

    return (
      <div className={userWrapperClass}>
        {this.wrapListItem(
          <div className={photo} onClick={() => this.openCollapse('openAvatar')}>
            {user.profile && user.profile.avatar ? (
              <Avatar
                src={this.fileService.getImageUrl(user.profile.avatar)}
                className={classes.avatarImg}
                alt="..."
              />
            ) : (
              <Avatar className={classes.avatarLetters}>
                {getPersonInitials({ person: user ? (user.profile ? user.profile : user) : {} })}
              </Avatar>
            )}
          </div>,
          user.displayName,
        )}

        <List className={classes.list}>
          <ListItem className={classes.item + ' ' + classes.userItem}>
            <RouterNavLink
              to={'#'}
              className={classes.itemLink + ' ' + classes.userCollapseButton}
              onClick={() => this.openCollapse('openAvatar')}
            >
              <ListItemText
                primary={user.displayName}
                secondary={
                  <b
                    className={
                      caret +
                      ' ' +
                      classes.userCaret +
                      ' ' +
                      (this.state.openAvatar ? classes.caretActive : '')
                    }
                  />
                }
                disableTypography={true}
                className={itemText + ' ' + classes.userItemText}
              />
            </RouterNavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + ' ' + classes.collapseList}>
                {userRoutes
                  ? userRoutes.map((route, key) => (
                      <ListItem className={classes.collapseItem} key={key}>
                        {this.wrapListItem(
                          <RouterNavLink
                            to={route.path}
                            className={classes.itemLink + ' ' + classes.userCollapseLinks}
                          >
                            {/* 
                              this is crashing the app for whatever reason
                            <span className={collapseItemMini}>
                              {route.icon ? route.icon : route.mini}
                            </span> */}
                            <ListItemIcon className={itemIcon}>
                              {route.icon ? (
                                typeof route.icon === 'string' ? (
                                  <Icon>{route.icon}</Icon>
                                ) : (
                                  <route.icon />
                                )
                              ) : route.mini ? (
                                <span className={collapseItemMini}>{route.mini}</span>
                              ) : null}
                            </ListItemIcon>
                            <ListItemText
                              primary={route.name}
                              disableTypography={true}
                              className={collapseItemText}
                            />
                          </RouterNavLink>,
                          route.name,
                        )}
                      </ListItem>
                    ))
                  : null}
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
  }
}
