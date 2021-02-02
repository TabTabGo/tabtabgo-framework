import { DataPaging } from "../DataPaging";

export interface PagingProps extends DataPaging {
  onPageChange(page: number, pageSize: number): void;
  onRowsPerPageChange(pageSize: number): void;
  rowsPerPageOptions?: number[];
}
