const style = (theme) => ({
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  fullScreenTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  progressWrapper: {
    position: 'absolute',
    right: 18,
  },
  errorContainer: {
    color: 'red',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0.5) * 1.5,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  dialogContent: {
    height: '100%',
  },
});

export default style;
