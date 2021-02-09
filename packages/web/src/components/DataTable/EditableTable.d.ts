/// <reference types="react" />
import { TableCellProps } from '@material-ui/core';
export declare type Cell = {
    value: any;
    className?: string;
    cellOptions?: TableCellProps;
};
declare type EditableTableProps = {
    namespace?: string;
    className?: string;
    rows: Array<any>;
    headers: Array<any>;
    columnOptions?: Array<TableCellProps>;
    onRowClick?: (row: any) => void;
    onRowEdit?: (id: number) => void;
    onRowDelete?: (id: number) => void;
    onTablePageChanged?: (page: number, size: number) => void;
    page?: number;
    totalRows?: number;
    defaultPageSize?: number;
    paginated?: boolean;
    actions?: Array<any>;
    rowEditDisabled?: boolean;
    rowDeleteDisabled?: boolean;
    keyField?: string;
    hover?: boolean;
};
declare const EditableTable: ({ namespace, className, rows, headers, onRowClick, onRowEdit, onRowDelete, onTablePageChanged, page, totalRows, defaultPageSize, paginated, actions, rowEditDisabled, rowDeleteDisabled, columnOptions, keyField, hover, }: EditableTableProps) => JSX.Element;
export default EditableTable;
