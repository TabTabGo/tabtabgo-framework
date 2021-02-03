// ##############################
// // // LoginPage view styles
// #############################

import { getContainer } from 'assets/jss/themeHelpers';

const loginPageStyle = (theme) => ({
  container: {
    ...getContainer(theme),
    zIndex: '4',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  loginButton: {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
});

export default loginPageStyle;
