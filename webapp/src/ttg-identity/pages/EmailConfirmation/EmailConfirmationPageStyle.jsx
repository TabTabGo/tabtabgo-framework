import { getContainer } from 'assets/jss/themeHelpers';

const confirmationPageStyle = (theme) => ({
  container: {
    ...getContainer(theme),
    zIndex: '4',
    paddingTop: '50px',
    paddingBottom: '50px',
    boxShadow: theme.shadows[17],
    background: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
  textError: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progress: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  mutedText: {
    color: '#777',
  },
  goToButton: {
    marginBottom: theme.spacing(3),
  },
});

export default confirmationPageStyle;
