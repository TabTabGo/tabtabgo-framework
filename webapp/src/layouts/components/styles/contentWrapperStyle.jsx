import { containerFluid } from 'assets/jss/themeHelpers.jsx';

const contentWrapperStyle = (theme) => ({
  title: {
    color: 'white',
    flexGrow: 1,
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
    },
    marginTop: '32px',
    padding: '30px 4px',
    minHeight: 'calc(100vh - 123px)',
  },
  contentFlatten: {
    padding: 0,
    margin: 0,
    '& $contentBody': {
      boxShadow: 'none',
    },
  },
  container: {
    ...containerFluid,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  containerNoHeader: {
    paddingTop: theme.spacing(1),
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    '& h3 small': {
      display: 'block',
      fontSize: 'small',
      color: theme.palette.grey[100],
    },
  },
  contentBody: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    paddingBottom: theme.spacing(4),
  },
  toolbarButtons: {
    button: {
      color: 'white',
    },
    iconButton: {
      color: 'white',
    },
  },
  appBar: {
    top: 'auto',
    marginTop: -8,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fabButton: {
    float: 'right',
    zIndex: 1,
    color: 'white',
    right: theme.spacing(2),
    bottom: theme.spacing(7),
  },
  fabExtendedIcon: {
    marginRight: theme.spacing(1),
  },
});

export default contentWrapperStyle;
