export namespace defaultProps {
    const cacheOptions: boolean;
    const defaultOptions: boolean;
    const filterOption: any;
}
export default class Async extends React.Component<any, any, any> {
    static defaultProps: {
        cacheOptions: boolean;
        defaultOptions: boolean;
        filterOption: any;
    };
    constructor(props: any);
    optionsCache: {};
    mounted: boolean;
    focus(): void;
    blur(): void;
    loadOptions(inputValue: any, callback?: (options: any) => void): void;
    handleSetOptions: (options: any) => void;
    handleInputChange: (newValue: any, actionMeta: any) => any;
    lastRequest: {};
    select: any;
}
import React from "react";
