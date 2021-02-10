import React from 'react';
import {
  TableCell,
  TableRow,
  Checkbox,
  Tooltip,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { getPropertyValue } from '@tabtabgo/core';
import { ToolbarButtons } from '../../Buttons';

import { RowProps } from '@tabtabgo/core/src/types/DataTable';
import cx from 'classnames';

export const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      //marginLeft: -1 * theme.spacing(1),
      marginRight: -1 * theme.spacing(1),
    },
    checkboxCell: {
      width: '30px',
    },
    rowClickable: {
      cursor: 'pointer',
    },
  }),
);

export default function Row(props: RowProps<any>) {
  const classes = useRowStyles(props);

  const getDataCellValue = (cell: any, row: any, key: any) => {
    if (cell.customCell)
      //TODO not sure we will need it as dataFormat is enough
      return cell.customCell(row, key, cell);
    if (cell.dataFormat) {
      let cellValue = cell.field ? getPropertyValue(row, cell.field) : '';
      return cell.dataFormat(cellValue, row, key);
    }
    if (cell.field) {
      return getPropertyValue(row, cell.field);
    }
    return row[cell.name];
  };

  const {
    index,
    rowData,
    onRowClick,
    onRowDoubleClick,
    onRowTouch,
    onSelect,
    onRowSelectionChange,
    isSelected,
    enableSelection,
    rowButtons,
    padding,
    columns,
    ...rest
  } = props;

  const cursor = cx({
    [classes.rowClickable]: onRowDoubleClick !== undefined || onRowClick !== undefined,
  });
  return (
    <TableRow
      hover
      onClick={(e: any) => {
        if (onRowClick) onRowClick(rowData, index, e);
      }}
      onDoubleClick={(e: any) => {
        if (onRowDoubleClick) onRowDoubleClick(rowData, index, e);
      }}
      onTouchEnd={(e: any) => {
        if (onRowTouch) onRowTouch(rowData, index, e);
      }}
      tabIndex={-1}
      key={index}
      //classes={classes}
      selected={isSelected}
      {...rest}
      className={`${cursor}${rest.className ? ' ' + rest.className : ''}`}
    >
      {enableSelection ? (
        <TableCell
          variant="body"
          padding="checkbox"
          className={classes.checkboxCell}
          onClick={(e: any) => {
            if (onSelect) onSelect(e.target.checked, rowData, index, e);
          }}
        >
          <Checkbox checked={isSelected} />
        </TableCell>
      ) : null}
      {rowButtons && Object.keys(rowButtons).length > 0 ? (
        <TableCell variant="body" padding="checkbox" className={classes.tableCell}>
          <ToolbarButtons
            data={rowData}
            buttons={rowButtons}
            classes={{ buttons: classes.rowButtons }}
          />
        </TableCell>
      ) : null}
      {columns.map((c, key) => {
        if (c.hide) return null;
        return (
          <TableCell
            key={key}
            variant="body"
            padding={c.padding ? c.padding : padding}
            numeric={c.isNumeric}
            align={c.dataAlign || 'inherit'}
            className={classes.tableCell}
            {...c.cellProperties}
          >
            {c.tooltip ? (
              <Tooltip
                title={typeof c.tooltip === 'function' ? c.tooltip({ data: rowData }) : c.tooltip}
              >
                <span>{getDataCellValue(c, rowData, key)}</span>
              </Tooltip>
            ) : (
              getDataCellValue(c, rowData, key)
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
