import React from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  IconButton,
  Button,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import FileReaderInput from 'react-file-reader-input';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { isEmpty } from '@tabtabgo/core/Utilities';
import Img from 'react-image';

import FileService from '@tabtabgo/core/Services/FileService';
import imageInputStyle from './styles/imageInputStyle';

const ImageWrapper = (props) => (
  <div style={{ position: 'relative', height: 120, width: 120, ...props.style }}>
    {props.isLoading && (
      <CircularProgress
        style={{
          position: 'absolute',
          marginTop: 4,
          right: 'calc(50% - 12px)',
          top: 'calc(50% - 20px)',
        }}
        size={28}
      />
    )}
    {props.children}
  </div>
);
ImageWrapper.propTypes = {
  isLoading: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.any,
};
class ImageInput extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    fileService: PropTypes.object,
    fileProps: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
    buttonLabel: PropTypes.string,
    alt: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  state = {
    uploading: false,
    selectedImage: undefined,
    imageLoaded: false,
  };

  constructor(props) {
    super(props);
    this.currentFileService = props.fileService || new FileService();
  }

  handleFileChange = async (e, results) => {
    const { onChange, fileProps } = this.props;
    let selectedFile;

    results.forEach((result) => {
      const [, file] = result;
      selectedFile = file;
    });

    this.setState({ uploading: true, selectedImage: URL.createObjectURL(selectedFile) });
    try {
      let fileExtraProps = {
        fileName: selectedFile.name,
        ...selectedFile,
      };
      if (fileProps) {
        fileExtraProps = Object.assign(fileExtraProps, fileProps);
      }
      const uploadedFile = await this.currentFileService.uploadFile(selectedFile, fileExtraProps);
      let newEvent = { target: { value: uploadedFile } };

      onChange(newEvent);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Failed to upload image error', error);
      this.setState({
        error: true,
        helperText: 'Failed to upload image. ' + error.status + ' ' + error.message,
      });
    } finally {
      this.setState({ uploading: false });
    }
  };

  removeImage = () => {
    let newEvent = { target: { value: undefined } };

    this.props.onChange(newEvent);
  };

  getImageUrl = (fileId) => {
    if (this.state.selectedImage) return this.state.selectedImage;
    return this.currentFileService.getImageUrl(`/${fileId}`);
  };

  getHelperText = () => {
    if (this.props.helperText || this.state.helperText) {
      return (
        <FormHelperText error={this.props.error || this.state.error}>
          {this.props.helperText || this.state.helperText}
        </FormHelperText>
      );
    }
  };
  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes, value, alt, style } = this.props;

    //TODO get image url

    if (!isEmpty(value)) {
      let src = '';
      if (typeof value === 'string' && (value.startsWith('/') || value.startsWith('http'))) {
        src = value.startsWith('http') ? value : this.currentFileService.getImageUrl(value);
      } else if (typeof value === 'object' && value.fileId) {
        src = this.getImageUrl(value.fileId);
      } else src = this.getImageUrl(value);

      return (
        <div className={classes.imageContainer} style={style}>
          {this.state.imageLoaded && (
            <IconButton className={classes.removeButton} onClick={this.removeImage}>
              <RemoveCircle />
            </IconButton>
          )}
          <Img
            src={src}
            className={classes.image + (this.props.error ? ' ' + classes.errorImage : '')}
            alt={alt || ''}
            loader={<ImageWrapper isLoading={true} style={{ background: '#eee' }} />}
            onLoad={() => this.setState({ imageLoaded: true })}
          />
          {this.getHelperText()}
        </div>
      );
    }

    return (
      <div style={style}>
        <div className={classes.imageContainer}>
          <ImageWrapper isLoading={this.state.uploading}>
            <FileReaderInput
              id="job-image-input"
              accept="image/*"
              multiple={false}
              onChange={this.handleFileChange}
              disabled={this.state.isBusy || this.state.uploading}
            >
              <Button
                color="primary"
                variant="outlined"
                disabled={this.state.isBusy || this.state.uploading}
                className={classes.addButton + (this.props.error ? ' ' + classes.errorButton : '')}
              >
                {this.props.buttonLabel}
              </Button>
            </FileReaderInput>
          </ImageWrapper>
        </div>
        {this.getHelperText()}
      </div>
    );
  }
}

export default withStyles(imageInputStyle)(ImageInput);
