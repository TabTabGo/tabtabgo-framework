import React from 'react';
import ImageUploader from './ImageUploader';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Button } from 'react-bootstrap';
import './ImageGallery.scss';

export default class AdpeImageGallery extends React.Component {
  render() {
    const { onSlide, onUploadImage, onDeleteImage, enableDelete } = this.props;
    let { images } = this.props;
    if (!images) images = [];
    let haveImages = true;
    if (images.length === 0) {
      haveImages = false;
      images.push({ original: '/media/article_placeholder.jpg' });
    }

    return (
      <div>
        <ImageGallery
          defaultImage="/media/article_placeholder.jpg"
          style={
            this.props.style || {
              minHeight: '300px',
              minWidth: '533px',

              width: 'auto',
              height: 'auto',
            }
          }
          items={images}
          showThumbnails={images.length > 1}
          lazyLoad={true}
          showNav={true}
          showPlayButton={images.length > 1}
          onSlide={onSlide}
          disableArrowKeys={false}
        />
        <div className="image-gallery-toolbar">
          <ImageUploader
            isReadOnly={false}
            disablePreview={true}
            ratio={this.props.ratio || 1.78}
            updateImage={onUploadImage}
            isUploading={this.props.isUploading}
          />{' '}
          {enableDelete && haveImages ? (
            <Button onClick={onDeleteImage} disabled={this.props.isUploading} bsStyle="error">
              حذف الصورة
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
