import React from 'react';
import { TablePagination } from '@material-ui/core';
import { PagingProps } from 'ttg-react/core/types/DataTable';

const defaultRowsPerPageOptions = [25, 50, 100];

export default function Paging(props: PagingProps) {
  const {
    totalPages,
    rowsPerPageOptions,
    totalRecords,
    pageSize,
    page,
    onRowsPerPageChange,
    onPageChange,
  } = props;

  const handleChangePage = (event: any, page: number) => {
    if (onPageChange) onPageChange(page, pageSize);
  };

  const handleChangeRowsPerPage = (event: any) => {
    if (onRowsPerPageChange) onRowsPerPageChange(event.target.value);
  };

  let currentPageSize = pageSize ? pageSize : 50;
  if (totalPages && totalPages > 1)
    return (
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions ? rowsPerPageOptions : defaultRowsPerPageOptions}
        component="div"
        count={totalRecords ? totalRecords : 0}
        rowsPerPage={currentPageSize}
        page={page ? page : 0}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    );
  else return null;
}
