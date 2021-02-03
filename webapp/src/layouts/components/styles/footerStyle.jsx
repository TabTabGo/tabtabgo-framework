// ##############################
// // // Footer styles
// #############################

import { defaultFont, getContainer, containerFluid } from 'assets/jss/themeHelpers';

const footerStyle = (theme) => ({
  block: {},
  centeredContainer: {
    '& $right': {
      textAlign: 'center',
      paddingLeft: 0,
    },
  },
  left: {
    display: 'block',
    padding: '15px',
    paddingLeft: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  right: {
    margin: '0',
    fontSize: '14px',
    padding: '15px',
    paddingRight: 0,
    flexGrow: 1,
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingLeft: 0,
    },
  },
  footer: {
    bottom: '0',
    borderTop: '1px solid #e7e7e7',
    padding: '15px 0',
    color: 'black',
    ...defaultFont,
    zIndex: 4,
  },
  container: {
    zIndex: 3,
    ...getContainer(theme),
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: 'relative',
    paddingLeft: '30px',
    paddingRight: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  a: {
    color: theme.palette.pages.footerLinkTextColor,
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&:hover,&:focus': {
      color: theme.palette.primary.main,
    },
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0',
    width: 'auto',
  },
  lightColor: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
    },
  },
});
export default footerStyle;
