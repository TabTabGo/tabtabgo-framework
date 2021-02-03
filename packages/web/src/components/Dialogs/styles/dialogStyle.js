const style = (theme) => ({
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
});

export default style;
