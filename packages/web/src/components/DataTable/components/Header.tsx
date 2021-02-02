import React from 'react';

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Tooltip,
} from '@material-ui/core';
import { HeaderProps } from '@tabtabgo/core/types/DataTable';
import { Property } from '@tabtabgo/core/types';

const Header = (props: HeaderProps<any>) => {
  const createSortHandler = (property: Property) => (event: any) => {
    if (props?.onSort) props?.onSort(property, event);
  };

  const {
    onSelectAll,
    numSelected,
    rowCount,
    columns,
    rowButtons,
    orderBy,
    order,
    padding,
    enableSelection,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {enableSelection ? (
          <TableCell variant="head" padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount && rowCount !== 0}
              onChange={(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                onSelectAll(checked)
              }
            />
          </TableCell>
        ) : null}
        {rowButtons && Object.keys(rowButtons).length > 0 ? (
          <TableCell variant="head" padding="checkbox">
            Action
          </TableCell>
        ) : null}
        {columns.map((column, key) => {
          if (column.hide) return null;
          return (
            <TableCell
              variant="head"
              key={key}
              padding={column.padding ? column.padding : padding ? padding : 'default'}
              align={column.dataAlign || 'inherit'}
              sortDirection={column.isSortable ? (orderBy === column.name ? order : false) : false}
            >
              {column.isSortable ? (
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.orderBy || orderBy === column.field}
                    direction={order}
                    onClick={createSortHandler(column.orderBy || column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                column.label
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default Header;
