import React from 'react';
declare type ErrorProviderProps = {
    children: React.ReactElement;
};
export declare const ErrorProvider: (props: ErrorProviderProps) => JSX.Element;
export declare const withError: (WrapperComponent: any) => (props: any) => JSX.Element;
export {};
