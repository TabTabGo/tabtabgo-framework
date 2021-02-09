export function DefaultNavTitle({ step, value, classes }: {
    step: any;
    value: any;
    classes: any;
}): JSX.Element;
export namespace DefaultNavTitle {
    namespace propTypes {
        const step: PropTypes.Requireable<any>;
        const value: PropTypes.Requireable<object>;
    }
}
declare var _default: React.ComponentType<Pick<Pick<PropTypes.InferProps<{
    classes: PropTypes.Validator<object>;
    steps: PropTypes.Validator<PropTypes.InferProps<{
        title: PropTypes.Validator<any>;
        subtitle: PropTypes.Requireable<any>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        error: PropTypes.Requireable<boolean>;
        isActive: PropTypes.Requireable<boolean | ((...args: any[]) => any)>;
        stepComponent: PropTypes.Validator<(...args: any[]) => any>;
        stepId: PropTypes.Validator<string>;
        StepIconComponent: PropTypes.Requireable<(...args: any[]) => any>;
        StepIconProps: PropTypes.Requireable<object>;
        StepButtons: PropTypes.Requireable<object>;
    }>[]>;
    value: PropTypes.Validator<object>;
    previousButtonClasses: PropTypes.Requireable<string>;
    previousButtonText: PropTypes.Requireable<string>;
    nextButtonClasses: PropTypes.Requireable<string>;
    nextButtonText: PropTypes.Requireable<string>;
    finishButtonClasses: PropTypes.Requireable<string>;
    finishButtonText: PropTypes.Requireable<string>;
    finishButtonClick: PropTypes.Requireable<(...args: any[]) => any>;
    validate: PropTypes.Requireable<boolean>;
    enableStepNavigation: PropTypes.Requireable<boolean>;
}>, "classes" | "value" | "validate" | "steps" | "enableStepNavigation" | "previousButtonClasses" | "previousButtonText" | "nextButtonClasses" | "nextButtonText" | "finishButtonClasses" | "finishButtonText" | "finishButtonClick"> & Partial<Pick<PropTypes.InferProps<{
    classes: PropTypes.Validator<object>;
    steps: PropTypes.Validator<PropTypes.InferProps<{
        title: PropTypes.Validator<any>;
        subtitle: PropTypes.Requireable<any>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        error: PropTypes.Requireable<boolean>;
        isActive: PropTypes.Requireable<boolean | ((...args: any[]) => any)>;
        stepComponent: PropTypes.Validator<(...args: any[]) => any>;
        stepId: PropTypes.Validator<string>;
        StepIconComponent: PropTypes.Requireable<(...args: any[]) => any>;
        StepIconProps: PropTypes.Requireable<object>;
        StepButtons: PropTypes.Requireable<object>;
    }>[]>;
    value: PropTypes.Validator<object>;
    previousButtonClasses: PropTypes.Requireable<string>;
    previousButtonText: PropTypes.Requireable<string>;
    nextButtonClasses: PropTypes.Requireable<string>;
    nextButtonText: PropTypes.Requireable<string>;
    finishButtonClasses: PropTypes.Requireable<string>;
    finishButtonText: PropTypes.Requireable<string>;
    finishButtonClick: PropTypes.Requireable<(...args: any[]) => any>;
    validate: PropTypes.Requireable<boolean>;
    enableStepNavigation: PropTypes.Requireable<boolean>;
}>, never>> & Partial<Pick<{}, never>>, "value" | "validate" | "steps" | "enableStepNavigation" | "previousButtonClasses" | "previousButtonText" | "nextButtonClasses" | "nextButtonText" | "finishButtonClasses" | "finishButtonText" | "finishButtonClick"> & import("@material-ui/core").StyledComponentProps<"left" | "right" | "button" | "footer" | "nav" | "success" | "completed" | "content" | "root" | "primary" | "info" | "warning" | "danger" | "clearfix" | "card" | "steps" | "instructions" | "backButton" | "wizardNavigation" | "stepLabel" | "stepButton" | "stepsAnchor" | "stepsDisabledAnchor" | "stepContent" | "stepContentActive" | "movingTab" | "navTitle" | "navSubtitle" | "movingTabTitle" | "movingTabSubtitle">>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
