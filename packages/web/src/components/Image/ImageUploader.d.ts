export default ImageUploader;
declare class ImageUploader extends React.Component<any, any, any> {
    static propTypes: {
        src: PropTypes.Requireable<string>;
        updateImage: PropTypes.Requireable<(...args: any[]) => any>;
        enableDownload: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<any>;
        disablePreview: PropTypes.Requireable<boolean>;
        isReadOnly: PropTypes.Requireable<boolean>;
        saveImageOptions: PropTypes.Requireable<PropTypes.InferProps<{
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
            imageSmoothingEnabled: PropTypes.Requireable<boolean>;
            imageSmoothingQuality: PropTypes.Requireable<string>;
        }>>;
    };
    constructor(props: any);
    confirm(): void;
    close(): void;
    open(): void;
    handleChangeFile: (e: any) => void;
    fileName: any;
    handleCrop: (data: any) => void;
    cropper: HTMLImageElement;
    inputImage: HTMLInputElement;
}
import React from "react";
import PropTypes from "prop-types";
