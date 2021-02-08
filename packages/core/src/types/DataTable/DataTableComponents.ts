import { RowProps, RowOptions } from './RowProps';
import { FilterProps } from './FilterProps';
import { SelectionToolbarProps } from './SelectionToolbarProps';
import { SelectedFilterProps } from './SelectedFilterProps';
import { TableProps } from './TableProps';
import { FunctionComponent, ComponentClass } from 'react';
import { HeaderProps } from './HeaderProps';
import { PagingProps } from './PagingProps';
import { ToolbarProps } from './ToolbarProps';

export interface DataTableComponents<T> {
  toolbar?: FunctionComponent<ToolbarProps<T>> | boolean;
  selectionToolbar?: FunctionComponent<SelectionToolbarProps<T>> | boolean;
  filter?: FunctionComponent<FilterProps<T>> | boolean;
  selectedFilter?: FunctionComponent<SelectedFilterProps<T>> | boolean;
  table?: FunctionComponent<TableProps<T>> | boolean;
  header?: FunctionComponent<HeaderProps<T>>;
  row?: FunctionComponent<RowOptions<T>>;
  paging?: FunctionComponent<PagingProps>;
  mobile?: FunctionComponent<Partial<RowProps<T>>> | ComponentClass<any, any>;
  edit?: FunctionComponent<any> | ComponentClass<any, any>;
}
