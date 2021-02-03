import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

// core components
import CustomDropdown from '@tabtabgo/web/components/CustomDropdown/CustomDropdown';
import Button from '@tabtabgo/web/components/CustomButtons/Button';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
import pagesHeaderStyle from '../styles/pagesHeaderStyle';

// eslint-disable-next-line react/display-name
const RouterNavLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

class PagesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }

  getLinkClasses = (prop) => {
    const { classes } = this.props;
    const navLink =
      classes.navLink +
      cx({
        [' ' + classes.navLinkLight]: this.props.light,
        [' ' + classes.navLinkActive]: this.activeRoute(prop.path),
        [' ' + classes.navLinkActiveLight]: this.activeRoute(prop.path) && this.props.light,
      });

    return navLink;
  };

  getListItem = (key, prop) => {
    const { classes } = this.props;

    return (
      <ListItem key={key} className={classes.listItem}>
        <RouterNavLink to={prop.path} className={this.getLinkClasses(prop)}>
          {prop.icon ? (
            <ListItemIcon className={classes.listItemIcon}>
              <prop.icon />
            </ListItemIcon>
          ) : (
            <div className={classes.listItemIcon} />
          )}
          <ListItemText
            primary={prop.short}
            disableTypography={true}
            className={classes.listItemText}
          />
        </RouterNavLink>
      </ListItem>
    );
  };

  render() {
    const { classes, color, routes, brand, logo, centered } = this.props;
    const appBarClasses = cx({
      [' ' + classes[color]]: color,
    });
    var list = (
      <List className={classes.list}>
        {routes
          .filter((pr) => pr.showButton)
          .map((prop, key) => {
            if (prop.redirect) {
              return null;
            }

            if (prop.views && prop.views.length > 0) {
              return (
                <React.Fragment key={key}>
                  <Hidden smDown>
                    <CustomDropdown
                      hoverColor="primary"
                      renderButton={() => this.getListItem(key, prop)}
                      dropPlacement="bottom"
                      dropdownList={prop.views}
                      onClick={(menuItem) => {
                        if (menuItem.path) {
                          this.props.history.push(menuItem.path);
                        }
                      }}
                    />
                  </Hidden>
                  <Hidden mdUp>
                    <React.Fragment>
                      {this.getListItem(key, prop)}
                      {prop.views.map((view, index) => {
                        return (
                          <ListItem key={key + '_' + index} className={classes.listItem}>
                            <RouterNavLink to={view.path} className={this.getLinkClasses(view)}>
                              <div className={classes.listItemIcon} />
                              <ListItemText
                                primary={view.name}
                                disableTypography={true}
                                className={classes.listItemText}
                              />
                            </RouterNavLink>
                          </ListItem>
                        );
                      })}
                    </React.Fragment>
                  </Hidden>
                </React.Fragment>
              );
            }
            return this.getListItem(key, prop);
          })}
      </List>
    );

    const title =
      classes.title +
      cx({
        [' ' + classes.titleLight]: this.props.light,
      });

    const sidebarButton =
      classes.sidebarButton +
      cx({
        [' ' + classes.sidebarButtonLight]: this.props.light,
      });

    const drawerPaper =
      classes.drawerPaper +
      cx({
        [' ' + classes.drawerPaperLight]: this.props.light,
      });

    const containerClasses = cx(classes.container, { [classes.centeredContainer]: centered });

    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={containerClasses}>
          <Hidden smDown>
            <div className={centered ? '' : classes.flex}>
              <Button href={brand.link} target="_blank" className={title} color="transparent">
                {logo ? <img src={logo} alt="..." className={classes.logo} /> : brand.name}
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={title} color="transparent">
                {logo ? (
                  <img src={logo} alt="..." className={classes.logo} />
                ) : brand.shortName ? (
                  brand.shortName
                ) : (
                  brand.name
                )}
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>

          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={'right'}
              open={this.state.open}
              classes={{
                paper: drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

PagesHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  brand: PropTypes.shape({
    name: PropTypes.string,
    shortName: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  logo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'error']),
  light: PropTypes.bool,
  centered: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(withStyles(pagesHeaderStyle)(PagesHeader));
