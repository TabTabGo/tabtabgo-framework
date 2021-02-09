declare var _default: React.ComponentType<Pick<PropTypes.InferProps<{
    open: PropTypes.Validator<boolean>;
    title: PropTypes.Validator<string>;
    message: PropTypes.Requireable<string>;
    imageSource: PropTypes.Requireable<FormDataEntryValue>;
    uploadImage: PropTypes.Validator<(...args: any[]) => any>;
    onConfirm: PropTypes.Validator<(...args: any[]) => any>;
    onCancel: PropTypes.Validator<(...args: any[]) => any>;
    confirmLabel: PropTypes.Requireable<string>;
    cancelLabel: PropTypes.Requireable<string>;
}>, "open" | "message" | "title" | "onConfirm" | "cancelLabel" | "confirmLabel" | "onCancel" | "imageSource" | "uploadImage"> & import("@material-ui/core").StyledComponentProps<never>>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
