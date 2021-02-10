// ##############################
// // // PasswordRecoveryPage view styles
// #############################

import { cardTitle, getContainer } from 'assets/jss/themeHelpers';

const passwordRecoveryPagePageStyle = (theme) => ({
  cardTitle,
  container: {
    ...getContainer(theme),
    zIndex: '4',
    paddingTop: '50px',
    paddingBottom: '50px',
    boxShadow: theme.shadows[17],
    background: '#fff',
  },
  customCardClass: {
    width: '240px',
    margin: '60px auto 0',
    color: '#FFFFFF',
    display: 'block',
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 300ms linear',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardAvatar: {
    maxWidth: '90px',
    maxHeight: '90px',
    marginTop: '-45px',
  },
  customCardFooterClass: {
    border: 'none',
    paddingTop: '0',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  textCenter: {
    textAlign: 'center',
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
  recoverButton: {
    marginTop: theme.spacing(4),
  },
});

export default passwordRecoveryPagePageStyle;
