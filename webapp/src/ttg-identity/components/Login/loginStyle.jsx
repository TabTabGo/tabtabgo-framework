// ##############################
// // // LoginPage view styles
// #############################

import { cardTitle, transition } from 'assets/jss/themeHelpers.jsx';

const loginStyle = (theme) => ({
  cardTitle: {
    ...cardTitle,
    color: '#FFFFFF',
  },
  logo: {
    width: '50%',
    margin: '16px',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  mutedColor: {
    color: '#888',
  },
  textError: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  textRight: {
    textAlign: 'right',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: '#FFFFFF',
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  loginButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4.5),
    paddingRight: theme.spacing(4.5),
    fontSize: '1em',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  progressWrapper: {
    margin: 0,
    position: 'relative',
  },
  progressOverlay: {
    position: 'absolute',
    background: 'rgba(255, 255,255, 0.3)',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  buttonProgress: {
    color: theme.palette.primary.light,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
  input: {
    marginRight: '-30px',
    paddingRight: '30px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: '#888 !important',
  },
  inputAdornmentIconButton: {
    marginRight: '-12px',
    marginLeft: '-12px',
  },
  loginCard: {
    ...transition,
    boxShadow: theme.shadows[17],
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  cardBodyCanRegister: {
    borderBottom: '#eee 1px solid',
  },
  cardFooter: {
    marginBottom: theme.spacing(2),
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
});

export default loginStyle;
