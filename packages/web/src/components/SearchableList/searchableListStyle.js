const styles = (theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 350,
  },
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: '3em',
    width: 'unset',
  },
  inputContainer: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    marginTop: '20px',
  },
  valueContainer: {
    flexWrap: 'wrap',
    height: 'auto',
    maxHeight: 'unset',
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
});
export default styles;
