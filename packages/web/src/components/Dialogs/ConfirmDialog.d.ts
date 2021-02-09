declare var _default: React.ComponentType<Pick<PropTypes.InferProps<{
    open: PropTypes.Validator<boolean>;
    title: PropTypes.Validator<string>;
    message: PropTypes.Validator<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    onConfirm: PropTypes.Validator<(...args: any[]) => any>;
    onCancel: PropTypes.Validator<(...args: any[]) => any>;
    confirmLabel: PropTypes.Requireable<string>;
    cancelLabel: PropTypes.Requireable<string>;
    isBusy: PropTypes.Requireable<boolean>;
    error: PropTypes.Requireable<string>;
    classes: PropTypes.Requireable<any>;
}>, "error" | "open" | "message" | "title" | "children" | "isBusy" | "onConfirm" | "cancelLabel" | "confirmLabel" | "onCancel"> & import("@material-ui/core").StyledComponentProps<"errorContainer" | "progressWrapper">>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
