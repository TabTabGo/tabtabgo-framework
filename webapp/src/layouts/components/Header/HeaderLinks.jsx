import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import { CircularProgress } from '@material-ui/core';

// @material-ui/icons

import headerLinksStyle from '../styles/headerLinksStyle';

import InstanceHeaderLink from './InstanceHeaderLink';

import UserHeaderLink from './UserHeaderLink';

import { AuthenticationConsumer } from 'ttg-identity/components/Routes/node_modules/ttg-identity/core/AuthenticationProvider';
import _ from 'lodash';
/// Links that will be displayed in the Header of Layout components
class HeaderLinks extends React.Component {
  state = {
    notificationOpen: false,
  };

  handleClick = () => {
    this.setState({ notificationOpen: !this.state.notificationOpen });
  };
  handleClose = () => {
    this.setState({ notificationOpen: false });
  };

  render() {
    const { classes, userRoutes } = this.props;

    const headerLinkSvg = classNames({
      [classes.headerLinksSvg]: true,
      [classes.links]: true,
    });

    return (
      <div className={classes.container + ' ' + this.props.className}>
        <AuthenticationConsumer>
          {({ user, instance, isLoading, isChangingInstance, changeInstance }) => {
            if (isLoading && !isChangingInstance) {
              return (
                <div className={classes.loadingProgressWrapper}>
                  <CircularProgress size={20} color="inherit" />
                </div>
              );
            }
            if (instance && !_.isEmpty(instance))
              return (
                <InstanceHeaderLink
                  instance={instance}
                  instances={user.instances}
                  changeInstance={changeInstance}
                />
              );
            return null;
          }}
        </AuthenticationConsumer>

        <UserHeaderLink
          classes={{
            buttonLink: classes.buttonLink,
            icon: headerLinkSvg,
          }}
          userRoutes={userRoutes}
        />
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(headerLinksStyle)(HeaderLinks);
