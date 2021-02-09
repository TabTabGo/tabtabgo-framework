declare var _default: React.ComponentType<Pick<PropTypes.InferProps<{
    panels: PropTypes.Validator<PropTypes.InferProps<{
        label: PropTypes.Requireable<string>;
        secondarylabel: PropTypes.Requireable<string>;
        key: PropTypes.Requireable<string>;
        component: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }>[]>;
    accordion: PropTypes.Requireable<boolean>;
    theme: PropTypes.Requireable<object>;
    classes: PropTypes.Requireable<object>;
}>, "panels" | "accordion"> & import("@material-ui/core").StyledComponentProps<"expanded" | "root" | "heading" | "panel" | "secondaryHeading">>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
