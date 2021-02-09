declare var _default: React.ComponentType<Pick<PropTypes.InferProps<{
    content: PropTypes.Requireable<object>;
    classes: PropTypes.Requireable<object>;
    autoFocus: PropTypes.Requireable<boolean>;
    onChange: PropTypes.Requireable<(...args: any[]) => any>;
}>, "content" | "onChange" | "autoFocus"> & import("@material-ui/core/styles").StyledComponentProps<"toolbar" | "root" | "wrapper" | "editor">>;
export default _default;
export function convertHtmlToDraft(content: any): any;
export function convertDraftToHtml(editorState: any): string;
import PropTypes from "prop-types";
import React from "react";
