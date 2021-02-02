// ##############################
// ResetPasswordPage view styles
// #############################

import { getContainer, cardTitle } from 'assets/jss/themeHelpers.jsx';

const resetPasswordPageStyle = (theme) => ({
  container: {
    ...getContainer(theme),
    zIndex: '4',
    paddingTop: '50px',
    paddingBottom: '50px',
    boxShadow: theme.shadows[17],
    background: '#fff',
  },
  cardTitle: {
    ...cardTitle,
    color: '#FFFFFF',
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: '#FFFFFF',
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
  textError: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  mutedText: {
    color: '#777',
  },
  resetButton: {
    marginTop: theme.spacing(4),
  },
  goToButton: {
    marginBottom: theme.spacing(3),
  },
});

export default resetPasswordPageStyle;
