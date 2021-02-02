const decoratedInputStyle = (theme) => ({
  decoratedInputContainer: {
    position: 'relative',
    marginLeft: theme.spacing(4),
  },
  detachedAdornmentContainer: {
    position: 'absolute',
    top: theme.spacing(4.5),
    left: -1 * theme.spacing(4.5),
  },
});

export default decoratedInputStyle;
