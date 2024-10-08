// ##############################
// // // App styles
// #############################

import { transition, containerFluid } from 'assets/jss/themeHelpers';

const appStyle = (theme) => ({
  wrapper: {
    direction: 'rtl',
    position: 'relative',
    top: '0',
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "',
    },
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.custom.layout.drawer.width}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'left',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100% - 123px)',
  },
  container: { ...containerFluid },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.custom.layout.drawer.width}px)`,
    },
  },
});

export default appStyle;
