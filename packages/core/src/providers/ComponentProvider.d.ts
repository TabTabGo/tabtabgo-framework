import React from 'react';
export interface ComponentContextProps {
    setComponent: (key: string, component: any) => void;
    getComponent: (key: string, props: any) => any;
}
export declare const ComponentContext: React.Context<ComponentContextProps>;
export interface ComponentKeyValue {
    key: string;
    component: any;
    defaultProps?: any;
}
export declare type ComponentProviderProps = {
    components?: Array<ComponentKeyValue>;
    defaultComponents: any;
    children: any;
};
export declare const ComponentProvider: ({ components, children, defaultComponents, }: ComponentProviderProps) => JSX.Element;
export default ComponentProvider;
export declare const withComponentProvider: (Component: any) => (props: any) => JSX.Element;
