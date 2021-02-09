declare var _default: React.ComponentType<Pick<PropTypes.InferProps<{
    classes: PropTypes.Requireable<any>;
    isMulti: PropTypes.Requireable<boolean>;
    onItemsSelected: PropTypes.Requireable<(...args: any[]) => any>;
    listItemAction: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    searchKey: PropTypes.Requireable<object>;
    value: PropTypes.Requireable<object>;
    fields: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Validator<string | ((...args: any[]) => any)>;
        label: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        avatar: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        primary: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        secondary: PropTypes.Requireable<string | ((...args: any[]) => any)>;
    }>>;
    items: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Validator<number>;
        primary: PropTypes.Validator<string>;
        avatarLabel: PropTypes.Requireable<string>;
        secondary: PropTypes.Requireable<string>;
        avatar: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        action: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }>[]>;
}>, "value" | "items" | "listItemAction" | "searchKey" | "isMulti" | "onItemsSelected" | "fields"> & import("@material-ui/core").StyledComponentProps<"input" | "list" | "root" | "container" | "chip" | "inputContainer" | "valueContainer">>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
