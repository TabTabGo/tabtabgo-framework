export interface DataPaging {
    page: number;
    totalRecords?: number;
    totalPages?: number;
    pageSize: number;
    last?: boolean;
    first?: boolean;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}
