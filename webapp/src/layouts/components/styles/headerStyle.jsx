// ##############################
// // // Header styles
// #############################

import {
  containerFluid,
  defaultFont,
  defaultBoxShadow,
  transition,
} from 'assets/jss/themeHelpers.jsx';

import pink from '@material-ui/core/colors/pink';

const headerStyle = (theme) => ({
  appBar: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.custom.layout.drawer.width}px)`,
    },
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    width: '100%',
    paddingTop: '10px',
    zIndex: '209',
    color: '#fff',
    border: '0',
    borderRadius: '0',
    padding: '10px 0',
    ...transition,
    minHeight: '50px',
    display: 'block',
    '&:after': {
      content: 'close-quote',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      width: '100%',
      height: '100%',
      boxShadow: theme.custom.shadows.appBarBoxShadow,
      opacity: 0,
      transition: 'opacity 0.15s ease-in-out',
    },
  },
  appBarDetached: {
    '&:after': {
      opacity: 1,
    },
  },
  appBarMiniActive: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.custom.layout.drawer.miniWidth}px)`,
    },
  },
  container: {
    ...containerFluid,
    minHeight: '50px',
  },
  widgetContainer: {
    ...containerFluid,
    background: 'transparent',
    marginBottom: 0,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    lineHeight: '30px',
    fontSize: '20px',
    fontWeight: '400',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '12px',
    margin: '0 !important',
    '&:hover,&:focus': {
      background: 'transparent',
    },
    transition: 'opacity 0.3s ease-in-out',
    '& small': {
      fontSize: '0.9rem',
      fontWeight: 400,
      color: pink[50],
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    ...defaultBoxShadow,
  },
  sidebarMinimize: {
    float: 'left',
    padding: 0,
    display: 'block',
    color: '#555555',
  },
  sidebarMenuIconButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    '&:hover,&:focus': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
  },
  sidebarMiniIconButton: {
    color: theme.palette.common.white,
  },
  selectedSidebarMiniIconButton: {
    background: 'rgba(255, 255, 255, 1)',
    color: 'gray',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.5)',
    },
    '& $sidebarMiniIcon': {
      color: theme.palette.primary.main,
    },
  },
  sidebarMiniIcon: {
    color: theme.palette.common.white,
    width: '20px',
    height: '20px',
  },
});

export default headerStyle;
