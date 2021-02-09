/// <reference types="react" />
declare type TitledDataProps = {
    title: string;
    value?: any;
    className?: any;
    namespace: string;
    maxLength?: number;
    hideByShowIdSettings?: boolean;
    onClick?: (event?: any) => void;
};
declare const TitledData: ({ title, value, className, namespace, maxLength, hideByShowIdSettings, onClick, }: TitledDataProps) => JSX.Element;
export default TitledData;
