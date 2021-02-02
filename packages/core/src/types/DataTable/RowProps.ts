import { RowButtons } from './Buttons';
import { Column } from '..';

export interface RowProps<T> extends RowOptions<T> {
  index: number;
  rowData: T;
  isSelected: boolean;
  enableSelection: boolean;
  rowButtons: RowButtons;
  padding?: 'default' | 'checkbox' | 'none';
  columns: Array<Column<T>>;
}

export enum SelectionMode {
  Checkbox = 'checkbox',
  Click = 'click',
}

export interface RowOptions<T> {
  mode?: SelectionMode;
  selectOneRow?: boolean;
  onRowClick?: (data: T, index: number, event: any) => void;
  onRowDoubleClick?: (data: T, index: number, event: any) => void;
  onRowTouch?: (data: T, index: number, event: any) => void;
  onSelect?: (checked: boolean, item: T, index: number, event: any) => void;
  onRowSelectionChange?: (selections: Array<T>) => void;
  [key: string]: any;
}
