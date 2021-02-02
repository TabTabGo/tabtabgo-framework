import React from 'react';
import PropTypes from 'prop-types';

import FileReaderInput from 'react-file-reader-input';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  IconButton,
  Slide,
  Grid,
  Hidden,
  Dialog,
  DialogActions,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';

import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import RotateRight from '@material-ui/icons/RotateRight';
import RotateLeft from '@material-ui/icons/RotateLeft';

import AvatarEditor from 'react-avatar-editor';

const imageEditorDialogStyle = () => {};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImageEditorDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
    uploadImage: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
  };

  initialState = {
    isBusy: false,
    scale: 1.0,
    rotationDegree: 0,
    newImage: undefined,
  };

  state = {
    ...this.initialState,
  };

  handleFileChange = (e, results) => {
    let selectedFile;

    results.forEach((result) => {
      const [, file] = result;
      selectedFile = file;
    });

    this.setState({ newImage: selectedFile });
  };

  handleCancel = () => {
    this.props.onCancel();
    this.setState({
      ...this.initialState,
    });
  };

  handleConfirm = async () => {
    if (this.editor) {
      this.setState({ isBusy: true });

      this.editor.getImage().toBlob(async (image) => {
        try {
          let avatarFile = this.state.newImage ? this.state.newImage : this.props.imageSource;

          await this.props.uploadImage(image, {
            fileName: avatarFile.name,
            extension: avatarFile.name ? avatarFile.name.split('.').pop() : '.jpeg',
            originalMediaType: avatarFile.type,
            OriginalFileName: avatarFile.name,
          });
          this.setState({ isBusy: false }, () => this.props.onConfirm());
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('error', error);
          this.setState({ isBusy: false });
        }
      });
    }
  };

  zoomIn() {
    let newScale = this.state.scale + 0.1;

    newScale = newScale > 2.0 ? 2.0 : newScale;

    this.setState({ scale: newScale });
  }

  zoomOut() {
    let newScale = this.state.scale - 0.1;

    newScale = newScale < 0.5 ? 0.5 : newScale;

    this.setState({ scale: newScale });
  }

  rotateRight() {
    let newRotation = this.state.rotationDegree + 90;

    newRotation = newRotation === 360 ? 0 : newRotation;

    this.setState({ rotationDegree: newRotation });
  }

  rotateLeft() {
    let newRotation = this.state.rotationDegree - 90;

    newRotation = newRotation === -360 ? 0 : newRotation;

    this.setState({ rotationDegree: newRotation });
  }

  getContentView() {
    const { cancelLabel, confirmLabel, title } = this.props;
    return (
      <React.Fragment>
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <Grid
          container
          justify="center"
          style={{ background: 'black', flex: 1, flexDirection: 'column' }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvatarEditor
              ref={(editor) => (this.editor = editor)}
              image={this.state.newImage ? this.state.newImage : this.props.imageSource}
              width={256}
              height={256}
              borderRadius={128}
              scale={this.state.scale}
              color={[0, 0, 0, 0.75]}
              rotate={this.state.rotationDegree}
              style={{ background: 'black' }}
              disabled={this.state.isBusy}
              crossOrigin="anonymous"
            />
          </div>

          <Grid item xs={12} style={{ background: '#232323', flex: 0 }}>
            <Grid container justify="center">
              <IconButton
                onClick={() => this.zoomOut()}
                disabled={this.state.isBusy}
                style={{ color: 'white', margin: 8 }}
              >
                <ZoomOut fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => this.zoomIn()}
                disabled={this.state.isBusy}
                style={{ color: 'white', margin: 8 }}
              >
                <ZoomIn fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => this.rotateRight()}
                disabled={this.state.isBusy}
                style={{ color: 'white', margin: 8 }}
              >
                <RotateRight fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => this.rotateLeft()}
                disabled={this.state.isBusy}
                style={{ color: 'white', margin: 8 }}
              >
                <RotateLeft fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          {/* when we integrate the service, show progress when busy}
            {/* <CircularProgress style={{ margin: 8 }} size={30} />; */}
          <Button onClick={this.handleCancel} color="primary" disabled={this.state.isBusy}>
            {cancelLabel ? cancelLabel : 'Cancel'}
          </Button>
          <FileReaderInput
            id="profile-image-input"
            accept="image/*"
            multiple={false}
            onChange={this.handleFileChange}
          >
            <Button color="primary" disabled={this.state.isBusy}>
              {'Change Photo'}
            </Button>
          </FileReaderInput>
          <div style={{ position: 'relative' }}>
            {this.state.isBusy && (
              <CircularProgress
                style={{ position: 'absolute', marginTop: 4, right: 'calc(50% - 12px)' }}
                size={28}
              />
            )}
            <Button
              onClick={this.handleConfirm}
              color="primary"
              variant="outlined"
              disabled={this.state.isBusy}
            >
              {confirmLabel ? confirmLabel : 'Save Photo'}
            </Button>
          </div>
        </DialogActions>
      </React.Fragment>
    );
  }

  render() {
    const { open } = this.props;

    const dialogProps = {
      TransitionComponent: Transition,
      keepMounted: false,
      open: open,
      onClose: this.handleCancel,
      'aria-labelledby': 'confirm-dialog-title',
    };

    return (
      <div>
        <Hidden smDown>
          <Dialog fullWidth {...dialogProps}>
            {this.getContentView()}
          </Dialog>
        </Hidden>
        <Hidden mdUp>
          <Dialog fullScreen {...dialogProps}>
            {this.getContentView()}
          </Dialog>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(imageEditorDialogStyle)(ImageEditorDialog);
