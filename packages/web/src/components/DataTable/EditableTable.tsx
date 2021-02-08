import React, { useContext } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableCellProps,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import { UserSettingsContext } from '@tabtabgo/core/build/contexts/UserSettingsContext';
import { AppSettings } from '@tabtabgo/core/build/Appsettings';
import classnames from 'classnames';
import { grey } from '@material-ui/core/colors';

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
    '& tr:nth-of-type(even)': {
      backgroundColor: grey[50],
    },
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
    padding: theme.spacing(0.5, 1),
    maxWidth: 300,
  },
  pagination: {
    borderBottom: 'none',
  },
  row: {},
  clickableRow: {
    cursor: 'pointer',
  },
  button: {
    padding: theme.spacing(1),
  },
  flexNoWrap: {
    ...theme.custom.styles.flex,
    flexWrap: 'nowrap',
  },
}));

export type Cell = {
  value: any;
  className?: string;
  cellOptions?: TableCellProps;
};
//TODO move all EditableTable to DataTable
type EditableTableProps = {
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

const EditableTable = ({
  namespace = 'common',
  className = '',
  rows,
  headers,
  onRowClick,
  onRowEdit = (id) => {},
  onRowDelete = (id) => {},
  onTablePageChanged = (page, size) => {},
  page = 0,
  totalRows,
  defaultPageSize = 3,
  paginated = false,
  actions = [],
  rowEditDisabled = false,
  rowDeleteDisabled = false,
  columnOptions = [],
  keyField = 'id',
  hover = true,
}: EditableTableProps) => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = React.useState(page);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const { t } = useTranslation(AppSettings.translationNamespaces);
  const settings = useContext(UserSettingsContext);

  let filteredHeaders = [...headers];

  if (!settings.showIds) {
    filteredHeaders = headers.filter((it) => {
      const id = it.toLowerCase();
      return (
        !id.endsWith('id') || ['customer', 'invoice', 'dms'].includes(id.replace('id', '').trim())
      );
    });
  }

  const EditButton = ({ id, disabled }: any) => (
    <IconButton
      disabled={disabled}
      className={classes.button}
      onClick={(e: any) => {
        e.stopPropagation();
        onRowEdit(id);
      }}
      aria-label="edit"
    >
      <EditIcon />
    </IconButton>
  );

  const DeleteButton = ({ id, disabled }: any) => (
    <IconButton
      disabled={disabled}
      className={classes.button}
      onClick={(e: any) => {
        e.stopPropagation();
        onRowDelete(id);
      }}
      aria-label="delete"
    >
      <DeleteIcon />
    </IconButton>
  );

  if (!actions || actions.length === 0) {
    actions = [
      (id: number) =>
        rowEditDisabled ? (
          <div key={`${id}-Edit`}>
            <EditButton id={id} disabled />
          </div>
        ) : (
          <Tooltip title="Edit" key={`${id}-Edit`}>
            <div>
              <EditButton id={id} disabled={false} />
            </div>
          </Tooltip>
        ),
      (id: number) =>
        rowDeleteDisabled ? (
          <div key={`${id}-Delete`}>
            <DeleteButton id={id} disabled />
          </div>
        ) : (
          <Tooltip title="Delete" key={`${id}-Delete`}>
            <div>
              <DeleteButton id={id} disabled={false} />
            </div>
          </Tooltip>
        ),
    ];
  }

  function handleChangePage(event: any, newPage: number) {
    onTablePageChanged(newPage, rowsPerPage);
  }

  function handleChangeRowsPerPage(event: any) {
    onTablePageChanged(0, parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  }

  return (
    <Paper className={classes.root + ' ' + className}>
      <Table className={classes.table} aria-label="table" size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>{t('Actions')}</TableCell>
            {filteredHeaders.map((item) => (
              <TableCell key={item} className={classes.headerCell}>
                {t(`${namespace}:${item}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <React.Fragment>
            {rows.map((row, index) => {
              return (
                <TableRowCell
                  key={index}
                  settings={settings}
                  actions={actions}
                  classes={classes}
                  columnOptions={columnOptions}
                  row={row}
                  onRowClick={onRowClick}
                  keyField={keyField}
                />
              );
            })}
          </React.Fragment>
        </TableBody>
        {(() => {
          if (paginated && handleChangeRowsPerPage) {
            return (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    className={classes.pagination}
                    rowsPerPageOptions={[5]}
                    colSpan={30}
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
            );
          }
        })()}
      </Table>
    </Paper>
  );
};
type FunctionalColumnOption = (row: any, prop: any) => TableCellProps;
type TableRowCellProps = {
  classes: any;
  row: any;
  actions: Array<any>;
  settings: any;
  columnOptions?: Array<TableCellProps>;
  onRowClick?: (row: any) => void;
  keyField: string;
  hover?: boolean;
};

const TableRowCell = ({
  classes,
  row,
  actions,
  settings,
  columnOptions,
  onRowClick,
  keyField,
  hover = true,
}: TableRowCellProps) => {
  const handleOnRowClick = (e: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };
  const props = Array.from(Object.keys(row))
    .filter((key) => {
      if (settings.showIds) {
        return true;
      } else {
        const id = key.toLowerCase();
        return (
          !id.endsWith('id') || ['customer', 'invoice', 'dms'].includes(id.replace('id', '').trim())
        );
      }
    })
    .map((key: any) => row[key]);
  return (
    <TableRow
      hover={hover}
      className={classnames({
        [classes.row]: true,
        [classes.clickableRow]: !!onRowClick,
      })}
      key={row[keyField]}
      onClick={handleOnRowClick}
    >
      <TableCell className={classes.cells}>
        <div className={classes.flexNoWrap}>{actions.map((action) => action(row[keyField]))}</div>
      </TableCell>
      {props.map((prop, pIndex) => {
        // if columnOption is a function then pass row data and check otherwise
        var columnOption =
          columnOptions && pIndex < columnOptions.length ? columnOptions[pIndex] : {};

        return (
          <TableCell key={`${prop}_${pIndex}`} {...columnOption} className={classes.cells}>
            {!!prop ? prop : '–'}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default EditableTable;
