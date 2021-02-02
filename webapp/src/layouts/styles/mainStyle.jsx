// ##############################
// // // App styles
// #############################

import { transition } from 'assets/jss/themeHelpers.jsx';

const appBarHeight = 70; //accomodate the widget for now

const appStyle = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "',
    },
  },
  headerExtensionPanel: {
    position: 'absolute',
    height: '200px',
    width: '100%',
    zIndex: -99,
    opacity: 1,
    background: theme.palette.primary.main,
    boxShadow: theme.custom.shadows.appBarBoxShadow,
    transition: 'opacity 0.3s ease-in',
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.custom.layout.drawer.width}px)`,
    },
    //overflow: "auto",
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  contentPanel: {
    marginTop: 0,
  },
  contentPanelWithCards: {
    marginTop: appBarHeight,
  },
  map: {
    marginTop: appBarHeight,
  },
  mainPanelPlain: {
    boxShadow: 'none',
    background: 'transparent',
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.custom.layout.drawer.miniWidth}px)`,
    },
  },
});

export default appStyle;
