import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';
import { LayoutProvider } from './LayoutContext';
import ContentPanelMargin from './components/ContentPanelMargin';

// core components
import Header from './components/Header/MainHeader';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

import SwitchRoutes from 'ttg-identity/components/Routes/SwitchRoutes';

import appStyle from './styles/mainStyle';

const Main = ({ ...props }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(true);

  const mounted = useRef();
  const mainPanel = useRef();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      //do componentDidUpate logic
      if (history.location.pathname !== location.pathname) {
        if (mainPanel && mainPanel.current) {
          mainPanel.current.scrollTop = 0;
        }

        if (mobileOpen) {
          setMobileOpen(false);
        }
      }
    }
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };

  const { classes, brand, mainRoutes, footerRoutes, userRoutes, plain, ...rest } = props;
  const mainPanelClasses =
    classes.mainPanel +
    ' ' +
    cx({
      [classes.mainPanelPlain]: plain,
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    });

  const contentPanelClasses = classes.contentPanel;

  const allRoutes = userRoutes ? userRoutes.concat(mainRoutes) : mainRoutes;

  const headerExtensionOpacity = 1.0;

  return (
    <LayoutProvider>
      <div className={classes.wrapper}>
        <Sidebar
          routes={mainRoutes}
          userRoutes={userRoutes || []}
          brand={brand}
          image={props.theme.custom.media.backgrounds.sidebar}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          miniActive={mobileOpen ? false : miniActive}
          {...rest}
        />

        <div className={mainPanelClasses} ref={mainPanel}>
          <Header
            sidebarMinimize={sidebarMinimize}
            miniActive={miniActive}
            handleDrawerToggle={handleDrawerToggle}
            userRoutes={userRoutes || []}
            {...rest}
          />
          <ContentPanelMargin />
          <div className={contentPanelClasses}>
            {!plain && (
              <div
                className={classes.headerExtensionPanel}
                style={{ opacity: headerExtensionOpacity }}
              />
            )}
            <SwitchRoutes routes={allRoutes} />
          </div>
          <Footer brand={brand} routes={footerRoutes} fluid />
        </div>
      </div>
    </LayoutProvider>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  brand: PropTypes.shape({
    company: PropTypes.string,
    companyLink: PropTypes.string,
    name: PropTypes.string,
    shortName: PropTypes.string,
    link: PropTypes.string,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    logoAltText: PropTypes.string,
  }).isRequired,
  mainRoutes: PropTypes.array,
  userRoutes: PropTypes.array,
  footerRoutes: PropTypes.array,
  theme: PropTypes.object,
  plain: PropTypes.bool,
  location: PropTypes.object,
};

export default withTheme(withStyles(appStyle)(Main));
