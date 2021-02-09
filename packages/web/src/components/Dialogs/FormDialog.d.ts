declare var _default: React.ComponentType<Pick<PropTypes.InferProps<{
    open: PropTypes.Validator<boolean>;
    title: PropTypes.Validator<string>;
    isBusy: PropTypes.Requireable<boolean>;
    error: PropTypes.Requireable<string>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    onConfirm: PropTypes.Validator<(...args: any[]) => any>;
    onCancel: PropTypes.Validator<(...args: any[]) => any>;
    confirmLabel: PropTypes.Requireable<string>;
    contentText: PropTypes.Requireable<string>;
    classes: PropTypes.Requireable<any>;
}>, "error" | "open" | "title" | "children" | "isBusy" | "onConfirm" | "confirmLabel" | "onCancel" | "contentText"> & import("@material-ui/core").StyledComponentProps<"errorContainer" | "progressWrapper">>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
