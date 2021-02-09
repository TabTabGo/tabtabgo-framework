export default Field;
declare class Field extends React.Component<any, any, any> {
    static propTypes: {
        fullWidth: PropTypes.Requireable<boolean>;
        stacked: PropTypes.Requireable<boolean>;
        label: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<string | number | ((...args: any[]) => any)>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
import React from "react";
import PropTypes from "prop-types";
