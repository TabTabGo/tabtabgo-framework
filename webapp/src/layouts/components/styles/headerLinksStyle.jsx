// ##############################
// // // HeaderLinks styles
// #############################

import customDropdownStyle from './customDropdownStyle';

const headerLinksStyle = (theme) => ({
  ...customDropdownStyle(theme),
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  loadingProgressWrapper: {
    display: 'inline-block',
    marginRight: '12px',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  textButtonLink: {
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    background: 'rgba(255,255,255,0.2)',
    boxShadow: theme.shadows[3],
  },
  buttonLink: {
    color: theme.palette.common.white,
  },
  top: {
    zIndex: '4',
  },
  links: {
    width: '20px',
    height: '20px',
    zIndex: '4',
  },
  notifications: {
    zIndex: '4',
    position: 'absolute',
    top: '5px',
    border: '1px solid #FFF',
    right: '5px',
    fontSize: '9px',
    background: theme.palette.error.main,
    color: '#FFFFFF',
    minWidth: '16px',
    height: '16px',
    borderRadius: '10px',
    textAlign: 'center',
    lineHeight: '14px',
    verticalAlign: 'middle',
    display: 'block',
  },
  managerClasses: {
    display: 'inline-block',
  },
  headerLinksSvg: {
    width: '20px !important',
    height: '20px !important',
  },
  actionButtonWrapper: {
    position: 'relative',
  },
  progressWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

export default headerLinksStyle;
