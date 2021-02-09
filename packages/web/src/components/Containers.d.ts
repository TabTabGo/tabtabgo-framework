import * as React from 'react';
declare type RootContainerProps = {
    children: any;
    isCol?: boolean;
    isWide?: boolean;
};
export declare const RootContainer: ({ children, isCol, isWide }: RootContainerProps) => JSX.Element;
declare type BoxedContainerProps = {
    children: any;
    className?: string;
    isCol?: boolean;
};
export declare const BoxedContainer: ({ className, children, isCol, }: BoxedContainerProps) => JSX.Element;
declare type InverseBoxedContainerProps = {
    children: any;
    className?: string;
    width?: string;
    style?: React.CSSProperties;
};
export declare const InverseBoxedContainer: ({ className, children, width, style, }: InverseBoxedContainerProps) => JSX.Element;
export {};
