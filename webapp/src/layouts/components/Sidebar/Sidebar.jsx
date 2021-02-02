import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Hidden, CircularProgress } from '@material-ui/core';

import MenuListItems from './MenuListItems';
import Brand from './Brand';
import UserMenuList from './UserMenuList';

import sidebarStyle from '../styles/sidebarStyle';

import { AuthenticationContext } from 'ttg-identity/components/Routes/node_modules/ttg-identity/core/AuthenticationProvider';

class SidebarWrapper extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { className, links } = this.props;
    return (
      <div className={className} ref={(ref) => (this.sidebarWrapper = ref)}>
        {/* {user} */}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
    };
    this.activeRoute.bind(this);
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

  render() {
    const { classes, image } = this.props;

    var user = (
      <AuthenticationContext.Consumer>
        {({ user, isLoading }) => {
          return (
            <UserMenuList
              {...this.props}
              user={user}
              isLoading={isLoading}
              miniActive={this.props.miniActive && this.state.miniActive}
            />
          );
        }}
      </AuthenticationContext.Consumer>
    );

    var links = (
      <AuthenticationContext.Consumer>
        {({ menus, isLoading }) => {
          if (isLoading) {
            return (
              <div className={classes.loadingProgressWrapper}>
                <CircularProgress size={24} color="inherit" />
              </div>
            );
          }

          return (
            <MenuListItems
              {...this.props}
              menus={menus}
              miniActive={this.props.miniActive && this.state.miniActive}
            />
          );
        }}
      </AuthenticationContext.Consumer>
    );

    var getBrand = (
      <Brand
        {...this.props}
        logo={this.props.brand.logo}
        logoText={this.props.brand.logoText}
        logoAltText={this.props.brand.logoAltText}
        url={this.props.brand.link}
        miniActive={this.props.miniActive && this.state.miniActive}
      />
    );

    const drawerPaper =
      classes.drawerPaper +
      ' ' +
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      ' ' +
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
      });
    return (
      <div ref={(ref) => (this.mainPanel = ref)}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={this.props.open}
            classes={{
              paper: drawerPaper + ' ' + classes['drawerBackground'],
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {getBrand}
            <SidebarWrapper className={sidebarWrapper} user={user} links={links} />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: image ? 'url(' + image + ')' : null }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() =>
              this.props.expandOnHover ? this.setState({ miniActive: false }) : undefined
            }
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + ' ' + classes['drawerBackground'],
            }}
          >
            {getBrand}
            <SidebarWrapper className={sidebarWrapper} user={user} links={links} />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: image ? 'url(' + image + ')' : null }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  expandOnHover: PropTypes.bool,
  brand: PropTypes.shape({
    link: PropTypes.string,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    logoAltText: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object,
};

export default withStyles(sidebarStyle)(Sidebar);
