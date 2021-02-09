export default class ValidationButton extends React.Component<any, any, any> {
    static propTypes: {
        ignoreDirty: PropTypes.Requireable<boolean>;
        ignoreValidation: PropTypes.Requireable<boolean>;
        isBusy: PropTypes.Requireable<boolean>;
        round: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Requireable<any>;
        ignoreValidationOnSubmit: PropTypes.Requireable<boolean>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
import React from "react";
import PropTypes from "prop-types";
