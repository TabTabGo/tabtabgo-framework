import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cropper from 'react-cropper';
import { Loader } from 'react-loaders';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/fontawesome-free-solid';
import { Grid, Row, Col, Panel, Button, Modal, Label } from 'react-bootstrap';
// Image Cropper
import 'cropperjs/dist/cropper.css';

class ImageUploader extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    updateImage: PropTypes.func,
    enableDownload: PropTypes.bool,
    style: PropTypes.any,
    disablePreview: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    saveImageOptions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      imageSmoothingEnabled: PropTypes.bool,
      imageSmoothingQuality: PropTypes.oneOf(['low', 'medium', 'high']),
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      showImageCropper: false,
      cropData: null,
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}

  confirm() {
    if (this.cropper) {
      if (this.props.updateImage) {
        this.props.updateImage(
          this.cropper.getCroppedCanvas(this.props.saveImageOptions),
          this.fileName,
        );
      }
      if (this.previewImage) {
        this.previewImage.src = this.cropper
          .getCroppedCanvas(this.props.saveImageOptions)
          .toDataURL();
      }
      if (this.props.enableDownload) {
        this.refs.btnDownload.href = this.cropper
          .getCroppedCanvas(this.props.saveImageOptions)
          .toDataURL();
        this.refs.btnDownload.download = `${moment().format('YYYYMMDDhhmmss')}.jpeg`;
      }
      this.close();
    }
  }

  close() {
    this.setState({ showImageCropper: false });
  }

  open() {
    this.setState({ showImageCropper: true }, () => {
      if (this.inputImage) this.inputImage.click();
    });
  }

  handleChangeFile = (e) => {
    var files = e.target.files,
      file;

    if (!this.cropper.getData()) {
      return;
    }

    if (files && files.length) {
      file = files[0];

      if (/^image\/\w+$/.test(file.type)) {
        let blobURL = URL.createObjectURL(file);
        this.cropper.reset().replace(blobURL);
        this.fileName = file.name;
        this.inputImage.value = '';
      } else {
        alert('الرجاء اختيار صورة.');
      }
    }
  };

  handleCrop = (data) => {
    this.setState({
      cropData: this.cropper.getCroppedCanvas(this.props.saveImageOptions).toDataURL(),
    });
    // this.cropper
    // console.log(self.cropperElement.cropper('getCroppedCanvas').toDataURL()); //
    // base64 console.log('Data X: ' + (Math.round(data.x))); console.log('Data Y:
    // ' + (Math.round(data.y))); console.log('Data Height: ' +
    // (Math.round(data.height))); console.log('Data Width: ' +
    // (Math.round(data.width))); console.log('Data Rotate: ' +
    // (Math.round(data.rotate)));
  };
  render() {
    const options = {
      aspectRatio: this.props.ratio || 'free',
      // preview: this.previewImage,
      viewMode: 1,
      guides: true,
      crop: this.handleCrop.bind(this),
    };

    return (
      <div style={this.props.style}>
        <Modal
          bsSize="large"
          aria-labelledby="mdlProfileImage"
          onHide={this.close.bind(this)}
          show={this.state.showImageCropper}
        >
          <Modal.Header closeButton>
            <Modal.Title id="mdlProfileImage">اختر الصورة</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row>
                <Col sm={9}>
                  <Cropper
                    ref={(ref) => (this.cropper = ref)}
                    id="cropperImage"
                    style={{
                      height: 400,
                      width: '100%',
                    }}
                    src={this.props.src ? this.props.src : '/media/article_placeholder.jpg'}
                    {...options}
                  />
                </Col>
              </Row>
              <Row className="mt">
                <Col lg={4} />
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success  pull-left" onClick={this.confirm.bind(this)}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button className="btn btn-danger pull-left" onClick={this.close.bind(this)}>
              <FontAwesomeIcon icon={faBan} />
            </Button>

            <label
              htmlFor="inputImage"
              title="Upload image file"
              className="btn btn-info btn-upload"
            >
              <input
                ref={(ref) => {
                  this.inputImage = ref;
                  if (this.inputImage && this.state.showImageCropper) this.inputImage.click();
                }}
                id="inputImage"
                name="file"
                type="file"
                accept="image/*"
                onChange={this.handleChangeFile.bind(this)}
                className="sr-only"
              />
              <span
                data-toggle="tooltip"
                title="Import image with Blob URLs"
                className="docs-tooltip"
              >
                اختر صورة أخرى
              </span>
            </label>
          </Modal.Footer>
        </Modal>
        <div>
          {this.props.isUploading}
          {this.props.isReadOnly ? (
            ''
          ) : this.props.isUploading ? (
            <Loader type="ball-pulse" />
          ) : (
            <Button onClick={this.open.bind(this)} disabled={this.props.isUploading}>
              اختر صورة
            </Button>
          )}
          {this.props.enableDownload ? (
            <a className="btn" ref="btnDownload">
              تنزيل
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default ImageUploader;
