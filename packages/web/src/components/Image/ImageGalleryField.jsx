import React from 'react';
import ImageGallery from './ImageGallery';
import { BaseValidationField } from './ValidationField';
import { currentServiceProvider } from 'ttg-react/core/ServiceProvider';

import swal from 'sweetalert';
export default class ImageGalleryField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isUploadingImage: false, currentImageIndex: 0 };
    this.mediaFileService = currentServiceProvider.getFileService();
  }
  handleUpdateImage = (onChange, canvasData, fileName) => {
    const { referenceId, referenceType, input, allowMultipleImages, featureMediaFile } = this.props;
    let mediaFiles = this.getMediaFiles(input);
    if (canvasData) {
      canvasData.toBlob(
        (blob) => {
          let imageProps = {
            fileName: fileName,
            extension: 'jpg',
            mediaCategoryId: 7,
            fileType: 'jpg',
            mediaType: 'image',
          };

          if (referenceId) {
            Object.assign(imageProps, {
              referenceId: referenceId,
              referenceType: referenceType,
            });
          }
          this.setState({ isUploadingImage: true }, () => {
            this.mediaFileService
              .uploadFile(blob, imageProps)
              .then((result) => {
                if (onChange) {
                  let newMediaFile = allowMultipleImages ? Object.assign([], mediaFiles) : [];
                  newMediaFile.push({ mediaFileId: result.mediaFileId });
                  this.setState({ isUploadingImage: false }, () =>
                    onChange(featureMediaFile ? result.mediaFileId : newMediaFile),
                  );
                }
              })
              .catch((error) => {
                swal({
                  text: `تعذر تحميل الصورة. يرجى المحاولة مرة أخرى.`,
                  icon: 'error',
                  button: 'تم',
                });

                this.setState({ isUploadingImage: false });
              });
          });
        },
        'image/jpeg',
        0.95,
      );
    }
  };

  handleDeleteImage = (onChange) => {
    const { input } = this.props;
    const mediaFiles = this.getMediaFiles(input);
    const { currentImageIndex } = this.state;
    if (currentImageIndex < mediaFiles.length) {
      let newMediaFiles = Object.assign([], mediaFiles);
      newMediaFiles.splice(currentImageIndex, 1);
      onChange(newMediaFiles);
    }
  };

  getMediaFiles = (input) => {
    let mediaFiles = [];
    if (input.value) {
      if (Array.isArray(input.value)) {
        mediaFiles = input.value;
      } else {
        mediaFiles.push({ mediaFileId: input.value });
      }
    }

    return mediaFiles;
  };

  render = () => {
    const { input, enablePlayControls, ratio, style, enableDelete } = this.props;
    const mediaFiles = this.getMediaFiles(input);
    var images = [];
    if (mediaFiles)
      for (var i = 0; i < mediaFiles.length; i++) {
        images.push({
          original: this.mediaFileService.getImageUrl(mediaFiles[i].mediaFileId),
          thumbnail: this.mediaFileService.getImageUrl(mediaFiles[i].mediaFileId, 'ThumbMedium'),
        });
      }

    return (
      <BaseValidationField {...this.props}>
        <ImageGallery
          images={images}
          style={style}
          ratio={ratio}
          enableDelete={enableDelete}
          isUploading={this.state.isUploadingImage}
          enablePlayControls={enablePlayControls}
          onSlide={(currentImageIndex) => this.setState({ currentImageIndex })}
          onUploadImage={this.handleUpdateImage.bind(this, input.onChange)}
          onDeleteImage={this.handleDeleteImage.bind(this, input.onChange)}
        />
      </BaseValidationField>
    );
  };
}
