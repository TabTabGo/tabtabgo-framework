const styles = (theme) => ({
  root: {
    width: '100%',
  },
  panel: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: theme.palette.grey[100],
    boxShadow: 'none',
  },
  expanded: {
    borderTop: '2px solid',
    borderColor: theme.palette.primary.main,
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
});

export default styles;
