import { emphasize } from '@material-ui/core/styles/colorManipulator';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  input: {
    display: 'flex',
    //paddingTop: 0,
    minWidth: '200px',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
  },
  container: {
    marginTop: '20px',
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
    height: theme.spacing(1),
    '& svg': {
      margin: 0,
    },
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
    fontWeight: 300,
  },
  placeholder: {
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 9,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

export default styles;
