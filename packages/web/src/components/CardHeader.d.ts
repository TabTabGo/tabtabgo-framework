import * as React from 'react';
declare type CardHeaderProps = {
    title: string | React.ReactNode;
    namespace?: string;
    hasInfo?: boolean;
    infoIcon?: any;
    infoText?: string;
    infoType?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'processing';
    translatedInfo?: boolean;
    onClickTitle?: (e?: any) => void;
    action?: any;
};
declare const CardHeader: ({ title, namespace, hasInfo, infoIcon, infoText, infoType, translatedInfo, action, onClickTitle, }: CardHeaderProps) => JSX.Element;
export default CardHeader;
