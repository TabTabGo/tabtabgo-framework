import React from 'react';
import { TableProps, Column } from '@tabtabgo/core/types/DataTable';
import DefaultHeader from './Header';
import DefaultRow from './Row';
import { getRowButtons } from '../Buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';

export const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    table: {
      marginTop: theme.spacing(1),
      minWidth: 1020,
      marginBottom: theme.spacing(2),
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    rowButtons: {
      color: theme.palette.text.secondary,
      flex: '0 0 45%',
      justifyContent: 'flex-start',
      textAlign: 'left',
      width: 'auto',
      marginLeft: -1 * theme.spacing(1),
      marginRight: -1 * theme.spacing(1),
    },
    checkboxCell: {
      width: '30px',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    loadingProgressWrapper: {
      display: 'inline-block',
      marginRight: '24px',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(2),
    },
    progress: {},
  }),
);

const TTGTable = (props: TableProps<any>) => {
  const classes = useTableStyles(props);
  const {
    isLoading,
    enableSelection,
    items,
    pagingOptions,
    selectedItems,
    columns,
    keyField,
    rowOptions,
    rowButtons,
    padding,
    onSelectAll,
    onSort,
    isSelected,
    components,
    order,
    orderBy,
    onSelect,
    namePlural,
    nameSingular,
    displayField,
    namePluralText,
    nameSingularText,
    ...tableOptions
  } = props;

  const handleSelectAll = (isChecked: boolean) => {
    if (onSelectAll) {
      onSelectAll(isChecked, items);
    }
  };

  const CustomRow = components && components.row ? components.row : DefaultRow;
  const CustomHeader = components && components.header ? components.header : DefaultHeader;
  const activeRowButtons = getRowButtons(rowButtons ? rowButtons : null);

  return (
    <div className={classes.tableWrapper}>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        padding={padding}
        {...tableOptions}
      >
        <CustomHeader
          enableSelection={enableSelection}
          columns={columns}
          numSelected={selectedItems ? selectedItems.length : 0}
          rowButtons={activeRowButtons}
          order={order}
          orderBy={orderBy}
          onSelectAll={handleSelectAll}
          onSort={onSort}
          rowCount={items ? items.length : 0}
          padding={padding}
        />
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.filter((c: Column<any>) => !c.hide).length + 1}>
                <div className={classes.loadingProgressWrapper}>
                  <CircularProgress size={24} className={classes.progress} />
                </div>
              </TableCell>
            </TableRow>
          ) : items ? (
            items.map((row: any, rIndex: number) => {
              return (
                <CustomRow
                  key={rIndex}
                  index={rIndex}
                  rowData={row}
                  enableSelection={enableSelection ? enableSelection : false}
                  isSelected={isSelected(row[keyField])}
                  rowButtons={activeRowButtons}
                  padding={padding ? padding : 'default'}
                  columns={columns}
                  onSelect={onSelect}
                  {...rowOptions}
                />
              );
            })
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
};
export default TTGTable;
