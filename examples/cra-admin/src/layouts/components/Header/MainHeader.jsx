import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { useScrollPosition } from '@n8tb1t/use-scroll-position';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';

// material-ui icons
import Menu from '@material-ui/icons/Menu';

import { LayoutContext } from '../../LayoutContext';

// core components
import HeaderLinks from './HeaderLinks';

import Button from '@tabtabgo/web/components/CustomButtons/Button';

import headerStyle from '../styles/headerStyle';

import RecentlyViewedHeader from 'components/RecentlyViewed/RecentlyViewedHeader';
import { ComponentContext } from '@tabtabgo/core/providers/ComponentProvider';

function Header({ ...props }) {
  const { classes, color, miniActive, theme, userRoutes } = props;
  const [layout] = useContext(LayoutContext);
  const componentProvider = useContext(ComponentContext);
  const [detachHeader, setDetachHeader] = useState(false);
  //const rendersCount = useRef(0)

  const searchBar = componentProvider?.getComponent('SearchBar', props);
  useScrollPosition(
    ({ currPos }) => {
      const isDetach = currPos.y > 0;
      if (isDetach !== detachHeader) setDetachHeader(isDetach);
    },
    [detachHeader],
    false,
    true,
    300,
  );

  const appBarClasses = cx({
    [' ' + classes[color]]: color,
    [' ' + classes.appBarMiniActive]: miniActive,
    [' ' + classes.appBarDetached]: detachHeader,
  });

  const sidebarMinimize = classes.sidebarMinimize;

  //console.log("layout is", layout);
  return (
    <div>
      <AppBar className={classes.appBar + appBarClasses} position="fixed">
        <Toolbar className={classes.container}>
          <Hidden mdUp implementation="css">
            <Button
              className={classes.appResponsive}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden smDown implementation="css">
            <div className={sidebarMinimize}>
              {miniActive ? (
                <IconButton
                  aria-label="Minimize Sidebar"
                  onClick={props.sidebarMinimize}
                  className={classes.sidebarMenuIconButton}
                >
                  <Menu className={classes.sidebarMiniIcon} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Minimize Sidebar"
                  onClick={props.sidebarMinimize}
                  className={classes.selectedSidebarMiniIconButton}
                >
                  <Menu className={classes.sidebarMiniIcon} />
                </IconButton>
              )}
            </div>
          </Hidden>
          <div className={classes.flex}>
            <Hidden mdUp implementation="css">
              <h3 className={classes.title}>
                <small>{layout.subtitle}</small>
                {layout.title}
              </h3>
            </Hidden>
            <Hidden smDown implementation="css">
              <div style={theme.custom.layout.flex}>
                <h2 className={classes.title}>
                  <small>{layout.subtitle}</small>
                  {layout.title}
                </h2>

                {layout.actionComponent}
              </div>
            </Hidden>
          </div>
          {searchBar}
          <HeaderLinks userRoutes={userRoutes} />
        </Toolbar>
        <div className={classes.widgetContainer}>
          <RecentlyViewedHeader />
        </div>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'error']),
  routeInfo: PropTypes.object,
  miniActive: PropTypes.bool,
  userRoutes: PropTypes.array,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
};

export default withTheme(withStyles(headerStyle)(Header));
