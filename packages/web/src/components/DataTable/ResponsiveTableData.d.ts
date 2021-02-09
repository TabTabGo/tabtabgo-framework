/// <reference types="react" />
declare type ResponsiveTableDataProps = {
    namespace?: String;
    title?: string;
    data?: Array<any>;
    emptyMessage?: string;
};
declare const ResponsiveTableData: ({ namespace, title, data, emptyMessage, }: ResponsiveTableDataProps) => JSX.Element;
export default ResponsiveTableData;
