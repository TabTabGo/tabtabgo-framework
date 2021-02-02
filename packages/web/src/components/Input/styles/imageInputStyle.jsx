const imageInputStyle = (theme) => ({
  imageContainer: {
    position: 'relative',
    marginTop: theme.spacing(2),
    height: 120,
    width: 'fit-content',
  },
  image: {
    height: 120,
  },
  addButton: {
    height: 120,
    width: 120,
    zIndex: 3,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    left: -10,
    padding: 0,
  },
  errorButton: {
    color: 'red',
    borderColor: 'red',
  },
  errorImage: {
    borderColor: 'red',
    borderWidth: '2',
    borderStyle: 'solid',
  },
});

export default imageInputStyle;
