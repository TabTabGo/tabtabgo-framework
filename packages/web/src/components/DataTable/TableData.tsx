import React, { useContext, useEffect } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  CircularProgress,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UserSettingsContext } from '@tabtabgo/core';
import classnames from 'classnames';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: 'none',
    background: 'none',
    marginTop: theme.spacing(2),
  },
  table: {
    boxShadow: 'none',
    background: 'none',
  },
  headerCell: {
    color: '#8a8a8a',
    //fontWeight: "600",
    whiteSpace: 'nowrap',
    borderBottom: 'none',
    padding: theme.spacing(0.5, 1),
  },
  cells: {
    borderBottom: 'none',
    padding: theme.spacing(1.5, 1),
  },
  row: {},
  pagination: {
    borderBottom: 'none',
  },
  clickableRow: {
    cursor: 'pointer',
  },
}));

type TableDataProps = {
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

const TableData = ({
  className = '',
  namespace = 'common',
  rows,
  headers,
  hover = true,
  keyField = 'id',
  onRowSelect,
  page = 0,
  totalRows,
  defaultPageSize = 5,
  paginated = false,
  onTablePageChanged,
  selectedId,
  loading = false,
  forceShowIds = false,
}: TableDataProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['information', 'internet', 'economy']);
  const settings = useContext(UserSettingsContext);
  const [pageNumber, setPageNumber] = React.useState(page);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);

  let filteredHeaders = [...headers];

  if (!settings.showIds && !forceShowIds) {
    filteredHeaders = headers.filter((it) => {
      const id = it.toLowerCase();
      return (
        id.indexOf('id') === -1 ||
        ['customer', 'invoice', 'dms'].includes(id.replace('id', '').trim())
      );
    });
  }

  useEffect(() => {
    setPageNumber(page);
  }, [page]);

  useEffect(() => {
    setRowsPerPage(defaultPageSize);
  }, [defaultPageSize]);

  function handleChangePage(event: any, newPage: number) {
    if (onTablePageChanged) onTablePageChanged(newPage, rowsPerPage);
  }

  function handleChangeRowsPerPage(event: any) {
    if (onTablePageChanged) {
      onTablePageChanged(0, parseInt(event.target.value, 10));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPageNumber(0);
    }
  }

  return (
    <Paper className={classes.root + ' ' + className}>
      <Table className={classes.table} aria-label="table" size="small">
        <TableHead>
          <TableRow>
            {filteredHeaders.map((item) => (
              <TableCell key={item} className={classes.headerCell}>
                {t(`${namespace}:${item}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const props = Object.keys(row).filter((key) => {
              if (settings.showIds || forceShowIds) {
                return true;
              } else {
                const id = key.toLowerCase();
                return (
                  id.indexOf('id') === -1 ||
                  ['customer', 'invoice', 'dms'].includes(id.replace('id', '').trim())
                );
              }
            });
            //.map(key => row[key]);
            const isSelected = selectedId === row[keyField];

            return (
              <TableRow
                hover={hover}
                key={`${row[keyField]}-${rowIndex}`}
                className={classnames({
                  [classes.row]: true,
                  [classes.clickableRow]: !!onRowSelect,
                })}
                onClick={(e) => {
                  if (onRowSelect) onRowSelect(row[keyField], row);
                }}
                selected={isSelected}
              >
                {props.map((prop) => {
                  return (
                    <TableCell key={`${row[keyField]}-${prop}`} className={classes.cells}>
                      {!!row[prop] ? row[prop] : '–'}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        {paginated && handleChangeRowsPerPage && (
          <TableFooter>
            <TableRow>
              {loading && (
                <TableCell style={{ borderBottom: 0 }}>
                  <CircularProgress size={20} />
                </TableCell>
              )}
              <TablePagination
                className={classes.pagination}
                rowsPerPageOptions={[5]}
                count={totalRows || rows.length}
                rowsPerPage={rowsPerPage}
                page={pageNumber}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </Paper>
  );
};

export default TableData;
