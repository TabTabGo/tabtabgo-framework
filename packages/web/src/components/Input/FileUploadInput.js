import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, CircularProgress } from '@material-ui/core';

import CloudDownload from '@material-ui/icons/CloudDownload';

import ValidationInput from '../components/Validations/Input';
import FileService from '@tabtabgo/core/Services/FileService';
import fileUploadInputStyle from './styles/fileUploadInputStyleutStyle';

class FileUploadInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fileService: PropTypes.object,
    fileProps: PropTypes.object,
    InputProps: PropTypes.object,
    onChange: PropTypes.func,
  };

  state = {
    uploading: false,
    downloading: false,
  };

  constructor(props) {
    super(props);
    this.currentFileService = props.fileService || new FileService();
  }
  handleChangeFile = async (e) => {
    const { onChange, fileProps } = this.props;
    var file = e.target.files[0];
    if (file) {
      //TODO handle auto upload
      this.setState({ uploading: true });
      try {
        let fileExtraProps = {
          fileName: file.name,
          ...file,
        };
        if (fileProps) {
          fileExtraProps = Object.assign(fileExtraProps, fileProps);
        }
        const uploadedFile = await this.currentFileService.uploadFile(file, fileExtraProps);
        let newEvent = { target: { value: uploadedFile } };

        onChange(newEvent);
      } catch (error) {
        console.log('Failed to upload file error', error);
        this.fileInput.value = '';
      } finally {
        this.setState({ uploading: false });
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('No file Selected');
    }
  };

  handleDownloadFile = (file) => {
    let fileId = null;
    if (typeof file === 'object' && file.fileId) {
      fileId = file.fileId;
    } else {
      fileId = file;
    }
    if (fileId) {
      //TODO download file
    } else {
      // eslint-disable-next-line no-console
      console.log('error download file. FileId is empty');
    }
  };
  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes, InputProps, value, fileService, autoUpload, fileProps, ...rest } = this.props;

    return (
      <ValidationInput
        {...rest}
        onChange={this.handleChangeFile.bind(this)}
        type="file"
        inputRef={(ref) => (this.fileInput = ref)}
        InputProps={{
          ...InputProps,
          autoComplete: 'off',
          classes: { input: classes.inputWithEndAdornment },
          endAdornment: (
            <InputAdornment position="end">
              {this.state.uploading ? <CircularProgress /> : null}
              <IconButton
                aria-label="Download file"
                onClick={this.handleDownloadFile.bind(this, value)}
                className={classes.inputAdornmentIconButton}
              >
                {this.state.downloading ? (
                  <CircularProgress className={classes.inputAdornmentIcon} />
                ) : (
                  <CloudDownload className={classes.inputAdornmentIcon} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default withStyles(fileUploadInputStyle)(FileUploadInput);
