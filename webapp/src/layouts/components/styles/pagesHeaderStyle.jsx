// ##############################
// // // Pages Header styles
// #############################

import {
  getContentContainer,
  defaultFont,
  defaultBoxShadow,
  boxShadow,
  transition,
} from 'assets/jss/themeHelpers.jsx';

const pagesHeaderStyle = (theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '209',
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    ...getContentContainer(theme),
    minHeight: '50px',
  },
  centeredContainer: {
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    paddingLeft: 0,
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: theme.palette.pages.headerLinkTextColor,
    '&:hover,&:focus': {
      background: 'transparent',
      color: theme.palette.primary.main,
    },
  },
  titleLight: {
    color: theme.palette.pages.light.headerLinkTextColor,
  },
  logo: {
    width: '180px',
    margin: '16px',
    [theme.breakpoints.down('xs')]: {
      width: '140px',
      margin: 0,
    },
  },
  appResponsive: {
    top: '8px',
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
  list: {
    ...defaultFont,
    fontSize: '14px',
    margin: 0,
    marginRight: '-15px',
    paddingLeft: '0',
    listStyle: 'none',
    color: theme.palette.common.white,
    paddingTop: '0',
    paddingBottom: '0',
  },
  listItem: {
    float: 'left',
    position: 'relative',
    display: 'block',
    width: 'auto',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      zIndex: '999',
      width: '100%',
      paddingRight: '15px',
    },
  },
  navLink: {
    color: theme.palette.pages.headerLinkTextColor,
    margin: '0 5px',
    paddingTop: '15px',
    paddingBottom: '15px',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    lineHeight: '20px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    textDecoration: 'none',
    '&:hover,&:focus': {
      color: theme.palette.pages.headerLinkTextColor,
      background: theme.palette.pages.headerLinkHoverBackground,
    },
  },
  navLinkLight: {
    color: theme.palette.pages.light.headerLinkTextColor,
    '&:hover,&:focus': {
      color: theme.palette.pages.light.headerLinkTextColor,
      background: theme.palette.pages.light.headerLinkHoverBackground,
    },
  },
  listItemIcon: {
    marginTop: '-3px',
    top: '0px',
    position: 'relative',
    marginRight: '3px',
    width: '20px',
    height: '20px',
    verticalAlign: 'middle',
    color: 'inherit',
    display: 'inline-block',
    '& svg': {
      fontSize: '20px',
    },
  },
  listItemText: {
    flex: 'none',
    padding: '0',
    minWidth: '0',
    margin: 0,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    backgroundColor: theme.palette.pages.headerLinkActiveBackground,
  },
  navLinkActiveLight: {
    backgroundColor: theme.palette.pages.light.headerLinkActiveBackground,
  },
  drawerPaper: {
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    ...boxShadow,
    width: theme.custom.layout.drawer.width,
    ...boxShadow,
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    paddingTop: theme.spacing(1),
    ...transition,
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      top: '0',
    },
    '&:after': {
      background: '#fff',
      opacity: '.8',
    },
  },
  drawerPaperLight: {
    '&:after': {
      background: '#000',
      opacity: '.8',
    },
  },
  sidebarButton: {
    '&,&:hover,&:focus': {
      color: theme.palette.pages.headerLinkTextColor,
    },
    top: '-2px',
  },
  sidebarButtonLight: {
    '&,&:hover,&:focus': {
      color: theme.palette.pages.light.headerLinkTextColor,
    },
  },
});

export default pagesHeaderStyle;
