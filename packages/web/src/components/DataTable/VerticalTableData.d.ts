/// <reference types="react" />
declare type VerticalTableDataProps = {
    namespace?: String;
    title?: string;
    data?: Array<any>;
    emptyMessage?: string;
};
declare const VerticalTableData: ({ namespace, title, data, emptyMessage, }: VerticalTableDataProps) => JSX.Element;
export default VerticalTableData;
