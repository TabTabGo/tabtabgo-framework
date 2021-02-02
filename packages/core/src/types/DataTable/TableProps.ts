import { RowButtons } from './Buttons';

import { RowOptions } from './RowProps';
import { IEntity } from '..';
import { Column } from './Column';

import { FunctionComponent } from 'react';
import { HeaderProps } from './HeaderProps';
import { OrderDirection } from '../enums';
import { Property } from '../Property';
import { PagingProps } from './PagingProps';

export interface TableProps<T> extends IEntity<T>, TableOptions {
  isLoading: boolean;
  enableSelection?: boolean;
  rowButtons: RowButtons;
  rowOptions: RowOptions<T>;
  items: Array<T>;
  pagingOptions: PagingProps;
  selectedItems: Array<T>;
  columns: Array<Column<any>>;
  components: {
    header?: FunctionComponent<HeaderProps<T>>;
    row?: FunctionComponent<RowOptions<T>>;
  };
  isSelected(itemKey: any): boolean;
  onSelectAll(isChecked: boolean, items: Array<T>): void;
}

export interface TableOptions {
  padding?: 'default' | 'checkbox' | 'none';
  onSort?: (orderBy: Property, order: OrderDirection) => void;
  order?: OrderDirection;
  orderBy?: string;
  [key: string]: any;
}
