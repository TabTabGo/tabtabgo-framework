/// <reference types="react" />
declare type TableDataProps = {
    className?: string;
    namespace?: string;
    rows: Array<any>;
    headers: Array<any>;
    hover?: boolean;
    keyField: string;
    page?: number;
    totalRows?: number;
    defaultPageSize?: number;
    paginated?: boolean;
    onRowSelect?: (id: number, row?: any) => void;
    onTablePageChanged?: (page: number, size: number) => void;
    selectedId?: number;
    loading?: boolean;
    forceShowIds?: boolean;
};
declare const TableData: ({ className, namespace, rows, headers, hover, keyField, onRowSelect, page, totalRows, defaultPageSize, paginated, onTablePageChanged, selectedId, loading, forceShowIds, }: TableDataProps) => JSX.Element;
export default TableData;
