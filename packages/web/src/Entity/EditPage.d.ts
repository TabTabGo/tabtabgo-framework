export default EntityEdit;
declare class EntityEdit extends React.Component<any, any, any> {
    constructor(props: any);
    handleSave(entity: any, e: any): void;
    handleGoBack(): void;
    goBack: () => void;
    isCancelling: boolean;
}
declare namespace EntityEdit {
    namespace defaultProps {
        const resetOnCancel: boolean;
    }
    namespace propTypes {
        export const namePlural: PropTypes.Validator<string>;
        export const nameSingular: PropTypes.Validator<string>;
        export const namePluralText: PropTypes.Requireable<string>;
        export const nameSingularText: PropTypes.Requireable<string>;
        export const flags: PropTypes.Requireable<any[]>;
        export const enableSubtitle: PropTypes.Requireable<boolean>;
        export const header: PropTypes.Requireable<PropTypes.ReactElementLike>;
        export const footer: PropTypes.Requireable<(...args: any[]) => any>;
        export const displayField: PropTypes.Validator<string | ((...args: any[]) => any)>;
        const resetOnCancel_1: PropTypes.Requireable<boolean>;
        export { resetOnCancel_1 as resetOnCancel };
        export const onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        export const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        export const entity: PropTypes.Validator<object>;
        export const ContentWrapper: PropTypes.Validator<PropTypes.ReactElementLike>;
    }
}
import React from "react";
import PropTypes from "prop-types";
