const editableImageStyle = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      '& $content': {
        transform: 'translate3d(0, -56px, 0)',
      },
      '& $hoverContent': {
        visibility: 'visible',
      },
    },
  },
  content: {
    zIndex: 1,
    transition: 'all 300ms cubic-bezier(0.34, 1.61, 0.7, 1)',
  },
  hoverContent: {
    zIndex: 2,
    marginTop: -50,
    textAlign: 'center',
    visibility: 'hidden',
  },
};

export default editableImageStyle;
